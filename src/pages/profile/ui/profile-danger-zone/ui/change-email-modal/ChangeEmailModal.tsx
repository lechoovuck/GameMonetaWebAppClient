import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchProfileChangeEmail } from '@/shared/api/fetchers/profile';
import { useInvalidateProfile, useProfile } from '@/shared/api/hooks';
import { Modal, Grid, Input, Button, Icon } from '@/shared/ui';

interface ChangeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangeEmailModal: React.FC<ChangeEmailModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { data: profile } = useProfile();

  const [email, setEmail] = useState(profile?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail(profile?.email || '');
  }, [profile]);

  const invalidateProfile = useInvalidateProfile();

  const changeEmailMutation = useMutation({
    mutationFn: fetchProfileChangeEmail,
    onSuccess: () => {
      invalidateProfile();
      onClose();
    },
  });

  const changeEmailHandler = () => {
    const isEmailValid = validateEmail(true);
    const isPasswordValid = validatePassword(true);

    if (!isEmailValid || !isPasswordValid) return;

    changeEmailMutation.mutate({ email, password });
  };

  // валидация email
  const [emailError, setEmailError] = useState<string | null>(null);
  emailError
  const validateEmail = (checkEmpty = false) => {
    if (!email.length) {
      if (checkEmpty) setEmailError('Это поле обязательно для заполнения');
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

  const [passError, setPassError] = useState<string | null>(null);

  const validatePassword = (checkEmpty = false) => {
    if (!password.length) {
      if (checkEmpty) setPassError('Это поле обязательно для заполнения');
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
    <Modal isOpen={isOpen} onClose={onClose} title="Смена Email">
      <Grid cols={1}>
        <Input
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passError || undefined}
          isError={passError !== null}
        />
      </Grid>

      <div style={{ marginTop: 'var(--space-md)' }}>
        <Grid cols={2} colsMd={1}>
          <Button
            color="danger"
            isOutline
            onClick={changeEmailHandler}
            disabled={changeEmailMutation.isPending}
          >
            {changeEmailMutation.isPending ? (
              <Icon name="loader" spin />
            ) : (
              'Сменить email'
            )}
          </Button>
          {/*<Button color="default" isOutline onClick={onClose}>*/}
          {/*  Отмена*/}
          {/*</Button>*/}
        </Grid>
      </div>
    </Modal>
  );
};