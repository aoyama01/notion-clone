import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";
import { useState } from "react";
import authApi from "../../api/authApi";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitWithHooks = async (e) => {
    e.preventDefault();

    // バリデーション：パスワード一致確認
    if (formData.password !== formData.confirmPassword) {
      alert("パスワードと確認用パスワードが一致しません");
      return;
    }

    // ここで送信処理(API通信など)を行う
    console.log("送信されたデータ:", formData);

    const username = formData.username.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    try {
      const res = await authApi.register({
        // Postmanのボディ要素に打ち込んでたやつ
        username,
        password,
        confirmPassword,
      });
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();
    console.log(username);
    console.log(password);
    console.log(confirmPassword);
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmitWithHooks}>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required // 入力がないとエラーにする
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required // 入力がないとエラーにする
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required // 入力がないと自動でエラーを吐いてくれる
          value={formData.confirmPassword}
          onChange={handleChange}
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
