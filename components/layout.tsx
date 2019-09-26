import Container from "@material-ui/core/Container";
import Head from "next/head";

const Layout = ({ children }) => (
  <Container maxWidth="sm">
    <Head>
      <title>johnwook.com</title>
    </Head>
    {children}
  </Container>
);

export default Layout;
