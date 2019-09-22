import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import { extractPid, getData, PostData } from "../../data/post";

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
  const { slug } = query;

  const pageId = extractPid(slug as string);
  const data = await getData({ pageId });

  return { ...data };
};

export default Post;
