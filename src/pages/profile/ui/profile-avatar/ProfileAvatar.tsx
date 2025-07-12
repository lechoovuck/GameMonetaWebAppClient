import { useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useInvalidateProfile, useProfile } from '@/shared/api';
import {
  fetchProfileAvatarChange,
  fetchProfileAvatarRemove,
} from '@/shared/api/fetchers/profile';
import { Button, Icon } from '@/shared/ui';
import { Group } from '../group';
import styles from './ProfileAvatar.module.scss';

interface ProfileAvatarProps {}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = () => {
  const { data: profile } = useProfile();

  const invalidateProfile = useInvalidateProfile();

  const removeAvatarMutation = useMutation({
    mutationFn: fetchProfileAvatarRemove,
    onSuccess: invalidateProfile,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const changeAvatarMutation = useMutation({
    mutationFn: fetchProfileAvatarChange,
    onSuccess: invalidateProfile,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // setFile(e.target.files[0]);
      const formData = new FormData();
      formData.append('file', e.target.files[0]);
      changeAvatarMutation.mutate(formData);
    }
  };

  return (
    <Group title="Фото профиля">
      <div className={styles.ProfileAvatar}>
        <img
          className={styles.ProfileAvatar__image}
          src={profile?.photo || '/images/default_avatar.jpg'}
          srcSet={profile?.photo || '/images/default_avatar@2x.jpg 2x'}
          alt="аватар профиля"
        />

        <div className={styles.ProfileAvatar__col2}>
          <div className={styles.ProfileAvatar__sizeRecomendation}>
            Рекомендуемый размер
            <br /> 320x320 px
          </div>

          <div className={styles.ProfileAvatar__buttons}>
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              onClick={openFileDialog}
              disabled={changeAvatarMutation.isPending}
            >
              {changeAvatarMutation.isPending ? (
                <Icon name="loader" spin />
              ) : (
                'Изменить'
              )}
            </Button>

            <Button
              color="dark_red"
              disabled={removeAvatarMutation.isPending}
              onClick={() => removeAvatarMutation.mutate()}
            >
              {removeAvatarMutation.isPending ? (
                <Icon name="loader" spin />
              ) : (
                'Удалить'
              )}
            </Button>
          </div>
        </div>
      </div>
    </Group>
  );
};
