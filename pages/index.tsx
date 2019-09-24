import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import fetch from "cross-fetch";

import { HomeData } from "../data/home";

type Props = HomeData;

const Home: NextPage<Props> = ({ posts, sections }) => (
  <div>
    <Head>
      <title>johnwook.com</title>
    </Head>

    <div>
      {sections.map(b => (
        <div key={b.id}>
          <img src={b.value} />
        </div>
      ))}
    </div>

    <div>
      {posts.map(p => (
        <Link key={p.id} href={"/posts/[pid]"} as={`/posts/${p.id}`}>
          <a>{p.title}</a>
        </Link>
      ))}
    </div>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  let baseUrl = "";

  if (req) {
    const {
      headers: { host }
    } = req;

    if (host.indexOf("localhost") > -1) {
      baseUrl = "http://" + host;
    } else {
      baseUrl = "https://" + host;
    }
  } else {
    baseUrl =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port;
  }

  const url = baseUrl + "/api/home";

  const res = await fetch(url);

  if (res.ok) {
    return { ...(await res.json()) };
  } else {
    throw new Error("Oops");
  }
};

export default Home;
