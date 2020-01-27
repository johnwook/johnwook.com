import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Layout from "../../components/layout";

type Props = any;

const rows = [
  {
    id: "1",
    title: "결국 이기는 사마의",
    author: "친타오",
    start: "2020-01-22",
    end: "",
    note: "수영이가 선물해 줌. Followership"
  },
  {
    id: "2",
    title: "나의 한국 현대사",
    author: "유시민",
    start: "2019-12-18",
    end: "2020-01-21",
    note: "다이나믹 코리아. 사정을 헤아리려 노력할 것"
  }
];

const BooksOfYear: NextPage<Props> = ({ year }) => {
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

      <Box mt={1}>
        <Card>
          <CardHeader title={"Books in " + year} />
        </Card>
      </Box>
      {rows.map(row => (
        <Box mt={1}>
          <Card>
            <CardHeader
              title={row.title + " :: " + row.author}
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

BooksOfYear.getInitialProps = async ({ query }) => {
  const { yid } = query;
  const year = Array.isArray(yid) ? yid[0] : yid;

  return { year };
};

export default BooksOfYear;
