import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import fetch from "cross-fetch";

import { PostData } from "../../data/post";

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

Post.getInitialProps = async ({ query, req }) => {
  const { pid } = query;
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
    baseUrl = window.location.protocol + "//" + window.location.hostname;
  }

  const pageId = Array.isArray(pid) ? pid[0] : pid;

  const url = baseUrl + "/api/posts/" + pageId;

  const res = await fetch(url);

  if (res.ok) {
    return { ...(await res.json()) };
  } else {
    throw new Error("Oops");
  }
};

export default Post;
