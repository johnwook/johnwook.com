import React from "react";

import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import format from "date-fns/format";

import Layout from "../../components/layout";
import PostSections from "../../components/postSections";
import { PostData } from "../../data/post";
import { getBaseUrl } from "../../urlHelper";

type Props = PostData;

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.3)
  }
}));

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
  title,
  sections
}) => {
  const classes = useStyles({});

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

      <Box>
        <Link href="/">
          <Chip
            clickable
            color="primary"
            component="a"
            label="#book review"
            size="small"
            variant="outlined"
            className={classes.chip}
          />
        </Link>
        <Link href="/">
          <Chip
            clickable
            color="primary"
            component="a"
            label="#essay"
            size="small"
            variant="outlined"
            className={classes.chip}
          />
        </Link>
      </Box>

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
