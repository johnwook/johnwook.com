import React from "react";
import Head from "next/head";
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
        <img key={b.id} src={b.value} />
      ))}
    </div>

    <div>
      {posts.map(p => (
        <a key={p.id} href={"/posts/" + p.id}>
          {p.title}
        </a>
      ))}
    </div>
  </div>
);

Home.getInitialProps = async () => {
  const data = await getData();

  return { ...data };
};

export default Home;
