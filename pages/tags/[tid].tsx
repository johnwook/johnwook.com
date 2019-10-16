import React from "react";

import Head from "next/head";
import { NextPage } from "next";

import fetch from "cross-fetch";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { getBaseUrl } from "../../urlHelper";

const Tag = () => <Box>hi</Box>;

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
