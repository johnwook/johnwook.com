import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PostListDate from "./postListDate";

interface Props {
  createdTime: number;
  title: string;
}

const PostListItemTitle = ({ createdTime, title }: Props) => {
  return (
    <Grid container wrap="nowrap">
      <Grid item xs={10} zeroMinWidth>
        <Typography variant="subtitle1" noWrap>
          {" " + title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <PostListDate timestamp={createdTime} />
      </Grid>
    </Grid>
  );
};

export default PostListItemTitle;
