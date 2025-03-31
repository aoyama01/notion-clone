import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]); // props.iconが変更されるたびにコールバックが発火

  return (
    <Box>
      <Typography variant="h4" fontWeight="700" sx={{ cursor: "pointer" }}>
        {props.icon}
      </Typography>
    </Box>
  );
};

export default EmojiPicker;
