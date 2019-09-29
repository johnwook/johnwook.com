import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import Layout from "../../components/layout";
import PostDate from "../../components/postDate";
import { PostData } from "../../data/post";
import { getBaseUrl } from "../../urlHelper";

type Props = PostData;

const Post: NextPage<Props> = ({
  createdTime,
  lastEditedTime,
  title,
  sections
}) => (
  <Layout>
    <Head>
      <title>{title}::johnwook.com</title>
    </Head>

    <Box mt={3}>
      <Typography variant="h5">{title}</Typography>
      {sections.map(b => (
        <Box key={b.id} my={2}>
          <Typography variant="body2">{b.value}</Typography>
        </Box>
      ))}
      <PostDate timestamp={createdTime} title="Created" />
      <PostDate timestamp={lastEditedTime} title="Last edited" />
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
