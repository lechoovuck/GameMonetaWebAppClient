import styles from '@/pages/_layouts/styles.module.scss';

export const SteamLinkInstruction: React.FC = () => {
  return (
    <main className={styles.ContentLayout}>
      <ol>
        <li>Перейдите в раздел "Друзья" в Steam
          <img src='https://img3.teletype.in/files/69/5e/695e556f-4816-4b9e-beb2-1ab47f68c6e8.png' />
        </li>

        <li>Нажмите зеленую кнопку "Добавить друга"
          <img src='https://img2.teletype.in/files/9f/56/9f56e9dd-e893-4004-826c-1e7ba128233f.png' />
        </li>

        <li>Скопируйте данную ссылку и вставьте в нужное поле
          <img src='https://img2.teletype.in/files/d2/56/d256df26-40c9-4924-8ef0-eb04166636a0.png' />
        </li>
      </ol>
    </main>
  );
};
