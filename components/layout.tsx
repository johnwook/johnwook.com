import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Head from "next/head";
import Link from "next/link";

import ReactGA from "react-ga";

class Layout extends React.Component {
  componentDidMount() {
    ReactGA.initialize("UA-149152905-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Box>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Link href="/">
              <Typography variant="h6">Johnwook.com</Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Head>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <title>johnwook.com</title>
          </Head>
          {this.props.children}
        </Container>
      </Box>
    );
  }
}

export default Layout;
