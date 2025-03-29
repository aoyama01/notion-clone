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
import React from "react";
import assets from "../../assets";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const user = useSelector((state) => state.user.value);
  // user は以下のようなオブジェクト
  /*  {
        _id: "...",
        username: "...",
        password: "...",
        __v: 0
      } 
   */

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
        <ListItemButton
          sx={{ paddingLeft: "30px" }}
          component={Link}
          to="/memo/4123ih5i43h5" // メモの固有ID
        >
          <Typography>📝仮置きのメモ</Typography>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
