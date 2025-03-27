import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

const Register = () => {
  const navigate = useNavigate(); // ページ遷移用の関数

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setConfirmErrText] = useState("");

  const [loading, setLoading] = useState(false);

  // バリデーションチェックのための正規表現
  const usernameRegex = /^[a-zA-Z0-9_]{8,20}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // リアルタイムバリデーション
    switch (name) {
      case "username":
        if (value === "") {
          setUsernameErrText("名前を入力してください");
        } else if (!usernameRegex.test(value)) {
          setUsernameErrText(
            "ユーザ名は英数字またはアンダースコアを用い，8文字以上20文字以下にしてください"
          );
        } else {
          setUsernameErrText("");
        }
        break;

      case "password":
        if (value === "") {
          setPasswordErrText("パスワードを入力してください");
        } else if (!passwordRegex.test(value)) {
          setPasswordErrText(
            "パスワードは英字と数字をそれぞれ1文字以上含み，8文字以上の半角英数記号（@$!%*?&）で入力してください"
          );
        } else {
          setPasswordErrText("");
        }

        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setConfirmErrText("パスワードと確認用パスワードが一致しません");
        } else {
          setConfirmErrText("");
        }
        break;

      case "confirmPassword":
        if (value === "") {
          setConfirmErrText("確認用パスワードを入力してください");
        } else if (value !== formData.password) {
          setConfirmErrText("パスワードと確認用パスワードが一致しません");
        } else {
          setConfirmErrText("");
        }
        break;

      default:
        break;
    }
  };

  const handleSubmitWithHooks = async (e) => {
    e.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");
    setConfirmErrText("");

    const username = formData.username.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    // バリデーション
    let error = false;

    if (!username) {
      setUsernameErrText("名前を入力してください");
      error = true;
    } else if (!usernameRegex.test(username)) {
      setUsernameErrText(
        "ユーザ名は英数字アンダースコアのみを用い，8文字以上20文字以下にしてください"
      );
      error = true;
    }

    if (!password) {
      setPasswordErrText("パスワードを入力してください");
      error = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordErrText(
        "パスワードは英字と数字をそれぞれ1文字以上含み，8文字以上の半角英数記号（@$!%*?&）で入力してください"
      );
      error = true;
    }

    if (!confirmPassword) {
      setConfirmErrText("確認用パスワードを入力してください");
      error = true;
    } else if (password !== confirmPassword) {
      setConfirmErrText("パスワードと確認用パスワードが一致しません");
      error = true;
    }

    if (error) return;

    setLoading(true);

    // 新規登録APIを叩く
    try {
      const res = await authApi.register({
        username,
        password,
        confirmPassword,
      });

      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました");
      navigate("/"); // ルートディレクトリに遷移
    } catch (error) {
      const errors = error?.data?.errors || [];
      console.log(errors);
      errors.forEach((err) => {
        if (err.path === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.path === "password") {
          setPasswordErrText(err.msg);
        }
        if (err.path === "confirmPassword") {
          setConfirmErrText(err.msg);
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmitWithHooks} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required // 入力がないとエラーにする
          value={formData.username}
          onChange={handleChange}
          helperText={usernameErrText}
          error={usernameErrText !== ""}
          disabled={loading}
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
          helperText={passwordErrText}
          error={passwordErrText !== ""}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="確認用パスワード"
          margin="normal"
          name="confirmPassword"
          type="password"
          required // 入力がないとエラーにする
          value={formData.confirmPassword}
          onChange={handleChange}
          helperText={confirmErrText}
          error={confirmErrText !== ""}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
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
