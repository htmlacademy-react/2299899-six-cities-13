import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus,
  CITIES,
  PASSWORD_RULE,
} from '../../const';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { redirectToRoute } from '../../store/action';
import { random } from 'faker';
import { setCurrentCity } from '../../store/app-process/app-process.slice';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const randomCity = random.arrayElement(CITIES);

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    dispatch(redirectToRoute(AppRoute.Main));
  }

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  const handleRandomCityButtonClick = () => {
    dispatch(setCurrentCity(randomCity));
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  data-testid="loginElement"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  pattern={PASSWORD_RULE}
                  title="Password must contain a one digit and a one letter"
                  required
                  data-testid="passwordElement"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="login-submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section
            className="locations locations--login locations--current"
            onClick={handleRandomCityButtonClick}
          >
            <div className="locations__item">
              <span className="locations__item-link">
                <Link to={AppRoute.Main}>{randomCity}</Link>
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
