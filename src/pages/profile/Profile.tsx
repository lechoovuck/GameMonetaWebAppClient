import { FullProfileInfo } from '@/types/profile';
import { Panel } from '@/shared/ui';
import { PrivateLayout } from '../_layouts';
import { ProfileAvatar, ProfileDangerZone, ProfileInfo } from './ui';
import styles from './Profile.module.scss';
import { useProfile } from '@/shared/api';
import React, { useEffect, useState } from 'react';
import { Loader } from '@/shared/ui';
import { useLocation } from 'react-router-dom';

const placeholderProfile: FullProfileInfo = {
  email: '',
  id: 0,
  gender: 'male',
  name: '',
  photo: null,
  bonuses: 0,
};

interface ProfileProps {
  // children?: React.ReactNode;
}

export const Profile: React.FC<ProfileProps> = () => {
  const { data } = useProfile();
  
  const location = useLocation();
  const telegramConnectResponse = location.state?.telegramConnectResponse;

  const [profile, setProfile] = useState<FullProfileInfo>(placeholderProfile);

  useEffect(() => {
    if (data) {
      setProfile(data);
    }
  }, [data]);

  return (
    <PrivateLayout title="Мой профиль">
      {profile.id === 0 
      ? <div
        style={{
          height: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Loader />
      </div>
      : <Panel className={styles.Profile}>
        <h3>Мой профиль</h3>

        <ProfileAvatar />
        <ProfileInfo profile={profile} telegramConnectResponse={telegramConnectResponse}/>
        <ProfileDangerZone profile={profile}/>
      </Panel>
      }
      
    </PrivateLayout>
  );
};
