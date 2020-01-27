import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Layout from "../../components/layout";

type Props = any;

const rows = [
  {
    id: "1",
    title: "결국 이기는 사마의",
    author: "친타오",
    start: "2020-01-22"
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

      <Box my={3}>
        <TableContainer component={Paper}>
          <Table aria-label="books">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Start</TableCell>
                <TableCell align="right">End</TableCell>
                <TableCell align="right">Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.author}</TableCell>
                  <TableCell align="right">{row.start}</TableCell>
                  <TableCell align="right">{row.end}</TableCell>
                  <TableCell align="right">{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default BooksOfYear;
