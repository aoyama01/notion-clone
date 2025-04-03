import { Box, Button, TextField } from "@mui/material";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";

interface FormData {
  username: string;
  password: string;
}

interface ErrorResponse {
  data?: {
    errors?: Array<{
      param: string;
      msg: string;
    }>;
  };
}

const Login: React.FC = () => {
  const navigate = useNavigate(); // ページ遷移用の関数

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [usernameErrText, setUsernameErrText] = useState<string>("");
  const [passwordErrText, setPasswordErrText] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  // バリデーションチェックのための正規表現
  const usernameRegex = /^[a-zA-Z0-9_]{8,20}$/;
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  const passwordRegex = /^[A-Za-z\d]{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
            "パスワードは半角英数字を用い，8文字以上にしてください．"
          );
        } else {
          setPasswordErrText("");
        }
        break;

      default:
        break;
    }
  };

  const handleSubmitWithHooks = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");

    const username = formData.username.trim();
    const password = formData.password.trim();

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
        "パスワードは半角英数字を用い，8文字以上にしてください．"
      );
      error = true;
    }

    if (error) return;

    setLoading(true);

    // 新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });

      localStorage.setItem("token", res.token);
      console.log("ログインに成功しました");
      navigate("/"); // ルートディレクトリに遷移
    } catch (error) {
      const errors = (error as ErrorResponse)?.data?.errors || [];
      console.log(errors);
      errors.forEach((err) => {
        if (err.param === "username") {
          setUsernameErrText(err.msg);
        }
        if (err.param === "password") {
          setPasswordErrText(err.msg);
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
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="outlined"
        >
          ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">
        アカウントを持っていませんか？新規登録
      </Button>
    </>
  );
};

export default Login;
