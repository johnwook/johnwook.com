import React from "react";

import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";

interface Props {
  timestamp: number;
}

const PostListDate = (props: Props) => {
  return (
    <NoSsr>
      <Typography variant="caption" color="textSecondary">
        {format(new Date(props.timestamp), "yy/MM/dd")}
      </Typography>
    </NoSsr>
  );
};

export default PostListDate;
