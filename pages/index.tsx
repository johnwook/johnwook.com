import React from "react";

import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";

import fetch from "cross-fetch";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

import Layout from "../components/layout";
import PostListItem from "../components/postListItem";
import { HomeData } from "../data/home";
import { getBaseUrl } from "../urlHelper";

type Props = HomeData;

const Home: NextPage<Props> = ({ cardImage, cardText, posts }) => (
  <Layout>
    <Head>
      <meta property="og:url" content="https://johnwook.com" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="johnwook.com" />
      <meta property="og:description" content="blog of johnwook" />
    </Head>
    <Box mt={1}>
      <Card>
        <CardMedia component="img" image={cardImage.value} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {cardText.value}
          </Typography>
        </CardContent>
      </Card>
    </Box>

    <Box mt={1}>
      <Paper>
        <List aria-label="posts">
          {posts.map(post => (
            <Link key={post.id} href={"/posts/[pid]"} as={`/posts/${post.id}`}>
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

Home.getInitialProps = async ({ req }) => {
  const url = getBaseUrl(req) + "/api/home";

  const res = await fetch(url);

  if (res.ok) {
    return { ...(await res.json()) };
  } else {
    throw new Error("Oops");
  }
};

export default Home;
