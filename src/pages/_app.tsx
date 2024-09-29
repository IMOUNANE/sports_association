import type { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import RootLayout from "@/components/Layout";
import "../styles/globals.css";
import { getCookie } from 'cookies-next';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuth= getCookie('token');
	const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {		
		if(!isAuth) router.push("/")
		setIsLoading(false);
	},[isAuth])

	if (isLoading) {
		return <div>Loading...</div>;
	}

  return (
    <>
      {!isAuth ? (
        <Component {...pageProps} />
      ) : (
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      )}
    </>
  );
}
