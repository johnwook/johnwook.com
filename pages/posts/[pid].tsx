import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { getData, PostData } from "../../data/post";

type Props = PostData;

const Post: NextPage<Props> = ({ title, body }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>

    <div>
      <h1>{title}</h1>
      {body.map(b => (
        <p key={b.id}>{b.value}</p>
      ))}
    </div>
  </div>
);

Post.getInitialProps = async ({ query }) => {
  const pidRaw = query.pid;

  // TODO: make pidRaw to uuid type of id

  const pageId = "6a400436-ae73-464e-acbc-070fdf8d990f";
  const data = await getData({ pageId });

  return { ...data };
};

export default Post;
