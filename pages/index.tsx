import React from "react";

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
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import Layout from "../components/layout";
import { HomeData } from "../data/home";
import { getBaseUrl } from "../urlHelper";

type Props = HomeData;

const Home: NextPage<Props> = ({ posts, sections }) => (
  <Layout>
    <Box mt={1}>
      <Card>
        <CardMedia component="img" image={sections[0].value} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {sections[1].value}
          </Typography>
        </CardContent>
      </Card>
    </Box>

    <Box mt={1}>
      <Paper>
        <List aria-label="posts">
          {posts.map(post => (
            <ListItem button key={post.id}>
              <ListItemText primary={post.title} />
            </ListItem>
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
