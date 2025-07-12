import { useToggle } from 'react-use';
import { useMutation } from '@tanstack/react-query';
import { useUserStore } from '@/store/user';
import { fetchAuthForgotPassword } from '@/shared/api/fetchers/auth';
import { Button, Grid, Icon, Modal } from '@/shared/ui';
import { Group } from '../group';
import { ChangeEmailModal, DangerItem } from './ui';
import styles from './ProfileDangerZone.module.scss';
import { FullProfileInfo } from '@/types/profile';
import { useInvalidateProfile } from '@/shared/api';

interface ProfileInfoProps {
  profile: FullProfileInfo;
}

export const ProfileDangerZone: React.FC<ProfileInfoProps> = ({ profile }) => {
  const { logOut } = useUserStore();

  const [isShowPassModal, toggleIsShowPassModal] = useToggle(false);
  const [isShowEmailModal, toggleIsShowEmailModal] = useToggle(false);
  const invalidateProfile = useInvalidateProfile();

  const resetPasswordMutation = useMutation({
    mutationFn: fetchAuthForgotPassword,
    onSuccess: () => {
      toggleIsShowPassModal(false);
      invalidateProfile();
      logOut();
    },
  });

  const resetPasswordHandler = () => {
    if (resetPasswordMutation.isPending) return;

    if (profile?.email) resetPasswordMutation.mutate({ email: profile.email });
  };

  return (
    <Group title="Опасная зона" className={styles.ProfileDangerZone}>
      <p
        style={{
          color: 'var(--red)',
          marginBottom: 'var(--space-md)',
          fontWeight: 400,
        }}
      >
        Будьте очень внимательны при внесении изменений в данном разделе. Т.к.
        при бездумном изменении настроек ниже, можно лишиться доступа к
        аккаунту!
      </p>

      <div className={styles.ProfileDangerZone__list}>
        {
          profile.email && <DangerItem
            title="Сменить email"
            desc={
              <p>
                Ваш текущий email: <b>{profile.email}</b>
              </p>
            }
            textButton="Сменить email"
            onClick={toggleIsShowEmailModal} />
        }

        <DangerItem
          title="Сбросить пароль"
          desc={
            <>
              <p>
                Мы отправим вам на почту письмо с ссылкой на создание нового
                пароля.
              </p>
              <p>
                Сразу после нажатия на кнопку, аккаунт перестанет быть доступен
                по текущему паролю. И все активные сессии будут прерваны.
              </p>
            </>
          }
          textButton="Сбросить пароль"
          onClick={toggleIsShowPassModal}
        />
      </div>

      <ChangeEmailModal
        isOpen={isShowEmailModal}
        onClose={() => toggleIsShowEmailModal(false)}
      />

      <Modal
        isOpen={isShowPassModal}
        onClose={toggleIsShowPassModal}
        title={'Подтвердите действие!'}
      >
        <div>
          <p>
            Вы уверены что хотите сбросить пароль? Все активные сеансы для
            данного аккаунта будут удалены (нужно будет логиниться заново с
            новым паролем).
          </p>

          <Grid cols={2} colsMd={1}>
            <Button
              color="danger"
              isOutline
              onClick={resetPasswordHandler}
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? (
                <Icon name="loader" spin />
              ) : (
                'Cбросить пароль!'
              )}
            </Button>

            <Button color="default" isOutline onClick={toggleIsShowPassModal}>
              Нет, я передумал
            </Button>
          </Grid>
        </div>
      </Modal>
    </Group>
  );
};
