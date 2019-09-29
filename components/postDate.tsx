import React from "react";

import Box from "@material-ui/core/Box";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import format from "date-fns/format";

interface Props {
  title: string;
  timestamp: number;
}

const PostDate = (props: Props) => {
  return (
    <NoSsr>
      <Box>
        <Typography variant="caption" color="textSecondary">
          {props.title + ": " + format(new Date(props.timestamp), "PPp")}
        </Typography>
      </Box>
    </NoSsr>
  );
};

export default PostDate;
