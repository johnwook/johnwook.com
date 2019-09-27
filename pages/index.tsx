import React from "react";

import Link from "next/link";
import { NextPage } from "next";

import fetch from "cross-fetch";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Layout from "../components/layout";
import { HomeData } from "../data/home";
import { getBaseUrl } from "../urlHelper";

type Props = HomeData;

const Home: NextPage<Props> = ({ posts, sections }) => (
  <Layout>
    <Card>
      <CardMedia component="img" image={sections[0].value} />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        ></Typography>
      </CardContent>
    </Card>

    <div>
      {posts.map(p => (
        <Link key={p.id} href={"/posts/[pid]"} as={`/posts/${p.id}`}>
          <a>{p.title}</a>
        </Link>
      ))}
    </div>
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
