interface CarouselItemParams {
  image: string;
  description?: string;
  url?: string;
  url_external?: boolean;
}

// ======================

interface ProductOption__GroupBase {
  option_name: string;
  title?: string;
  cols?: number;
  child_group_name?: string;
  icon?: string;
}

// #region ParentOptions
// Кнопки переключатели для "родительских" опций
type ToggleParentOption = {
  label: string | number;
  value: string | number;
  icon?: string;
  child_group?: string;
  child_group_name?: string;
  price?: number;
};

interface ProductOption__ToggleParent
  extends Omit<ProductOption__GroupBase, 'child_group_name'> {
  type: '__parent_toggle';
  items: ToggleParentOption[];
  default_value?: ToggleParentOption;
  //
  label?: string;
  tooltip?: string;
  description?: string;
  child_group?: string;
  child_group_name?: string;
}

// Radio для "родительских" опций
type RadioParentOption = {
  label: string | number;
  value: string | number;
  type: 'check' | 'minus' | 'toggle';
  child_group: string;
  child_group_name?: string;
  price?: number;
};

interface ProductOption__RadioParent
  extends Omit<ProductOption__GroupBase, 'child_group_name'> {
  type: '__parent_radio';
  items: RadioParentOption[];
  default_value?: RadioParentOption;
  canByDisabled?: boolean;
  //
  label?: string;
  tooltip?: string;
  description?: string;
  child_group_name?: string;
}
// #endregion ParentOptions

// #region ChildOptions
// Схема инпута с выбором вариантов в выпадающем списке
type SelectOption = {
  label: string | number;
  value: string | number;
  price: number;
};

interface ProductOption__GroupSelect extends ProductOption__GroupBase {
  type: 'select';
  items: SelectOption[];
  default_value?: Omit<SelectOption, 'price'>;
  label?: string;
  description?: string;
}

// Схема для "radio кнопок" с иконкой
type RadioOption = {
  label: string | number;
  value: string | number;
  price: number;
};

interface ProductOption__GroupRadio extends ProductOption__GroupBase {
  type: 'radio';
  icon?: string;
  items: RadioOption[];
  default_value?: Omit<RadioOption, 'price'>;
}

// Схема для чекбоксов
type CheckboxOption = {
  label: string;
  name: string;
  value?: boolean;
  price: number;
  type: 'check' | 'minus' | 'toggle';
};

interface ProductOption__GroupCheckbox extends ProductOption__GroupBase {
  type: 'checkbox';
  items: CheckboxOption[];
}

// Схема для ввода кол-ва
type AmountInput = {
  name: string;
  label?: string;
  value?: number;
  tooltip?: string;
  description?: string;
  min?: number;
  max?: number;
};

interface ProductOption__Amount extends ProductOption__GroupBase {
  type: 'amount';
  item: AmountInput;
}

// Схема для ввода бонусов
type BonusInput = {
  value: number;
  type: 'fixed' | 'percent';
};

interface ProductOption__Bonus extends ProductOption__GroupBase {
  type: 'bonus';
  item: BonusInput;
}

// Схема для депозита
type DepositInput = {
  name: 'rub' | 'kzt' | 'usd';
  label?: string;
  value?: number;
  tooltip?: string;
  description?: string;
  placeholder?: string;
  min?: number;
  max?: number;
};

interface ProductOption__Deposit extends ProductOption__GroupBase {
  type: 'deposit';
  item: DepositInput;
}

interface TextInput {
  label: string;
  tooltip?: string;
  description?: string;
  value?: string;
  placeholder?: string;
}

interface ProductOption__InputText extends ProductOption__GroupBase {
  type: 'input_text';
  item: TextInput;
  is_required?: boolean;
}

interface ProductOption__SteamLink extends ProductOption__GroupBase {
  type: 'steam_link';
  item: TextInput;
  is_required?: boolean;
}


interface EmailInput {
  label: string;
  tooltip?: string;
  description?: string;
  value?: string;
  placeholder?: string;
}

interface ProductOption__InputEmail extends ProductOption__GroupBase {
  type: 'input_email';
  item: EmailInput;
}

type ProductOption =
  | ProductOption__ToggleParent
  | ProductOption__RadioParent
  | ProductOption__GroupRadio
  | ProductOption__GroupSelect
  | ProductOption__GroupCheckbox
  | ProductOption__Amount
  | ProductOption__Bonus
  | ProductOption__Deposit
  | ProductOption__InputText
  | ProductOption__InputEmail
  | ProductOption__SteamLink;

interface ProductDelivery {
  type: 'text' | 'number';
  key: string;
  is_required: boolean;
  label: string;
  //
  placeholder: string | null;
  value: string | null;
  tooltip: string | null;
  description: string | null;
}

// ======================

// type Category = 'game' | 'service' | 'app';
interface Category {
  id: number;
  name: string;
  type: string;
  description?: string;
  image_url?: string;
}

interface Subcategory {
  id: number;
  category: Category;
  name: string;
  description: string;
  image_url: string;
}

interface Alias {
  id: number;
  alias: string;
  product: Product;
}

interface Product {
  id: number;
  name: string;
  subcategory: Subcategory;
  price: number | null;
  description: string;
  image_url: string;
  preview_image_url?: string;
  icon?: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface ProductsFaqProps {
  faqData: FaqItem[];
}

interface ProductFull extends Product {
  options: ProductOption[];
  options_text?: string;
  delivery_inputs: ProductDelivery[];
  faq: FaqItem[];
}

interface Currencies {
  KZT: number;
  USD: number;
  update_time: number;
}

// объект "опций" продукта для передачи на сервер
interface ProductOptionPayload {
  option_id: string;
  type:
  | '__parent_toggle'
  | '__parent_radio'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'amount'
  | 'bonus'
  | 'deposit'
  | 'input_text'
  | 'input_email'
  | 'steam_link';
  title?: string;
  value: string | number | string[]; // Select and Radio will have string or number, Checkbox will have string array
}

type PayMethod = 'сбп' | 'card' | 'webmoney' | 'usdt' | 'lava';
type PayRegion = 'ru' | 'kz' | 'cis';
type PayStatus = 'wait' | 'paid' | 'canceled' | 'refunded' | 'error' | 'process' | 'order_ok' | 'order_error';

interface ProductPayload {
  product_id: number;
  options: ProductOptionPayload[];
  pay_options: {
    method: PayMethod;
    //  region: PayRegion;
  };
  delivery: {
    email: string;
    other: {
      key: string;
      value: string | null;
    }[];
  };
  currencies?: Currencies;
}
