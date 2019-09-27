import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Layout from "../../components/layout";
import { PostData } from "../../data/post";
import { getBaseUrl } from "../../urlHelper";

type Props = PostData;

const Post: NextPage<Props> = ({ title, sections }) => (
  <Layout>
    <Head>
      <title>{title}::johnwook.com</title>
    </Head>

    <Box mt={3}>
      <Typography variant="h5">{title}</Typography>
      {sections.map(b => (
        <p key={b.id}>{b.value}</p>
      ))}
    </Box>
  </Layout>
);

Post.getInitialProps = async ({ query, req }) => {
  const { pid } = query;
  const pageId = Array.isArray(pid) ? pid[0] : pid;

  const url = getBaseUrl(req) + "/api/posts/" + pageId;

  const res = await fetch(url);

  if (res.ok) {
    return { ...(await res.json()) };
  } else {
    throw new Error("Oops");
  }
};

export default Post;
