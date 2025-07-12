import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Input, InputWrapper, Panel, RadioButton, Select, SelectNumber, Toggle, Tooltip } from '@/shared/ui';
import { useProductContext } from '../../lib/context';
import styles from './styles.module.scss';
import plural from 'plural-ru';
import { ApiRoute } from '@/const';
import { api } from '@/shared/api/api.ts';
import { useProfile } from '@/shared/api';


interface ProductOptionsProps {
  productId: ProductFull['id'];
  options: ProductFull['options'];
  currencies: Currencies;
  currency?: 'rub' | 'kzt' | 'usd';
  optionsText?: ProductFull['options_text'];
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  optionsText,
  productId,
  currencies,
  currency
}) => {
  const initializeSelectedOptions = () => {
    const initialSelectedOptions: { [key: string]: any } = {};
    options.forEach(option => {
      if (option.type === 'select' || option.type === 'radio') {
        initialSelectedOptions[option.option_name] =
          option.default_value
            ? option.default_value
            : null;
      } else if (option.type === 'checkbox') {
        initialSelectedOptions[option.option_name] = option.items
          .filter(item => item.value)
          .map(item => item.name);
      } else if (
        option.type === 'amount' ||
        option.type === 'deposit'
      ) {
        initialSelectedOptions[option.option_name] = option.item.value || null;
      } else if (
        option.type === 'bonus'
      ) {
        initialSelectedOptions[option.option_name] = 1;
      } else if (
        option.type === 'input_text' ||
        option.type === 'input_email'
      ) {
        initialSelectedOptions[option.option_name] = option.item.value || '';
      } else if (
        option.type === '__parent_toggle' ||
        option.type === '__parent_radio'
      ) {
        if (option.option_name === 'region' && currency) {
          option.default_value = currency == 'usd'
            ? option.items[2]
            : currency == 'kzt'
              ? option.items[1] :
              option.items[0]
        }
        initialSelectedOptions[option.option_name] = option.default_value?.value || null;
      }
    });

    const bonusOption = options.find(option => option.type === 'bonus')

    if (bonusOption) {
      initialSelectedOptions['bonus'] = countBonuses(bonusOption as ProductOption__Bonus, initialSelectedOptions, currencies);
    }
    return initialSelectedOptions;
  };

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: any; }>(initializeSelectedOptions());

  const handleChange = (optionId: string, value: any) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [optionId]: value,
    }));
  };

  const calculateTotalPrice = useCallback(() => {
    let totalPrice = 0;

    options.filter(filterActiveOptions).forEach(option => {
      const selectedItem = selectedOptions[option.option_name];
      if (selectedItem) {
        if (option.type === 'select' || option.type === 'radio') {
          totalPrice +=
            option.items.find(item => item.value === selectedItem)?.price
            || option.items.find(item => item.value === selectedItem.value)?.price
            || 0;
        } else if (option.type === 'checkbox') {
          selectedItem.forEach((item: string) => {
            totalPrice +=
              option.items.find(optItem => optItem.name === item)?.price || 0;
          });
        }
      }
    });

    // добавление в общую стоимость депозита
    const depositObject = options.find(v => v.type === 'deposit');
    if (depositObject) {
      let depositValue;
      if (selectedOptions.region === "ru") {
        depositValue = Number(selectedOptions.steam_deposit_amount_rub);
      } else if (selectedOptions.region === "kz") {
        depositValue = Number(selectedOptions.steam_deposit_amount_kzt) * currencies.KZT || 0;
      } else if (selectedOptions.region === "cis") {
        depositValue = Number(selectedOptions.steam_deposit_amount_usd) * currencies.USD || 0;
      } else {
        depositValue = Number(selectedOptions[depositObject.option_name]) || 0;
      }
      totalPrice += depositValue;
    }

    // расчет множителя цены
    const amountObject = options.find(v => v.type === 'amount');
    if (amountObject) {
      const amountValue = selectedOptions[amountObject.option_name] || 0;
      totalPrice *= amountValue;
    }

    return totalPrice;
  }, [options, selectedOptions]);

  const getPayload = useCallback((): ProductOptionPayload[] => {
    return options.filter(filterActiveOptions).map(option => ({
      option_id: option.option_name,
      type: option.type,
      title: option.title,
      value: selectedOptions[option.option_name],
    }));
  }, [options, selectedOptions]);

  const {
    setTotalPrice,
    setPayload,
    validationSync,
    validationShowError,
    validationSetError,
  } = useProductContext();

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
    setPayload(prevPayload => ({
      ...prevPayload,
      product_id: productId,
      options: getPayload(),
      currencies: currencies
    }));
  }, [
    selectedOptions,
    setPayload,
    setTotalPrice,
    calculateTotalPrice,
    getPayload,
  ]);

  const activeChildGroups = useMemo(() => {
    const parentOptions = options.filter(v =>
      ['__parent_radio', '__parent_toggle'].includes(v.type)
    ) as (ProductOption__ToggleParent | ProductOption__RadioParent)[];

    if (parentOptions.length === 0) return [];

    return parentOptions
      .map(parent => {
        const name = parent.option_name;
        const value = selectedOptions[name];
        return parent.items.find(v => v.value === value)?.child_group;
      })
      .filter(v => v);
  }, [options, selectedOptions]);

  const filterActiveOptions = useCallback(
    (array: ProductOption__GroupBase) => {
      if (!array.child_group_name) return true;
      return activeChildGroups.includes(array.child_group_name.trim());
    },
    [activeChildGroups]
  );

  const [loginValidationState, setLoginValidationState] = useState<{
    isValidating: boolean,
    error: string | null
  }>({
    isValidating: false,
    error: null
  });

  const validateLoginDebounced = useMemo(() =>
    debounce((loginValue) => {
      if (!loginValue) return;

      setLoginValidationState({ isValidating: true, error: null });

      api.get(ApiRoute.InvoiceCheckLogin, {
        params: { login: loginValue },
      })
        .then((response) => {
          if (!response.data.success) {
            setLoginValidationState({ isValidating: false, error: response.data.error });
          } else {
            setLoginValidationState({ isValidating: false, error: null });
          }
        })
        .catch(() => {
          setLoginValidationState({ isValidating: false, error: 'Ошибка проверки логина' });
        });
    }, 500),
    []
  );

  useEffect(() => {
    const loginOptionName = options
      ?.filter(filterActiveOptions)
      ?.find(v => v.option_name === 'login')?.option_name;

    if (loginOptionName && selectedOptions[loginOptionName]) {
      validateLoginDebounced(selectedOptions[loginOptionName]);
    }
  }, [selectedOptions, filterActiveOptions]);

  // #region FormValidator
  useEffect(() => {
    const validateFields = async () => {
      // =========================
      // управление/настрока базовым состоянием контекста с данными о валидации
      const validatedOptionNames = options
        .filter(filterActiveOptions)
        .filter(v => {
          if (v.type === 'input_email') return true;
          return v.type === 'input_text' && v.is_required;
        })
        .map(v => v.option_name);

      // синхронизация инпутов в валидаторе (создание активных / удаление не активных)
      validationSync(validatedOptionNames);

      const validatedOptionsValues = validatedOptionNames.map(v => [
        v,
        selectedOptions[v],
      ]);

      // включаем отображение ошибок после воода текста
      const notBlankOptions = validatedOptionsValues
        .filter(v => v[1])
        .map(v => v[0]);
      validationShowError(notBlankOptions);

      // =========================
      // валидация полей
      const errors: Record<string, string> = {};

      // валидация на isEmpty
      validatedOptionsValues.forEach(([key, value]) => {

        if (!value || value.length < 1) {
          errors[key] = 'Это поле обязательно для заполнения';

        } else if (key !== 'login' && key.includes('email') && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          errors[key] = 'Укажите валидный email';
        }
      });

      const loginOptionName = options
        ?.filter(filterActiveOptions)
        ?.find(v => v.option_name === 'login')?.option_name;

      if (loginOptionName && loginValidationState.error) {
        errors[loginOptionName] = loginValidationState.error;
      } else if (loginOptionName && loginValidationState.isValidating) {
        errors[loginOptionName] = 'loading';
      }

      validationSetError(errors);
    };

    validateFields();
  }, [selectedOptions, filterActiveOptions, loginValidationState]);
  const filteredOptions = () => options.filter(filterActiveOptions);

  return (
    <Panel className={styles.ProductOptions}>
      <div className={styles.ProductOptions__groups} id="product-options">
        {filteredOptions().map(v => {
          if (v.type === 'select') {
            return (
              <GroupSelect
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }
          if (v.type === 'radio') {
            return (
              <GroupRadio
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }
          if (v.type === 'checkbox') {
            return (
              <GroupCheckbox
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === 'amount') {
            return (
              <AmountInputComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === 'deposit') {
            return (
              <DepositInputComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === 'input_text') {
            return (
              <InputTextComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === 'input_email') {
            return (
              <InputEmailComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === '__parent_toggle') {
            return (
              <ToggleParentComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === '__parent_radio') {
            return (
              <RadioParentComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
              />
            );
          }

          if (v.type === 'bonus') {
            return (
              <BonusComponent
                key={v.option_name}
                data={v}
                onChange={value => handleChange(v.option_name, value)}
                options={selectedOptions}
                currencies={currencies}
              />
            );
          }

          return null;
        })}
      </div>

      {optionsText && (
        <div className={styles.ProductOptions__description}>{optionsText}</div>
      )}

      {/* <div className={styles.ProductOptions__total}>
        Общая стоимость: {calculateTotalPrice()} руб.
      </div>
      <button onClick={() => console.log(getPayload())}>Отправить</button> */}
    </Panel>
  );
};

// ======

interface GroupProps<T> {
  data: T;
  options?: { [key: string]: any; };
  currencies?: Currencies;
  onChange: (value: any) => void;
}

const GroupSelect: React.FC<GroupProps<ProductOption__GroupSelect>> = ({
  data,
  onChange,
}) => {
  const [value, setValue] = useState(data.default_value);

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}

      <div
        className={styles.ProductOptions__section}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        <Select
          label={data.label}
          description={data.description}
          options={data.items}
          default_value={data.default_value}
          value={value}
          onChange={v => {
            setValue({ label: v!.label, value: v!.value });
            onChange(v!.value);
          }}
        />
      </div>
    </div>
  );
};

// ======

const GroupRadio: React.FC<GroupProps<ProductOption__GroupRadio>> = ({
  data,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(data.default_value);

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}

      <div
        className={styles.ProductOptions__section}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        {data.items.map(v => (
          <RadioButton
            key={v.value}
            icon={data.icon && <img src={data.icon} />}
            selected={selectedValue?.value === v.value}
            onClick={() => {
              setSelectedValue(v);
              onChange(v!);
            }}
          >
            {v.label}
          </RadioButton>
        ))}
      </div>
    </div>
  );
};

// ======

const GroupCheckbox: React.FC<GroupProps<ProductOption__GroupCheckbox>> = ({
  data,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    data.items.filter(item => item.value).map(item => item.name)
  );

  const handleCheckboxChange = (name: string) => {
    const updatedValues = selectedValues.includes(name)
      ? selectedValues.filter(value => value !== name)
      : [...selectedValues, name];

    setSelectedValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}

      <div
        className={cn(
          styles.ProductOptions__section,
          styles.ProductOptions__sectionCheckbox
        )}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        {data.items.map(v => {
          if (v.type === 'check' || v.type === 'minus') {
            return (
              <Checkbox
                key={v.name}
                label={v.label}
                variant={v.type}
                selected={selectedValues.includes(v.name)}
                onToggle={() => handleCheckboxChange(v.name)}
              />
            );
          }

          if (v.type === 'toggle') {
            return (
              <Toggle
                value={selectedValues.includes(v.name)}
                onToggle={() => handleCheckboxChange(v.name)}
                size="sm"
                label={v.label}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

// ======

const AmountInputComponent: React.FC<GroupProps<ProductOption__Amount>> = ({
  data,
  onChange,
}) => {
  const [value, setValue] = useState<number | undefined>(data.item.value);
  useEffect(() => onChange(value), [value]);

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}
      <div
        className={styles.ProductOptions__section}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        <InputWrapper
          label={
            <>
              {data.item.label}{' '}
              {data.item.tooltip && <Tooltip content={data.item.tooltip} />}
            </>
          }
          description={data.item.description || ''}
        >
          <SelectNumber
            value={value || 0}
            onChange={setValue}
            min={data.item.min}
            max={data.item.max}
          />
        </InputWrapper>
      </div>
    </div>
  );
};

// ======

const DepositInputComponent: React.FC<GroupProps<ProductOption__Deposit>> = ({
  data,
  onChange,
}) => {
  const [value, setValue] = useState<number | undefined>(data.item.value);

  const handleChange = (newValue: string) => {
    const parsedValue = newValue === '' ? undefined : parseFloat(newValue);
    setValue(parsedValue);
  };

  const handleBlur = () => {
    let finalValue = value;

    if (finalValue !== undefined) {
      if (data.item.min !== undefined && finalValue < data.item.min) {
        finalValue = data.item.min;
      }
      if (data.item.max !== undefined && finalValue > data.item.max) {
        finalValue = data.item.max;
      }
    } else if (data.item.min !== undefined) {
      finalValue = data.item.min;
    }

    setValue(finalValue);

    onChange(finalValue);
  };

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}
      <div
        className={styles.ProductOptions__section}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        <Input
          label={
            <>
              {data.item.label}{' '}
              {data.item.tooltip && <Tooltip content={data.item.tooltip} />}
            </>
          }
          description={data.item.description || ''}
          type="number"
          currency={data.item.name}
          value={value !== undefined ? value.toString() : ''}
          placeholder={data.item.placeholder || ''}
          min={data.item.min}
          max={data.item.max}
          onChange={e => handleChange(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

// ======

const InputTextComponent: React.FC<GroupProps<ProductOption__InputText>> = ({
  data,
  onChange,
}) => {
  const [value, setValue] = useState<string | undefined>(data.item.value);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleBlur = () => {
    onChange(value);
  };

  const { validation } = useProductContext();
  const selfErrorData = validation.inputs[data.option_name];
  const showError =
    validation.showAllError || selfErrorData?.showError;


  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}
      <div
        className={styles.ProductOptions__section}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        <Input
          label={
            <>
              {data.item.label}{' '}
              {data.item.tooltip && <Tooltip content={data.item.tooltip} />}
            </>
          }
          description={data.item.description || ''}
          type="text"
          value={value !== undefined ? value : ''}
          placeholder={data.item.placeholder || ''}
          onChange={e => handleChange(e.target.value)}
          onBlur={handleBlur}
          error={showError ? selfErrorData?.errorText : undefined}
          isError={showError}
        />
      </div>
    </div>
  );
};

const InputEmailComponent: React.FC<GroupProps<ProductOption__InputEmail>> = ({
  data,
  onChange,
}) => {
  const prof = useProfile();

  const [value, setValue] = useState<string | undefined>(data.item.value);
  const [isUserModified, setIsUserModified] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setIsUserModified(true);
  };

  const handleBlur = () => {
    onChange(value);
  };

  useEffect(() => {
    if (prof.data?.email && !isUserModified && value !== prof.data?.email) {
      setValue(prof.data?.email);
      onChange(prof.data?.email);
    }
  }, [prof.data?.email, onChange]);

  const { validation } = useProductContext();
  const selfErrorData = validation.inputs[data.option_name];
  const showError = validation.showAllError || selfErrorData?.showError;

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}
      <div
        className={styles.ProductOptions__section}
        style={{ '--cols': data.cols || 1 } as React.CSSProperties}
      >
        <Input
          label={
            <>
              {data.item.label}{' '}
              {data.item.tooltip && <Tooltip content={data.item.tooltip} />}
            </>
          }
          description={data.item.description || ''}
          type="email"
          value={value !== undefined ? value : ''}
          placeholder={data.item.placeholder || ''}
          onChange={e => handleChange(e.target.value)}
          onBlur={handleBlur}
          error={showError ? selfErrorData?.errorText : undefined}
          isError={showError}
        />
      </div>
    </div>
  );
};

const countBonuses = (
  data: ProductOption__Bonus,
  options: { [key: string]: any; } | undefined,
  currencies: Currencies) => {
  const { setBonus } = useProductContext();

  let realBonus: number = data.item.value || 0;
  let currency: number = 1;
  if (data.item.type === 'percent') {
    if (options?.region === 'cis') {
      realBonus = options.steam_deposit_amount_usd || 0
      currency = currencies['USD']
    } else if (options?.region === 'kz') {
      realBonus = options.steam_deposit_amount_kzt || 0
      currency = currencies['KZT']
    } else if (options?.region === 'ru') {
      realBonus = options.steam_deposit_amount_rub || 0
    }
    realBonus = Math.round((realBonus * currency) / 100 * data.item.value)

  }
  setBonus(realBonus)
  return realBonus
}

export const BonusComponent: React.FC<
  GroupProps<ProductOption__Bonus>
> = ({ data, options, currencies, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(true);
  const BONUSES_TEXT = ['бонус', 'бонуса', 'бонусов'] as const;

  const realBonus = countBonuses(data, options, currencies!)
  const { data: prof } = useProfile();

  return (
    <div className={styles.ProductOptions__group}>
      {
        data.item.type === 'percent'
          ? <Panel.Title>{selectedValue
            ? `${data.item.value}% бонусов: ${realBonus}`
            : `- ${(prof?.bonuses || 0)} ${plural((Number(data.item.value)), ...BONUSES_TEXT)}`}</Panel.Title>
          : <Panel.Title>{`${data.item.value} ${plural((Number(data.item.value)), ...BONUSES_TEXT)}`}</Panel.Title>
      }

      <InputWrapper
        label={<></>}
        description={''}
      >
        <div
          className={styles.ProductOptions__section}
          style={{ '--cols': 2 } as React.CSSProperties}>
          <RadioButton
            key={1}
            selected={selectedValue}
            onClick={() => {
              setSelectedValue(true);
              onChange(realBonus);
            }}
            disabled={isNaN(prof?.id || NaN)}>
            {'Начислить'}
          </RadioButton>
          <RadioButton
            key={0}
            selected={!selectedValue}
            onClick={() => {
              setSelectedValue(false);
              onChange(0 - (prof?.bonuses || 0));
            }}
            disabled={isNaN(prof?.id || NaN)}>
            {'Списать'}
          </RadioButton>
        </div>
      </InputWrapper>
    </div>
  );
};



const ToggleParentComponent: React.FC<
  GroupProps<ProductOption__ToggleParent>
> = ({ data, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(data.default_value);

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}

      <InputWrapper
        label={
          <>
            {data.label} {data.tooltip && <Tooltip content={data.tooltip} />}
          </>
        }
        description={data.description || ''}
      >
        <div
          className={styles.ProductOptions__section}
          style={{ '--cols': data.cols || 1 } as React.CSSProperties}
        >
          {data.items.map(v => (
            <RadioButton
              key={v.value}
              icon={v.icon && <img src={v.icon} />}
              selected={selectedValue?.value === v.value}
              onClick={() => {
                setSelectedValue(v);
                onChange(v!.value);
              }}
            >
              {v.label}
            </RadioButton>
          ))}
        </div>
      </InputWrapper>
    </div>
  );
};

const RadioParentComponent: React.FC<
  GroupProps<ProductOption__RadioParent>
> = ({ data, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(data.default_value);

  const changeHandler = useCallback(
    (value: RadioParentOption) => {
      let nv: typeof selectedValue = undefined;

      if (data.canByDisabled && selectedValue?.value === value.value) {
        nv = undefined;
      } else {
        nv = value;
      }

      setSelectedValue(nv);
      onChange(nv?.value || null);
    },
    [selectedValue, setSelectedValue]
  );

  // useEffect(() => {
  //   onChange(selectedValue);
  // }, [selectedValue, onChange]);

  return (
    <div className={styles.ProductOptions__group}>
      {data.title && <Panel.Title>{data.title}</Panel.Title>}

      <InputWrapper
        label={
          <>
            {data.label} {data.tooltip && <Tooltip content={data.tooltip} />}
          </>
        }
        description={data.description || ''}
      >
        <div
          className={styles.ProductOptions__section}
          style={{ '--cols': data.cols || 1 } as React.CSSProperties}
        >
          {data.items.map(v => {
            if (v.type === 'check' || v.type === 'minus') {
              return (
                <Checkbox
                  key={`${data.option_name}__${v.value}`}
                  label={v.label}
                  variant={v.type}
                  selected={selectedValue?.value === v.value}
                  onToggle={() => changeHandler(v)}
                />
              );
            }

            if (v.type === 'toggle') {
              return (
                <Toggle
                  key={`${data.option_name}__${v.value}`}
                  value={selectedValue?.value === v.value}
                  onToggle={() => changeHandler(v)}
                  size="sm"
                  label={v.label}
                />
              );
            }
          })}
        </div>
      </InputWrapper>
    </div>
  );
};
