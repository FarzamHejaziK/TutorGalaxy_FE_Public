import * as React from "react";
import Dashboard from "../src/components/dashboard";
import CheckAuth from "../src/reusable/CheckAuth";
import { useTranslation } from 'react-i18next';
import Head from 'next/head';


export default function Index() {
  const { t } = useTranslation();

  return (
    <CheckAuth>
      <Head>
        <title>{t('home.history')}</title> {/* Replace 'dashboardTitle' with your actual translation key */}
      </Head>
      <Dashboard />
    </CheckAuth>
  );
}
