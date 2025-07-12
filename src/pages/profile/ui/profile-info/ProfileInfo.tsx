import React, { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { FullProfileInfo, Gender } from '@/types/profile';
import { useUserStore } from '@/store/user';
import { fetchProfileChangeInfo } from '@/shared/api/fetchers/profile';
import { Button, Checkbox, CopyStatus, Field, Icon } from '@/shared/ui';
import { Group } from '../group';
import styles from './ProfileInfo.module.scss';
import { useInvalidateProfile } from '@/shared/api/hooks/profile';
import { useCopyToClipboard } from 'react-use';
import { useToggle } from 'react-use';
import { AssignProfileModal } from './ui/assign-profile-modal';
import { ApiRoute, BACKEND_URL, OauthMethod } from '@/const';
import { ITelegramConnectOAuthRes } from '@/types/oauth'
import { useQueryClient } from '@tanstack/react-query';


interface ProfileInfoProps {
  profile: FullProfileInfo;
  telegramConnectResponse?: ITelegramConnectOAuthRes;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, telegramConnectResponse }) => {
  const [gender, setGender] = useState<Gender>(() => profile.gender || 'male');
  const [name, setName] = useState(() => profile.name || '');
  
  
  const [isShowAssignProfileModal, toggleIsShowAssignProfileModal] = useToggle(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    setGender(profile.gender ?? 'male');
    setName(profile.name ?? '');
  }, [profile]);

  const invalidateProfile = useInvalidateProfile();

  const profileInfoMutation = useMutation({
    mutationFn: () => fetchProfileChangeInfo({ gender, name }),
    onSuccess: invalidateProfile,
  });

  useEffect(() => {
    if (profile.gender !== gender || profile.name !== name) {
      profileInfoMutation.mutate();
    }
  }, [gender, name]);

  const connectOAuthWith = (method: OauthMethod) => {
    let redirectUrl = BACKEND_URL + '/';

    switch (method) {
      case OauthMethod.Vk: {
        redirectUrl += ApiRoute.OauthVKConnect;
        break;
      }
      case OauthMethod.Telegram: {
        redirectUrl += ApiRoute.OauthTelegramConnect;
        break;
      }
      default: {
        throw Error(
          'Для одного или более метода OAUTH не определен redirect_url'
        );
      }
    }

    window.location.href = redirectUrl;
  };


  const [copyStatus, copy] = useCopyToClipboard();

  const { logOut } = useUserStore();

  const logOutAction = () => {
    queryClient.resetQueries({ queryKey: ['ProfileMe'] });

    logOut();
  };


  return (
    <Group title="Личная информация" contentClassName={styles.ProfileInfo}>
      <Field
        label={
          <>
            ID аккаунта <CopyStatus status={copyStatus} />
          </>
        }
        value={String(profile.id)}
        buttonAction={() => copy(String(profile.id))}
        buttonIcon="copy"
      />

      <Field label="Имя" value={name} onChange={value => setName(value)} />

      <div className={styles.ProfileInfo__gender}>
        <Checkbox
          selected={gender === 'male'}
          onToggle={() => setGender('male')}
          label="Мужской"
        />
        <Checkbox
          selected={gender === 'female'}
          onToggle={() => setGender('female')}
          label="Женский"
        />
      </div>

      <div className={styles.ProfileInfo__oauth}>
        {
          profile.telegramId && (profile.email === null || profile.email === undefined) &&
          <div className={styles.ProfileInfo__oauth_block} onClick={toggleIsShowAssignProfileModal}>
            <span>Привязать почту</span>
            <Button
              color="dark_white"
              isOnlyIcon
              aria-label="Привязывание аккаунта с входом через email"
              title="Авторизация через email"
            >
              <Icon name="email" />
            </Button>
          </div>
        }
        {!profile.telegramId &&
          <div className={styles.ProfileInfo__oauth_block} onClick={() => connectOAuthWith(OauthMethod.Telegram)}>
            <span>Привязать Telegram</span>
            <Button
              color="dark_white"
              isOnlyIcon
              aria-label="Привязывание аккаунта с входом через telegram"
              title="Авторизация через telegram"
            >
              <Icon name="telegram" />
            </Button>
          </div>
        }
        {
          telegramConnectResponse && <p
            className={styles.ProfileInfo__oauth__message_text + telegramConnectResponse.success ? styles.success : styles.error}
            style={{
              color: telegramConnectResponse.success ? '#297655' : '#ca2222',
              textAlign: 'center',
              marginTop: '1rem',
            }}>
            {telegramConnectResponse.message}
          </p>
        }
      </div>


      <div>
        <Button color="dark_red" onClick={logOutAction}>
          Выйти
        </Button>
      </div>

      <AssignProfileModal
        isOpen={isShowAssignProfileModal}
        onClose={() => toggleIsShowAssignProfileModal(false)}
      />

    </Group>
  );
};
