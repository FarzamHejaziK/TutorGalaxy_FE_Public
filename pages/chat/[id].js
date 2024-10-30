import * as React from "react";
import Chat from "../../src/components/chat";
import CheckAuth from "../../src/reusable/CheckAuth";
import Head from 'next/head';
import { useTranslation } from 'react-i18next';


export default function Index() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t("chat.Header")}</title>
      </Head>
      <Chat />
    </>
  );
}
