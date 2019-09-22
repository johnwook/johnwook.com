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
        <div key={b.id}>
          <img src={b.value} />
        </div>
      ))}
    </div>

    <div>
      {posts.map(p => (
        <div key={p.id}>
          <a href={"/posts/" + p.id}>{p.title}</a>
        </div>
      ))}
    </div>
  </div>
);

Home.getInitialProps = async () => {
  const data = await getData();

  return { ...data };
};

export default Home;
