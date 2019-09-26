import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";

const Layout = ({ children }) => (
  <Box>
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="h6">Johnwook.com</Typography>
      </Toolbar>
    </AppBar>
    <Container maxWidth="sm">
      <Head>
        <title>johnwook.com</title>
      </Head>
      {children}
    </Container>
  </Box>
);

export default Layout;
