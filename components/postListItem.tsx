import React from "react";

import Grid from "@material-ui/core/Grid";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";

import format from "date-fns/format";

interface Props {
  createdTime: number;
  title: string;
}

const PostListItem = ({ createdTime, title }: Props) => {
  return (
    <Grid container wrap="nowrap">
      <Grid item xs={10} zeroMinWidth>
        <Typography variant="subtitle1" noWrap>
          {" " + title}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <NoSsr>
          <Typography variant="caption" color="textSecondary">
            {format(new Date(createdTime), "yy/MM/dd")}
          </Typography>
        </NoSsr>
      </Grid>
    </Grid>
  );
};

export default PostListItem;
