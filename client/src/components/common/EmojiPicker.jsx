import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const EmojiPicker = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [isDisp, setIsDisp] = useState(false); // Pickerの表示状態を管理

  useEffect(() => {
    setSelectedEmoji(props.icon);
  }, [props.icon]); // props.iconが変更されるたびにコールバックが発火

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={() => setIsDisp(!isDisp)}
      >
        {props.icon}
      </Typography>
      <Box sx={{ display: isDisp ? "flex" : "none", position: "absolute" }}>
        <Picker
          data={data}
          onEmojiSelect={(emoji) => {
            props.onChange(emoji.native);
          }}
        />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
