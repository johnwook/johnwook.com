import React from "react";

import Typography from "@material-ui/core/Typography";

import PostListDate from "./postListDate";

interface Props {
  createdTime: number;
  title: string;
}

const PostListItemTitle = ({ createdTime, title }: Props) => {
  return (
    <div>
      <PostListDate timestamp={createdTime} />
      <Typography component="span" variant="subtitle1">
        {" " + title}
      </Typography>
    </div>
  );
};

export default PostListItemTitle;
