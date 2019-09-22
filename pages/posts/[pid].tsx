import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { getData, PostData } from "../../data/post";

type Props = PostData;

const Post: NextPage<Props> = ({ title, sections }) => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>

    <div>
      <h1>{title}</h1>
      {sections.map(b => (
        <p key={b.id}>{b.value}</p>
      ))}
    </div>
  </div>
);

Post.getInitialProps = async ({ query }) => {
  const { pid } = query;

  const pageId = Array.isArray(pid) ? pid[0] : pid;

  const data = await getData({ pageId });

  return { ...data };
};

export default Post;
