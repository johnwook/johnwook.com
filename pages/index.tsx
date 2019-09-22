import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { getData, HomeData } from "../data/home";

type Props = HomeData;

const Home: NextPage<Props> = ({ body }) => (
  <div>
    <Head>
      <title>johnwook.com</title>
    </Head>

    <div>
      {body.map(b => (
        <img src={b.value} />
      ))}
    </div>

    <div>
      <a href="/posts/The-goal-6a400436ae73464eacbc070fdf8d990f">
        The goal, 치아 교정
      </a>
    </div>

    <img src="/api/image?url=https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4fab55f6-ea1c-48e7-b0de-46957d18c9d5%2Fdaniel2.jpg" />
  </div>
);

Home.getInitialProps = async () => {
  const data = await getData();

  return { ...data };
};

export default Home;
