import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchProfileConnectEmail } from '@/shared/api/fetchers/profile';
import { useInvalidateProfile, useProfile } from '@/shared/api/hooks';
import { Modal, Grid, Input, Button, Icon } from '@/shared/ui';
import { getLocalStore } from '@/store/local';
import styles from './AssignProfileModal.module.scss';

interface AssignProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignProfileModal: React.FC<AssignProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: profile } = useProfile();

  const [email, setEmail] = useState(profile?.email || '');
  const [password, setPassword] = useState('');

  const [messageText, setMessageText] = useState<{ message: string; success: boolean } | null>(null);
  const [progress, setProgress] = useState(0); // Progress for countdown

  const invalidataProfile = useInvalidateProfile();

  const connectEmailMutation = useMutation({
    mutationFn: fetchProfileConnectEmail,
    onSuccess: ({message, success}) => {
      setMessageText({ message, success });
      invalidataProfile();
      setProgress(100); 
      const countdownDuration = 5000; 
      const intervalTime = 20;

      let elapsed = 0;
      const interval = setInterval(() => {
        elapsed += intervalTime;
        setProgress(100 - (elapsed / countdownDuration) * 100);
        if (elapsed >= countdownDuration) {
          clearInterval(interval);
          onClose();
          setMessageText(null);
        }
      }, intervalTime);
    },
    onError: () => {
      setMessageText({message: 'Возникла ошибка, попробуйте обновить страницу', success: false}) ;
    },
  });

const changeEmailHandler = () => {
  const checkEmail = validateEmail(true);
  const checkPass = validatePassword(true);

  if (!checkEmail || !checkPass) return;

  const { token } = getLocalStore();

  setMessageText(null);
  connectEmailMutation.mutate({ email, password, token });
};
  // валидация email
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (checkEmpty = false) => {
    if (!email.length) {
      if (checkEmpty) setEmailError('Это поле обязательно для заполенния');
      else setEmailError(null);
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Укажите валидный email');
      return false;
    }
    setEmailError(null);
    return true;
  };

  useEffect(() => {
    validateEmail();
  }, [email]);

  // валидация password
  const [passError, setPassError] = useState<string | null>(null);

  const validatePassword = (checkEmpty = false) => {
    if (!password.length) {
      if (checkEmpty) setPassError('Это поле обязательно для заполенния');
      else setPassError(null);
      return false;
    }
    if (password.length < 6) {
      setPassError('Слишком короткий пароль');
      return false;
    }
    setPassError(null);
    return true;
  };

  useEffect(() => {
    validatePassword();
  }, [password]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={'Войдите или создайте профиль'}>
      <p>При привязке аккаунта, вы сможете использовать несколько вариантов аутентификации для него</p>
      <Grid cols={1}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError || undefined}
          isError={emailError !== null}
        />
        <Input
          label="Пароль для входа"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passError || undefined}
          isError={passError !== null}
        />
      </Grid>
      
      {messageText && (
        <>
          <p
            className={styles.AssignProfileModal__message_text + messageText.success ? styles.success : styles.error}
            style={{
              color: messageText.success ? '#297655' : '#ca2222',
              textAlign: 'center',
              marginTop: '1rem',
            }}
          >
            {messageText.message}
          </p>
          {messageText.success !== null && (
            <div
              className={styles.AssignProfileModal__progress_bar}              
              style={{
                width: `${progress}%`,
              }}
            ></div>
          )}
        </>
      )}

      <div style={{ marginTop: 'var(--space-md)' }}>
        <Grid cols={2} colsMd={1}>
          <Button
            color="default"
            isOutline
            onClick={changeEmailHandler}
            disabled={connectEmailMutation.isPending}
          >
            {connectEmailMutation.isPending ? (
              <Icon name="loader" spin />
            ) : (
              'Привязать профиль'
            )}
          </Button>
        </Grid>
      </div>
    </Modal>
  );
};

