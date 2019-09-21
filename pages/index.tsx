import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { getData, PostData } from "../data/post";

type Props = PostData;

const Home: NextPage<Props> = ({ title, body }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>

    <div>
      {body.map(b => (
        <p key={b.id}>{b.value}</p>
      ))}
    </div>
  </div>
);

Home.getInitialProps = async ({ res }) => {
  if (res) {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  }

  const pageId = "6a400436-ae73-464e-acbc-070fdf8d990f";

  const data = await getData({ pageId });

  return { ...data };
};

export default Home;
