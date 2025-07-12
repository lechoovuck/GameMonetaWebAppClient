import ReactSelect, { OnChangeValue } from 'react-select';
import cn from 'classnames';
import { Icon } from '../icon';
import { InputWrapper, InputWrapperProps } from '../input-wrapper';
import styles from './styles.module.scss';

type OptionType = { value: string | number; label: string | number };

interface SelectProps {
  options: OptionType[];
  value?: OptionType;
  default_value?: OptionType;
  onChange?: (value: OnChangeValue<OptionType, false>) => void;
}

export const Select: React.FC<SelectProps & InputWrapperProps> = ({
  options,
  value,
  default_value,
  onChange,
  ...props
}) => {
  return (
    <InputWrapper {...props}>
      <ReactSelect
        options={options}
        value={value}
        defaultValue={default_value}
        onChange={onChange}
        //
        styles={{
          option: (_, { isSelected }) => ({
            backgroundColor: isSelected ? 'var(--additional-color)' : undefined,
          }),
        }}
        formatOptionLabel={({ label, value }, { context, selectValue }) => (
          <>
            {label}
            {context === 'menu' && selectValue?.[0]?.value === value && (
              <Icon name="check" className={styles.Select__check} />
            )}
          </>
        )}
        classNames={{
          control: () => styles.Select__control,
          input: () => styles.Select__input,
          placeholder: () => styles.Select__placeholder,
          singleValue: () => styles.Select__singleValue,
          indicatorSeparator: () => styles.Select__indicatorSeparator,
          indicatorsContainer: () => styles.Select__indicatorsContainer,
          //
          menu: () => styles.Select__menu,
          option: ({ isFocused }) =>
            cn(styles.Select__option, isFocused && styles.Select__option_focus),
        }}
        isSearchable={false}
      />
    </InputWrapper>
  );
};
