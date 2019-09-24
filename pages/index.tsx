import React from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

import { getData, HomeData } from "../data/home";

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

Home.getInitialProps = async () => {
  const data = await getData();

  return { ...data };
};

export default Home;
