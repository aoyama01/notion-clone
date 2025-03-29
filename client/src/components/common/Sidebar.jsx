import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import LogoutOutLinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutLinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect, useState } from "react";
import assets from "../../assets";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [active, setActive] = useState(0);

  const user = useSelector((state) => state.user.value);
  // user は以下のようなオブジェクト
  /*  {
        _id: "...",
        username: "...",
        password: "...",
        __v: 0
      } 
   */
  const memos = useSelector((state) => state.memo.value); // memoはReduxに保存されたメモの情報

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll(); // memoApiはaxiosで作成したAPI
        dispatch(setMemo(res)); // 作成したメモの情報をReduxに保存
      } catch (error) {
        alert(error.response?.data?.message || "メモの取得に失敗しました");
      }
    };
    getMemos(); // メモの取得を実行
  }, [dispatch]);

  useEffect(() => {
    const activeIndex = memos.findIndex((e) => e._id === memoId);
    setActive(activeIndex);
  }, [navigate]); // navigateにすることで，メモをクリックするたびに発火する

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{ width: 240, height: "100vh" }}
    >
      <List
        sx={{
          width: 240,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutLinedIcon />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton>
              <AddBoxOutLinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>

        {memos.map((item, index) => (
          <ListItemButton
            sx={{ paddingLeft: "30px" }}
            component={Link}
            to={`/memo/${item._id}`} // メモの固有ID
            key={item._id}
            selected={index === active}
          >
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
