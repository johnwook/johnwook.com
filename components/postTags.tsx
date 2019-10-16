import React from "react";

import Link from "next/link";

import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.3)
  }
}));

interface Props {
  tags: string[];
}

const PostTags = (props: Props) => {
  const classes = useStyles({});

  return (
    <Box>
      {props.tags.map(tag => (
        <Link key={tag} href={"/tags/[tid]"} as={`/tags/${tag}`}>
          <Chip
            clickable
            color="primary"
            component="a"
            label={"#" + tag}
            size="small"
            variant="outlined"
            className={classes.chip}
          />
        </Link>
      ))}
    </Box>
  );
};

export default PostTags;
