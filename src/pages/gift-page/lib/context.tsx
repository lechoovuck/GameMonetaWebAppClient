import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

interface ValidationInput {
  isValid: boolean;
  errorText: string;
  showError: boolean; // после взаимодействия пользователя с полем, включать отображение ошибок
}

interface ValidationValue {
  inputs: Record<string, ValidationInput>;
  showAllError: boolean; // ставим true после попытки отправить форму
}

// Интерфейс контекста
interface ProductContextProps {
  paymentSystem: 'lava' | 'profitable';
  setPaymentSystem: (paymentSystem: 'lava' | 'profitable') => void;
  totalPrice: number;
  payload: ProductPayload;
  setTotalPrice: (price: number) => void;
  bonus: number;
  setBonus: (bonus: number) => void;
  setPayload: React.Dispatch<React.SetStateAction<ProductPayload>>;
  //
  validation: ValidationValue;
  validationSync: (names: string[]) => void;
  validationShowError: (names: string[]) => void;
  validationSetError: (error: Record<string, string>) => void;
  validatorShowAllErrors: () => void;
  isValidForm: boolean;
}

// Создание контекста
const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

// Компонент провайдера контекста
export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [paymentSystem, setPaymentSystem] = useState<'lava' | 'profitable'>('lava');
  
  const [payload, setPayload] = useState<ProductPayload>({
    product_id: 0,
    options: [],
    pay_options: { method: 'сбп' },
    delivery: {
      email: '',
      other: [],
    },
  });

  useEffect(() => {
    if (payload.product_id !== 1) setPaymentSystem('lava')
    else setPaymentSystem('profitable')
  }, [payload, setPayload])

  const [validation, setValidation] = useState<ValidationValue>({
    inputs: {},
    showAllError: false,
  });

  const validationSync = (names: string[]) =>
    setValidation(os => {
      const ns = JSON.parse(JSON.stringify(os)) as ValidationValue;

      // удалить несуществующие
      const inputs: ValidationValue['inputs'] = Object.fromEntries(
        Object.entries(ns.inputs).filter(v => names.includes(v[0]))
      );

      // добавить новые
      names
        .filter(v => !inputs[v])
        .forEach(name => {
          inputs[name] = {
            errorText: '',
            isValid: true,
            showError: false,
          };
        });

      ns.inputs = inputs;

      return ns;
    });

  const validationShowError = (names: string[]) =>
    setValidation(os => {
      const ns = JSON.parse(JSON.stringify(os)) as ValidationValue;
      names.forEach(name => (ns.inputs[name].showError = true));
      return ns;
    });

  const validationSetError = (error: Record<string, string>) =>
    setValidation(os => {
      const ns = JSON.parse(JSON.stringify(os)) as ValidationValue;

      Object.keys(ns.inputs).forEach(key => {
        if (ns.inputs[key]) {
          if (error[key]) {
            ns.inputs[key].isValid = false;
            ns.inputs[key].errorText = error[key];
          } else {
            ns.inputs[key].isValid = true;
            ns.inputs[key].errorText = '';
          }
        }
      });

      return ns;
    });

  const validatorShowAllErrors = () =>
    setValidation(os => {
      const ns = JSON.parse(JSON.stringify(os)) as ValidationValue;
      ns.showAllError = true;
      return ns;
    });

  const isValidForm = useMemo(() => {
    return Object.values(validation.inputs).findIndex(v => !v.isValid) === -1;
  }, [validation]);

  return (
    <ProductContext.Provider
      value={{
        paymentSystem,
        setPaymentSystem,
        totalPrice,
        payload,
        setTotalPrice,
        bonus,
        setBonus,
        setPayload,
        validation,
        validationSync,
        validationShowError,
        validationSetError,
        validatorShowAllErrors,
        isValidForm,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Хук для использования контекста
export const useProductContext = (): ProductContextProps => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
