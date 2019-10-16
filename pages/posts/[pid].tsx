import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";

import format from "date-fns/format";

import Layout from "../../components/layout";
import PostSections from "../../components/postSections";
import PostTags from "../../components/postTags";
import { PostData } from "../../data/post";
import { getBaseUrl } from "../../urlHelper";

type Props = PostData;

const renderDate = (timestamp: number, title: string) => (
  <NoSsr>
    <Typography
      component="p"
      variant="caption"
      color="textSecondary"
      align="right"
    >
      {title + ": " + format(new Date(timestamp), "PPp")}
    </Typography>
  </NoSsr>
);

const Post: NextPage<Props> = ({
  createdTime,
  id,
  lastEditedTime,
  tags,
  title,
  sections
}) => {
  return (
    <Layout>
      <Head>
        <title>{title}::johnwook.com</title>
        <meta property="og:url" content={"https://johnwook.com/posts/" + id} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title + "::johnwook.com"} />
        <meta property="og:description" content={sections[0].value as string} />
      </Head>

      <Box my={3}>
        <Typography variant="h5">{title}</Typography>
      </Box>

      <Box>
        <PostSections sections={sections} />
      </Box>

      <PostTags tags={tags} />

      <Box my={2}>
        {renderDate(createdTime, "Created")}
        {renderDate(lastEditedTime, "Last edited")}
      </Box>
    </Layout>
  );
};

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
