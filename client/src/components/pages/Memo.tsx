import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../../redux/features/memoSlice";
import EmojiPicker from "../common/EmojiPicker";
import { RootState } from "../../redux/store";
import { Memo as MemoType } from "../../types/memo";

const Memo: React.FC = () => {
  const { memoId } = useParams<{ memoId: string }>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const dispatch = useDispatch();
  const memos = useSelector((state: RootState) => state.memo.value);
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async (): Promise<void> => {
      try {
        if (!memoId) return;
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

  let timer: ReturnType<typeof setTimeout>;
  const timeout = 500;

  const updateTitle = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    clearTimeout(timer);
    // ページタイトルを更新(useState)
    const newTitle = e.target.value;
    setTitle(newTitle);
    // console.log(newTitle);
    // サイドバーも更新(Redux)
    if (!memoId) return;
    const updatedMemos = memos.map((memo) =>
      memo._id === memoId ? { ...memo, title: newTitle } : memo
    );
    dispatch(setMemo(updatedMemos));
    // DBの内容も更新(API)
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout); // timeoutミリ秒ごとに発火する
  };

  const updateDescription = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    clearTimeout(timer);
    // ページ内容を更新(useState)
    const newDescription = e.target.value;
    setDescription(newDescription);
    // DBの内容も更新(API)
    if (!memoId) return;
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout); // timeoutミリ秒ごとに発火する
  };

  const deleteMemo = async (): Promise<void> => {
    try {
      if (!memoId) return;
      // DBの内容を更新(API)
      const deletedMemo = await memoApi.delete(memoId);
      // console.log(deletedMemo); // 削除したメモの情報を表示

      // サイドバーの更新
      const newMemos = memos.filter((e) => e._id !== memoId);
      dispatch(setMemo(newMemos));
      // リダイレクト
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0]._id}`);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onIconChange = async (newIcon: string): Promise<void> => {
    // ページアイコンを更新(useState)
    setIcon(newIcon);
    // サイドバーも更新(Redux)
    if (!memoId) return;
    const updatedMemos = memos.map((memo) =>
      memo._id === memoId ? { ...memo, icon: newIcon } : memo
    );
    dispatch(setMemo(updatedMemos));
    // DBの内容も更新(API)
    try {
      await memoApi.update(memoId, { icon: newIcon });
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
        <IconButton color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} setIcon={setIcon} onChange={onIconChange} />
          <TextField
            onChange={updateTitle}
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
            onChange={updateDescription}
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
