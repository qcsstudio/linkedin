// "use client"
// import Head from 'next/head';
// import { useEffect, useState } from 'react';
import HomeContainer from "@/containers/HomeContainer/HomeContainer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://elevatrx.app/"
          key="canonical"
        />
      </Head>
      <HomeContainer />
    </>
  );
}
