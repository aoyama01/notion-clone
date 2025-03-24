import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Box component="form">
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required // 入力がないと自動でエラーを吐いてくれる
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required // 入力がないと自動でエラーを吐いてくれる
        />
        <TextField
          fullWidth
          id="comfirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="comfirmPassword"
          type="password"
          required // 入力がないと自動でエラーを吐いてくれる
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={false}
          color="primary"
          variant="outlined"
        >
          アカウント作成
        </LoadingButton>
      </Box>
      <Button component={Link} to="/login">
        すでにアカウントを持っていますか？ログイン
      </Button>
    </>
  );
};

export default Register;
