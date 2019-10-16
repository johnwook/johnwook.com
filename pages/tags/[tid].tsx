import React from "react";

import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

import Layout from "../../components/layout";
import PostListItem from "../../components/postListItem";
import { TagData } from "../../data/tag";
import { getBaseUrl } from "../../urlHelper";

type Props = TagData;

const Tag: NextPage<Props> = ({ tid, posts }) => (
  <Layout>
    <Head>
      <title>Posts with {tid}::johnwook.com</title>
      <meta property="og:url" content={"https://johnwook.com/tags/" + tid} />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content={"Posts with " + { tid } + "::johnwook.com"}
      />
      <meta property="og:description" content={"Posts with " + tid} />
    </Head>

    <Box mt={1}>
      <Paper>
        <List
          subheader={
            <ListSubheader>
              Posts with <Chip color="primary" label={"#" + tid} size="small" />
            </ListSubheader>
          }
          aria-label="posts"
        >
          {posts.map(post => (
            <Link key={post.id} href="/posts/[pid]" as={`/posts/${post.id}`}>
              <ListItem button component="a">
                <ListItemText
                  primary={
                    <PostListItem
                      createdTime={post.createdTime}
                      title={post.title}
                    />
                  }
                />
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </Box>
  </Layout>
);

Tag.getInitialProps = async ({ query, req }) => {
  const { tid } = query;
  const tag = Array.isArray(tid) ? tid[0] : tid;

  const url = getBaseUrl(req) + "/api/tags/" + tag;

  const res = await fetch(url);

  if (res.ok) {
    return { ...(await res.json()) };
  } else {
    throw new Error("Oops");
  }
};

export default Tag;
