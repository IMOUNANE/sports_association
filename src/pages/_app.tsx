import type { AppProps } from "next/app";
import React from "react";
import RootLayout from "@/components/Layout";
import { useRouter } from "next/router";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === "/" || router.pathname === "/register";

  return (
    <>
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      )}
    </>
  );
}
