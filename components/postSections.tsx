import React from "react";

import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { PostData } from "../data/post";

interface Props {
  sections: PostData["sections"];
}

const renderSection = (section: Props["sections"][0]) => {
  switch (section.type) {
    case "header":
      return (
        <Typography key={section.id} variant="h6">
          {section.value}
        </Typography>
      );
    case "text":
      return (
        <Box key={section.id} my={1}>
          <Typography variant="body2">{section.value}</Typography>
        </Box>
      );
    case "image":
      return <CardMedia component="img" image={section.value} />;
    default:
      break;
  }
};

const PostSections = (props: Props) => (
  <Box>{props.sections.map(renderSection)}</Box>
);

export default PostSections;
