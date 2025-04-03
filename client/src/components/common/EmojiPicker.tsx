import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  icon: string;
  setIcon: (icon: string) => void;
  onChange: (icon: string) => void;
}

interface EmojiObject {
  native: string;
  [key: string]: any;
}

const EmojiPicker: React.FC<EmojiPickerProps> = (props) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string | undefined>();
  const [isDisp, setIsDisp] = useState<boolean>(false); // Pickerの表示状態を管理

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
          onEmojiSelect={(emoji: EmojiObject) => {
            props.onChange(emoji.native);
          }}
        />
      </Box>
    </Box>
  );
};

export default EmojiPicker;
