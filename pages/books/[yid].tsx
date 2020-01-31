import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
    note:
      "수영이가 선물해줬다. 사마의는 배울 점이 많지만, 배우고 싶지 않기도 한 묘한 인물이다. 가슴을 뜨겁게, 머리를 차갑게 만드는 책이다."
  },
  {
    id: "2",
    title: "나의 한국 현대사",
    author: "유시민",
    start: "2019-12-18",
    end: "2020-01-21",
    note:
      "불과 몇십년 전 이야기들을, 심지어 내가 태어난 이후의 일들 중에서도 모르는 것이 너무 많았다. 많은 이들에게 빚진 삶이다."
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

      {rows.map(row => (
        <Box mt={1}>
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

BooksOfYear.getInitialProps = async ({ query }) => {
  const { yid } = query;
  const year = Array.isArray(yid) ? yid[0] : yid;

  return { year };
};

export default BooksOfYear;
