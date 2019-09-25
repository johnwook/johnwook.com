import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
import fetch from "cross-fetch";
import Container from "@material-ui/core/Container";
import Image from "material-ui-image";

import { HomeData } from "../data/home";
import { getBaseUrl } from "../urlHelper";

type Props = HomeData;

const Home: NextPage<Props> = ({ posts, sections }) => (
  <Container maxWidth="sm">
    <Head>
      <title>johnwook.com</title>
    </Head>

    <div>
      {sections.map(b => (
        <div key={b.id}>
          <Image src={b.value} />
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
  </Container>
);

Home.getInitialProps = async ({ req }) => {
  const url = getBaseUrl(req) + "/api/home";

  const res = await fetch(url);

  if (res.ok) {
    return { ...(await res.json()) };
  } else {
    throw new Error("Oops");
  }
};

export default Home;
