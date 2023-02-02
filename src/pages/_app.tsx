import React, { ReactNode } from "react";
import "@/styles/index.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from '@/components/Layout'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
