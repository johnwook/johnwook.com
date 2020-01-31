import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

import Layout from "../../components/layout";
import { getBaseUrl } from "../../urlHelper";

type Props = {
  books: Array<{
    id: string;
    title: string;
    author: string;
    start: string;
    end: string;
    note: string;
  }>;
  year: string;
};

const BooksOfYear: NextPage<Props> = ({ books, year }) => {
  return (
    <Layout>
      <Head>
        <title>Books that I read in {year}::johnwook.com</title>
        <meta
          property="og:url"
          content={"https://johnwook.com/books/" + year}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={"Books that I read in " + year + "::johnwook.com"}
        />
        <meta
          property="og:description"
          content="What you read is what you are"
        />
      </Head>

      {books.map(row => (
        <Box mt={1} key={row.id}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6">
                  {row.title + " :: " + row.author}
                </Typography>
              }
              subheader={
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="p"
                >
                  {row.start + " ~ " + row.end}
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="body2" component="p">
                {row.note}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Layout>
  );
};

BooksOfYear.getInitialProps = async ({ query, req }) => {
  const { yid } = query;
  const year = Array.isArray(yid) ? yid[0] : yid;

  const url = getBaseUrl(req) + "/api/books/" + year;

  const res = await fetch(url);

  if (res.ok) {
    const books = await res.json();

    return { books, year };
  } else {
    throw new Error("Oops");
  }
};

export default BooksOfYear;
