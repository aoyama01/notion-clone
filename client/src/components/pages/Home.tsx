import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import memoApi from "../../api/memoApi";
import { useNavigate } from "react-router-dom";
import { setMemo } from "../../redux/features/memoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const memos = useSelector((state: RootState) => state.memo.value); // memoはReduxに保存されたメモの情報
  const [loading, setLoading] = useState<boolean>(false);

  const createMemo = async (): Promise<void> => {
    // APIを叩いていく
    try {
      setLoading(true);
      const res = await memoApi.create(); // memoApiはaxiosで作成したAPI
      // サイドバーを更新
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      console.log(res); // 作成したメモの情報を表示
      navigate(`/memo/${res._id}`); // 作成したメモの詳細ページに遷移
    } catch (error: any) {
      console.error("メモ作成エラー:", error);
      alert(error.response?.data?.message || "メモの作成に失敗しました");
    } finally {
      setLoading(false); // ローディングを解除
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
    </Box>
  );
};

export default Home;
