import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../../redux/features/memoSlice";
import EmojiPicker from "../common/EmojiPicker";

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();
  const memos = useSelector((state) => state.memo.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        // console.log(res.description);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (error) {
        alert(error);
      }
    };
    getMemo();
  }, [memoId]); // memoIdが変更されるたびにコールバックが発火

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    console.log(newTitle);
    // サイドバーを更新
    // memosのidが一致するやつを探して，そのタイトルを変更
    // memos[memoIndex].title = newTitle; // イミュータブルだからこれはだめ
    const updatedMemos = memos.map((memo) =>
      memo._id === memoId ? { ...memo, title: newTitle } : memo
    );
    dispatch(setMemo(updatedMemos));

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout); // timeoutミリ秒ごとに発火する
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout); // timeoutミリ秒ごとに発火する
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo); // 削除したメモの情報を表示

      const newMemos = memos.filter((e) => e._id !== memoId);
      // リダイレクト
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
      // サイドバーの更新
      dispatch(setMemo(newMemos));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "10px 0 0 20px", // 上，右，下，左の順
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton variant="outlinerd" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} />
          <TextField
            onChange={(e) => {
              updateTitle(e);
            }}
            value={title}
            placeholder="無題"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
            }}
          />
          <TextField
            onChange={(e) => {
              updateDescription(e);
            }}
            value={description}
            placeholder="追加"
            variant="outlined"
            fullWidth
            sx={{
              ".MuiOutlinedInput-input": { padding: 0 },
              ".MuiOutlinedInput-notchedOutline": { border: "none" },
              ".MuiOutlinedInput-root": { fontSize: "1.2rem" },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Memo;
