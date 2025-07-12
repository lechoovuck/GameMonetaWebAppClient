import { Loader } from '@/shared/ui';
import { Suspense, useLayoutEffect, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppRoute, AuthStatus } from '@/const.ts';

import {
  Orders,
  Profile,
  SignIn,
  SignUp,
  Contacts,
  Home,
  Products,
  Gift,
  Faq,
  PasswordReset,
  PasswordNew,
  EmailNew,
  OrderInvoice,
  Subcategories,
  Gifts,
  NotFoundPage,
  BonusPage,
  OauthCallbackPage,
  TermsPage,
  PrivacyPage,
  TelegramCallback,
  TelegramConnectCallback,
  SteamLinkInstruction
} from '.';
import { RedirectRoute } from '@/pages/redirect-route.tsx';

const TrackPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof (window as any).ym === 'function') {
      (window as any).ym(100155769, 'hit', location.pathname + location.search);
    }
  }, [location]);

  return null;
};
export const Routing: React.FC = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <TrackPageViews />
      <Routes>
        <Route path={AppRoute.Root} element={<Home />} />
        <Route path={AppRoute.Faq} element={<Faq />} />
        <Route path={AppRoute.Bonus} element={<BonusPage />} />
        <Route path={AppRoute.SteamLinkInstruction} element={<SteamLinkInstruction />} />
        <Route path={`${AppRoute.Product}/:id`} element={<Products />} />
        <Route path={`${AppRoute.Categories}/:id${AppRoute.Subcategories}`} element={<Subcategories />} />
        <Route path={AppRoute.Gifts} element={<Gifts />} />
        <Route path={`${AppRoute.Gift}/:id`} element={<Gift />} />

        {/* auth routers */}
        <Route path={AppRoute.SignUp} element={<SignUp />} />
        <Route path={AppRoute.SignIn} element={<SignIn />} />
        <Route path={AppRoute.PasswordReset} element={<PasswordReset />} />
        <Route path={`${AppRoute.PasswordNew}/:token`} element={<PasswordNew />} />
        <Route path={`${AppRoute.EmailNew}/:token`} element={<EmailNew />} />

        <Route path={AppRoute.OauthCallback} element={<OauthCallbackPage />} />

        {/* static pages */}
        <Route path={AppRoute.Contacts} element={<Contacts />} />
        <Route path={AppRoute.Terms} element={<TermsPage />} />
        <Route path={AppRoute.Privacy} element={<PrivacyPage />} />
        <Route path={AppRoute.OauthTelegramCallback} element={<TelegramCallback />} />;
        <Route path={AppRoute.OauthTelegramConnectCallback} element={<TelegramConnectCallback />} />;


        {/* приватные страницы */}
        <Route
          element={
            <RedirectRoute
              checkStatus={AuthStatus.Auth}
              redirectPage={AppRoute.SignIn}
            />
          }
        >

          <Route path={AppRoute.Profile} element={<Profile />} />
          <Route path={AppRoute.Orders} element={<Orders />} />
        </Route>

        <Route path={AppRoute.OrderInvoice} element={<OrderInvoice />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

const LoadingPage: React.FC = () => {
  return (
    <div
      style={{
        height: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader />
    </div>
  );
};
