import { useCallback, useId, useState } from 'react';
import styles from './styles.module.scss';
import { Icon, IconProps } from '../icon';
import { Input } from '../input';
import { Button } from '../button';
import classNames from 'classnames';
import { InputWrapper } from '../input-wrapper';

interface FieldProps {
  label: React.ReactNode;
  value: string;
  onChange?: (value: string) => void;
  buttonAction?: () => void;
  buttonIcon?: IconProps['name'];
}

export const Field: React.FC<FieldProps> = ({
  label,
  value,
  onChange,
  buttonAction,
  buttonIcon = 'edit',
}) => {
  const id = useId();

  const [inputIsShow, setInputIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const submitNewSteam = useCallback(() => {
    if (onChange) onChange(inputValue);

    setInputIsShow(false);
  }, [onChange, inputValue, setInputIsShow]);

  return (
    <div
      className={classNames(
        styles.Field,
        inputIsShow && styles.Field_showInput
      )}
    >
      <InputWrapper label={label} id={id} className={styles.Field__mainCol}>
        {!inputIsShow && <div className={styles.Field__value}>{value}</div>}

        {inputIsShow && onChange && (
          <form className={styles.Field__form} onSubmit={submitNewSteam}>
            <Input
              id={id}
              value={inputValue}
              className={styles.Field__input}
              onChange={e => setInputValue(e.target.value)}
            />
            <Button onClick={submitNewSteam}>
              <Icon name="check" />
            </Button>
          </form>
        )}
      </InputWrapper>

      {!onChange && buttonAction && (
        <button
          className={styles.Field__editButton}
          type="button"
          onClick={buttonAction}
        >
          <Icon name={buttonIcon} />
        </button>
      )}

      {onChange && !inputIsShow && (
        <button
          className={styles.Field__editButton}
          type="button"
          onClick={() => setInputIsShow(os => !os)}
        >
          <Icon name={buttonIcon} />
        </button>
      )}
    </div>
  );
};
