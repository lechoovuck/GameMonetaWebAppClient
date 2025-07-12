export const productsPlaceholder = [
  {
    id: 1,
    subcategory: {
      id: 1,
      category: {
        id: 1,
        name: 'test',
        type: 'test',
      },
      name: 'test',
      description: 'test',
      image_url: 'test',
    },
  },
].map(v => ({
  ...v,
})) as Product[];

export const getProductById = (id: number): ProductFull => {
  const product = productsPlaceholder.find(v => v.id === id);

  if (!product) {
    throw new Error('Product not found');
  }

  // Генерация демонстрационных данных для опций
  const generateOptions = (): ProductOption[] => [
    // #region Group #1
    {
      type: '__parent_toggle',
      title: 'Выберите регион',
      option_name: 'region',
      cols: 3,
      label: 'Я label',
      tooltip: 'Я tooltip',
      description: 'Выберите регион аккаунта, а затем сумму пополнения',
      items: [
        {
          label: 'Европа',
          value: 'eu',
          icon: '/images/icons/europe.png',
          child_group: 'region_eu',
        },
        {
          label: 'США',
          value: 'usa',
          icon: '/images/icons/usa.png',
          child_group: 'region_usa',
        },
        {
          label: 'ОАЭ',
          value: 'uae',
          icon: '/images/icons/uae.png',
          child_group: 'region_uae',
        },
      ],
      default_value: {
        label: 'США',
        value: 'usa',
        icon: '/images/icons/usa.png',
        child_group: 'region_usa',
      },
    },
    {
      child_group_name: 'region_eu',
      option_name: 'wallet_eu',
      type: 'radio',
      title: 'Сумма пополнения',
      cols: 3,
      items: [
        { label: '10€', value: 10, price: 10 * 93 },
        { label: '25€', value: 25, price: 25 * 93 },
        { label: '50€', value: 50, price: 50 * 93 },
      ],
      default_value: { label: '10€', value: 10 },
    },
    {
      child_group_name: 'region_uae',
      option_name: 'wallet_uae',
      type: 'radio',
      title: 'Сумма пополнения',
      cols: 4,
      items: [
        { label: '20$', value: 20, price: 20 * 83 },
        { label: '34$', value: 34, price: 34 * 83 },
        { label: '50$', value: 50, price: 50 * 83 },
        { label: '83$', value: 83, price: 83 * 83 },
      ],
      default_value: { label: '20$', value: 20 },
    },
    {
      child_group_name: 'region_usa',
      option_name: 'wallet_usa',
      title: 'Сумма пополнения',
      type: 'deposit',
      item: {
        name: 'rub',
        value: 100,
        min: 1,
        max: 10000,
      },
    },

    // #region Group #2
    {
      type: '__parent_radio',
      title: 'Дополнительный способ связи',
      option_name: 'additional_method_communication',
      cols: 3,
      description: 'При желании вы можете указать дополнительный способ связи',
      items: [
        {
          label: 'Нехочу',
          value: 'none',
          type: 'toggle',
          child_group: 'additional_method_communication__none',
        },
        {
          label: 'Телеграм',
          value: 'telegram',
          type: 'toggle',
          child_group: 'additional_method_communication__telegram',
        },
        {
          label: 'Discord',
          value: 'discord',
          type: 'toggle',
          child_group: 'additional_method_communication__discord',
        },
      ],
      default_value: {
        label: 'Нехочу',
        value: 'none',
        type: 'toggle',
        child_group: 'additional_method_communication__none',
      },
    },
    {
      child_group_name: 'additional_method_communication__telegram',
      type: 'input_text',
      option_name: 'adiitional_contact__telegram',
      is_required: true,
      item: {
        label: 'Ссылка на телеграм',
        placeholder: '@keyzog',
      },
    },
    {
      child_group_name: 'additional_method_communication__discord',
      type: 'input_text',
      option_name: 'adiitional_contact__discord',
      is_required: true,
      item: {
        label: 'Профиль в Discord',
        placeholder: '#12345',
      },
    },

    // #region Group #3
    {
      type: '__parent_radio',
      title: 'Отключаемый переключатель',
      option_name: 'parent_test',
      canByDisabled: true,
      items: [
        {
          label: 'Я хочу дополнительно получить [...]',
          value: '1',
          type: 'check',
          child_group: 'parent_test__1',
        },
      ],
    },
    {
      child_group_name: 'parent_test__1',
      option_name: 'parent_test_option',
      type: 'radio',
      title: 'Выберите один из вариантов',
      cols: 2,
      items: [
        { label: '8 алмазов', value: 1, price: 50 },
        { label: '32 алмаза + 3 бонуса', value: 2, price: 150 },
        { label: '80 алмазов + 8 бонусов', value: 3, price: 250 },
        { label: '1186 алмазов + 224 бонуса', value: 4, price: 350 },
      ],
      default_value: { label: '80 алмазов + 8 бонусов', value: 3 },
      icon: id % 2 === 0 ? '/images/icons/gem.png' : '/images/icons/gold.png',
    },

    // #region DataFromJSON
    {
      option_name: 'login',
      type: 'input_text',
      title: 'Логин аккаунта',
      item: {
        label: 'Где найти логин?',
        value: '',
        tooltip: 'вот здесь',
        description: 'fw',
      },
    },
    {
      option_name: 'email',
      type: 'input_email',
      title: 'Ваш E-Mail',
      item: {
        label: 'Email',
        value: '',
      },
    },

    // ========================
    // {
    //   option_name: 'deposit_1',
    //   title: 'title deposit',
    //   type: 'deposit',
    //   item: {
    //     name: 'name deposit',
    //     label: 'label deposit',
    //     value: 100,
    //     tooltip: 'tooltip deposit',
    //     description: 'description deposit',
    //     min: 1,
    //     max: 10000,
    //   },
    // },
    // {
    //   option_name: 'amount_1',
    //   title: 'title',
    //   type: 'amount',
    //   item: {
    //     name: 'name',
    //     label: 'label',
    //     value: 10,
    //     tooltip: 'tooltip',
    //     description: 'description',
    //     min: 1,
    //     max: 20,
    //   },
    // },
    // {
    //   option_name: 'option_1',
    //   type: 'select',
    //   title: 'Выберите вариант',
    //   items: [
    //     { label: 'Вариант 1', value: 'option1', price: 100 },
    //     { label: 'Вариант 2', value: 'option2', price: 200 },
    //     { label: 'Вариант 3', value: 'option3', price: 300 },
    //   ],
    //   default_value: { label: 'Вариант 2', value: 'option2' },
    //   label: 'У меня может быть LABEL',
    // },
    // {
    //   option_name: 'option_2',
    //   type: 'radio',
    //   title: 'Выберите цвет',
    //   cols: 2,
    //   items: [
    //     { label: '8 алмазов', value: 1, price: 50 },
    //     { label: '32 алмаза + 3 бонуса', value: 2, price: 150 },
    //     { label: '80 алмазов + 8 бонусов', value: 3, price: 250 },
    //     { label: '1186 алмазов + 224 бонуса', value: 4, price: 350 },
    //     { label: '5136 алмазов + 1027 бонус', value: 5, price: 550 },
    //   ],
    //   default_value: { label: '80 алмазов + 8 бонусов', value: 3 },
    //   icon: id % 2 === 0 ? '/images/icons/gem.png' : '/images/icons/gold.png',
    // },
    // {
    //   option_name: 'option_3',
    //   type: 'checkbox',
    //   title: 'Дополнительные опции',
    //   cols: 2,
    //   items: [
    //     {
    //       label: 'Опция A',
    //       name: 'optionA',
    //       price: 25,
    //       type: 'check',
    //       value: true,
    //     },
    //     {
    //       label: 'Опция B',
    //       name: 'optionB',
    //       price: 35,
    //       type: 'minus',
    //       value: true,
    //     },
    //     {
    //       label: 'Опция C',
    //       name: 'optionC',
    //       price: 45,
    //       type: 'toggle',
    //       value: true,
    //     },
    //     {
    //       label: 'Опция D',
    //       name: 'optionD',
    //       price: 123,
    //       type: 'toggle',
    //       value: false,
    //     },
    //     {
    //       label: 'Опция F',
    //       name: 'optionF',
    //       price: 412,
    //       type: 'toggle',
    //       value: true,
    //     },
    //   ],
    // },

    // {
    //   option_name: 'option_4',
    //   type: 'checkbox',
    //   title: 'Дополнительные опции 2',
    //   cols: 1,
    //   items: [
    //     {
    //       label:
    //         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ipsam libero.',
    //       name: 'optionB',
    //       price: 35,
    //       type: 'check',
    //       value: true,
    //     },
    //     {
    //       label:
    //         ' Quisquam, ipsam libero sit amet consectetur adipisicing elit.',
    //       name: 'optionC',
    //       price: 45,
    //       type: 'check',
    //       value: false,
    //     },
    //   ],
    // },
  ];

  return {
    ...product,
    //
    options: generateOptions(),
    options_text:
      'Можно добавить описание для этого раздела. Т.к. с большой вероятностью иногда надо будет дать больше инструкций к какомуто из товаров',
    //
    faq: [],
    delivery_inputs: [
      {
        key: 'user_id',
        label: 'Мой User ID',
        tooltip: 'Можно добавить подсказку',
        type: 'number',
        is_required: true,
        value: null,
        description: null,
        placeholder: null,
      },
      {
        key: 'zone_id',
        label: 'Zone ID',
        type: 'number',
        is_required: true,
        tooltip: null,
        value: null,
        description: null,
        placeholder: null,
      },
      {
        key: 'nick-name',
        label: 'Ник персонажа',
        type: 'text',
        is_required: false,
        placeholder: 'zxc_2018',
        //
        tooltip: null,
        value: null,
        description: 'Описание поля',
      },
    ],
  };
};
