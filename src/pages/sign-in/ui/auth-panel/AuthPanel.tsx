import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AppRoute } from '@/const';
import { Panel, Button, Input, Icon } from '@/shared/ui';
import styles from './AuthPanel.module.scss';
import { useUserStore } from '@/store/user';
import { useEffect, useState } from 'react';
import {
  fetchAuthSignIn,
  fetchAuthSignUp,
  fetchAuthForgotPassword,
  fetchAuthResetPassword,
  fetchCheckResetToken,
  fetchAuthResetEmail
} from '@/shared/api/fetchers/auth';
import { Oauth } from '../oauth';

const AuthPanel_SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { authorization } = useUserStore();

  const signInMutation = useMutation({
    mutationFn: fetchAuthSignIn,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setEmailError(null)
    setPassError(null)
    setDataError(null)

    evt.preventDefault();
    if (signInMutation.isPending) return;

    const checkEmail = validateEmail(true);
    const checkPass = validatePassword(true);

    if (!checkEmail || !checkPass) {
      return;
    }

    await signInMutation.mutateAsync({ email, password })
      .then(({ token, error }) => {
        if (token) {
          authorization({ token });
          navigate(AppRoute.Profile);
        } else if (error) {
          setDataError(error)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // валидация email
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
  const validatePassword = (checkEmpty = false) => {
    if (!password.length) {
      if (checkEmpty) setPassError('Это поле обязательно для заполенния');
      else setPassError(null);
      return false;
    }
    if (password.length < 6) {
      setPassError('Пароль должен содержать больше 6 символов');
      return false;
    }
    setPassError(null);
    return true;
  };

  useEffect(() => {
    validatePassword();
  }, [password]);

  return (
    <div className={styles.AuthPanel}>
      <form onSubmit={handleSubmit}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Войти</h3>

          <Input
            label="Почта"
            type="email"
            inputProps={{ name: 'email' }}
            placeholder="youremail@mail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError || undefined}
            isError={emailError !== null || dataError !== null}
          />
          <Input
            label="Пароль"
            inputProps={{ name: 'password' }}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passError || undefined}
            isError={passError !== null || dataError !== null}
          />
          {dataError && <div className={styles.AuthPanel__error}>{dataError}</div>}

          <div className={styles.AuthPanel__buttons}>
            <Button
              type="submit"
              color="default"
              disabled={signInMutation.isPending}
            >
              {signInMutation.isPending ? <Icon name="loader" spin /> : 'Войти'}
            </Button>
            {/*<Button color="dark_red">Отмена</Button>*/}
          </div>

          <div className={styles.AuthPanel__notHaveAccount}>
            <span>Нет аккаунта? <Link to={AppRoute.SignUp}>Регистрация</Link></span>
            <Link to={AppRoute.PasswordReset}>Забыли пароль?</Link>
          </div>
        </Panel>
      </form>

      <Oauth />
    </div>
  );
};

const AuthPanel_SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { authorization } = useUserStore();

  const signUpMutation = useMutation({
    mutationFn: fetchAuthSignUp,
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataError, setDataError] = useState<string | null>(null);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setDataError(null)

    if (signUpMutation.isPending) return;

    const checkEmail = validateEmail(true);
    const checkPass = validatePassword(true);
    const checkName = validateName(true);

    if (!checkEmail || !checkPass || !checkName) {
      return;
    }

    await signUpMutation.mutateAsync({
      name,
      email,
      password,
    })
      .then(({ token, error }) => {
        if (token) {
          authorization({ token });
          navigate(AppRoute.Profile);
        } else if (error) {
          setDataError(error)
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  // валидация name
  const [nameError, setNameError] = useState<string | null>(null);

  const validateName = (checkEmpty = false) => {
    if (!name.length) {
      if (checkEmpty) setNameError('Это поле обязательно для заполенния');
      else setNameError(null);
      return false;
    }
    setNameError(null);
    return true;
  };

  useEffect(() => {
    validateName();
  }, [name]);

  return (
    <div className={styles.AuthPanel}>
      <form onSubmit={handleSubmit}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Регистрация</h3>

          <Input
            label="Имя"
            type="text"
            inputProps={{ name: 'name' }}
            placeholder="Александр"
            value={name}
            onChange={e => setName(e.target.value)}
            error={nameError || undefined}
            isError={nameError !== null || dataError !== null}
          />
          <Input
            label="Почта"
            type="email"
            inputProps={{ name: 'email' }}
            placeholder="youremail@mail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError || undefined}
            isError={emailError !== null || dataError !== null}
          />
          <Input
            label="Пароль"
            inputProps={{ name: 'password' }}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passError || undefined}
            isError={passError !== null || dataError !== null}
          />
          {dataError && <div className={styles.AuthPanel__error}>{dataError}</div>}

          <div className={styles.AuthPanel__buttons}>
            <Button
              type="submit"
              color="default"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? (
                <Icon name="loader" spin />
              ) : (
                'Зарегистрироваться'
              )}
            </Button>

            {/*<Button color="dark_red" className={styles.AuthPanel__cancel}>*/}
            {/*  Отмена*/}
            {/*</Button>*/}
          </div>

          <div className={styles.AuthPanel__notHaveAccount}>
            Уже есть аккаунт? <Link to={AppRoute.SignIn}>Войти</Link>
          </div>
        </Panel>
      </form>

      <Oauth />
    </div>
  );
};


const AuthPanel_PasswordReset: React.FC = () => {
  const forgotPasswordMutation = useMutation({
    mutationFn: fetchAuthForgotPassword,
  });

  const [email, setEmail] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    setEmailError(null)
    setResponse(null)

    evt.preventDefault();
    if (forgotPasswordMutation.isPending) return;

    await forgotPasswordMutation.mutateAsync({ email })
      .then(({ message }) => {
        setResponse(message)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // валидация email
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

  return (
    <div className={styles.AuthPanel}>
      <form onSubmit={handleSubmit}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Восстановить пароль</h3>

          <Input
            label="Почта"
            type="email"
            inputProps={{ name: 'email' }}
            placeholder="youremail@mail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError || undefined}
            isError={emailError !== null}
          />

          <div className={styles.AuthPanel__buttons}>
            {response
              ? <p className={styles.AuthPanel__passwordResponse}>{response}</p>
              : <Button
                type="submit"
                color="default"
                disabled={forgotPasswordMutation.isPending}
              >
                {forgotPasswordMutation.isPending ? <Icon name="loader" spin /> : 'Восстановить'}
              </Button>
            }
          </div>


          <div className={styles.AuthPanel__notHaveAccount}>
            <span>Нет аккаунта? <Link to={AppRoute.SignUp}>Регистрация</Link></span>
          </div>
        </Panel>
      </form>
    </div>
  );
};


const AuthPanel_PasswordNew: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation({
    mutationFn: fetchAuthResetPassword,
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [tokenStatus, setTokenStatus] = useState<{ valid: boolean; message?: string } | null>(null);

  const validatePassword = (checkEmpty = false) => {
    let isValid = true;

    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!password.length) {
      if (checkEmpty) {
        setPasswordError('Это поле обязательно для заполнения');
        isValid = false;
      }
    } else if (password.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов');
      isValid = false;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Пароли не совпадают');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setPasswordError(null);
    setConfirmPasswordError(null);
    setResponse(null);

    if (!validatePassword(true) || resetPasswordMutation.isPending) return;

    await resetPasswordMutation.mutateAsync({ token: token!, new_password: password })
      .then((res) => {
        if (res.success) {
          setResponse(res.message || 'Пароль успешно изменен');
        } else {
          setPasswordError(res.message || 'Произошла ошибка');
        }
      })
      .catch((error) => {
        setPasswordError('Произошла ошибка при сбросе пароля');
        console.error(error)
      });
  };

  const handleSignInRedirect = () => {
    navigate(AppRoute.SignIn);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const result = await fetchCheckResetToken(token!);
        setTokenStatus({ valid: result.valid, message: result.message });
      } catch (error) {
        setTokenStatus({ valid: false, message: 'Ошибка при проверке ссылки' });
      }
    };

    if (token) {
      checkToken();
    }
  }, [token]);

  useEffect(() => {
    validatePassword();
  }, [password, confirmPassword]);

  if (tokenStatus === null) {
    return (
      <div className={styles.AuthPanel}>
        <Panel className={styles.AuthPanel__form}>
          <p>Проверка ссылки...</p>
        </Panel>
      </div>
    );
  }

  if (!tokenStatus.valid) {
    return (
      <div className={styles.AuthPanel}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Сброс пароля</h3>
          <p className={styles.AuthPanel__passwordResponseInvalid}>
            {tokenStatus.message || 'Эта ссылка недействительна или уже использована'}
          </p>
          <Button
            color="default"
            className={styles.AuthPanel__buttons}
            onClick={handleSignInRedirect}
          >
            Войти
          </Button>
        </Panel>
      </div>
    );
  }

  return (
    <div className={styles.AuthPanel}>
      <form onSubmit={handleSubmit}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Новый пароль</h3>

          <Input
            label="Новый пароль"
            type="password"
            inputProps={{ name: 'password' }}
            placeholder="Введите новый пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            error={passwordError || undefined}
            isError={passwordError !== null}
            disabled={response !== null}
          />

          <Input
            label="Повторите пароль"
            type="password"
            inputProps={{ name: 'confirmPassword' }}
            placeholder="Повторите новый пароль"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            error={confirmPasswordError || undefined}
            isError={confirmPasswordError !== null}
            disabled={response !== null}
          />

          <div className={styles.AuthPanel__buttons}>
            {response ? (
              <>
                <p className={styles.AuthPanel__passwordResponse}>{response}</p>
                <Button
                  color="default"
                  className={styles.AuthPanel__buttons}
                  onClick={handleSignInRedirect}
                >
                  Войти
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                color="default"
                disabled={resetPasswordMutation.isPending}
              >
                {resetPasswordMutation.isPending ? <Icon name="loader" spin /> : 'Сохранить'}
              </Button>
            )}
          </div>
        </Panel>
      </form>
    </div>
  );
};


const AuthPanel_EmailNew: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const resetEmailMutation = useMutation({
    mutationFn: fetchAuthResetEmail,
  });

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [tokenStatus, setTokenStatus] = useState<{ valid: boolean; message?: string } | null>(null);

  const validateEmail = (checkEmpty = false) => {
    let isValid = true;
    setEmailError(null);

    if (!email.length) {
      if (checkEmpty) {
        setEmailError('Это поле обязательно для заполнения');
        isValid = false;
      }
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Введите действительный адрес электронной почты');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setEmailError(null);
    setResponse(null);

    if (!validateEmail(true) || resetEmailMutation.isPending) return;

    await resetEmailMutation.mutateAsync({ token: token!, new_email: email })
      .then((res) => {
        if (res.success) {
          setResponse(res.message || 'Email успешно изменен');
        } else {
          setEmailError(res.message || 'Произошла ошибка');
        }
      })
      .catch((error) => {
        setEmailError('Произошла ошибка при смене email');
        console.error(error);
      });
  };

  const handleSignInRedirect = () => {
    navigate(AppRoute.SignIn);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const result = await fetchCheckResetToken(token!);
        setTokenStatus({ valid: result.valid, message: result.message });
      } catch (error) {
        setTokenStatus({ valid: false, message: 'Ошибка при проверке ссылки' });
      }
    };

    if (token) {
      checkToken();
    }
  }, [token]);

  useEffect(() => {
    validateEmail();
  }, [email]);

  if (tokenStatus === null) {
    return (
      <div className={styles.AuthPanel}>
        <Panel className={styles.AuthPanel__form}>
          <p>Проверка ссылки...</p>
        </Panel>
      </div>
    );
  }

  if (!tokenStatus.valid) {
    return (
      <div className={styles.AuthPanel}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Смена email</h3>
          <p className={styles.AuthPanel__passwordResponseInvalid}>
            {tokenStatus.message || 'Эта ссылка недействительна или уже использована'}
          </p>
          <Button
            color="default"
            className={styles.AuthPanel__buttons}
            onClick={handleSignInRedirect}
          >
            Войти
          </Button>
        </Panel>
      </div>
    );
  }

  return (
    <div className={styles.AuthPanel}>
      <form onSubmit={handleSubmit}>
        <Panel className={styles.AuthPanel__form}>
          <h3>Новый email</h3>

          <Input
            label="Новый email"
            type="email"
            inputProps={{ name: 'email' }}
            placeholder="Введите новый email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={emailError || undefined}
            isError={emailError !== null}
            disabled={response !== null}
          />

          <div className={styles.AuthPanel__buttons}>
            {response ? (
              <>
                <p className={styles.AuthPanel__passwordResponse}>{response}</p>
                <Button
                  color="default"
                  className={styles.AuthPanel__buttons}
                  onClick={handleSignInRedirect}
                >
                  Войти
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                color="default"
                disabled={resetEmailMutation.isPending}
              >
                {resetEmailMutation.isPending ? <Icon name="loader" spin /> : 'Сохранить'}
              </Button>
            )}
          </div>
        </Panel>
      </form>
    </div>
  );
};

export default AuthPanel_EmailNew;
export const AuthPanel = {
  SignIn: AuthPanel_SignIn,
  SignUp: AuthPanel_SignUp,
  PasswordReset: AuthPanel_PasswordReset,
  PasswordNew: AuthPanel_PasswordNew,
  EmailNew: AuthPanel_EmailNew
};
