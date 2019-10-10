import React from "react";

import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
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
        <Typography key={section.id} variant="body2" paragraph>
          {section.value.map((s, index) => {
            if (s.length === 1) {
              return s[0];
            } else {
              console.log(section.value);
              switch (s[1][0][0]) {
                case "c":
                  return <code key={section.id + index}>{s[0]}</code>;
                case "a":
                  return (
                    <Link
                      key={section.id + index}
                      href={s[1][0][1]}
                      target="_blank"
                    >
                      {s[0]}
                    </Link>
                  );
                default:
                  return s[0];
              }
            }
          })}
        </Typography>
      );
    case "image":
      return (
        <CardMedia
          key={section.id}
          component="img"
          image={section.value}
          onClick={() => window.open(section.value)}
        />
      );
    default:
      break;
  }
};

const PostSections = (props: Props) => (
  <Box>{props.sections.map(renderSection)}</Box>
);

export default PostSections;
