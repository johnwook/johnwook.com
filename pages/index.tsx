import React from "react";
import Head from "next/head";
import Link from "next/link";

const Home = () => (
  <div>
    <Head>
      <title>johnwook.com</title>
    </Head>

    <div>
      <Link
        href="/post/[pid]"
        as="/post/The-goal-6a400436ae73464eacbc070fdf8d990f"
      >
        <a>The goal, 치아 교정</a>
      </Link>
    </div>
  </div>
);

Home.getInitialProps = async ({ res }) => {
  if (res) {
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate");
  }
  return {};
};

export default Home;
