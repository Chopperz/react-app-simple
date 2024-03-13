import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Space, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@store/store";

import "./Login.css";
import {
  onUserNameChanged,
  onPasswordChanged,
} from "../../store/slices/loginSlice";
import { authService } from "../../services/authService.ts";
import { NetworkStatus } from "@components/shared/enums/networkStatus.tsx";

const Login = () => {
  const userName = useSelector(
    (state: RootState) => state.login.input.username
  );
  const password = useSelector(
    (state: RootState) => state.login.input.password
  );

  const status = useSelector((state: RootState) => state.login.status);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const goToHome = () => navigate("/");

  return (
    <div className="block-screen">
      <div className="content">
        {status == NetworkStatus.loading ? (
          <Spin />
        ) : (
          <LoginForm
            isEnabledLogin={userName != "" && password != ""}
            status={status}
            onUserNameChanged={(userNameText) =>
              dispatch(onUserNameChanged(userNameText))
            }
            onPasswordChanged={(passwordText) =>
              dispatch(onPasswordChanged(passwordText))
            }
            onLogin={() => {
              authService.login({
                username: userName,
                password: password,
                onHomeNavigator: goToHome,
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Login;

interface LoginFormProps {
  isEnabledLogin: boolean;
  status: NetworkStatus;
  onUserNameChanged?: (username: string) => void;
  onPasswordChanged?: (password: string) => void;
  onLogin: () => void;
}

function LoginForm(props: LoginFormProps) {
  return (
    <>
      <p>LOGIN</p>
      <h6 style={{ margin: 0, letterSpacing: 2 }}>
        Please enter your Username and Password
      </h6>
      <Space
        direction="vertical"
        style={{ width: "50%", marginTop: 40 }}
        align="center"
      >
        <Input
          style={inputStyle}
          className="input-style"
          prefix={<UserOutlined />}
          placeholder="Username"
          status={props.status === NetworkStatus.error ? "error" : ""}
          onChange={(e) => {
            if (props.onUserNameChanged != null)
              props.onUserNameChanged(e.target.value);
          }}
          onPressEnter={(_) => {
            document.getElementById("password-input-id")?.focus();
          }}
        />
        <Input.Password
          style={{
            ...inputStyle,
            marginTop: 10,
          }}
          id="password-input-id"
          key={"password-input-key"}
          className="input-style"
          prefix={<LockOutlined />}
          placeholder="Password"
          status={props.status === NetworkStatus.error ? "error" : ""}
          onChange={(e) => {
            if (props.onPasswordChanged != null)
              props.onPasswordChanged(e.target.value);
          }}
          onPressEnter={(e) => {
            e.preventDefault();
            e.currentTarget.blur();
          }}
        />
      </Space>
      <p className="forgot-password">Forgot password?</p>
      <Button
        style={{ width: 350, alignItems: "center" }}
        disabled={!props.isEnabledLogin}
        onClick={props.onLogin}
      >
        Login
      </Button>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: 350,
  height: 40,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  textDecorationColor: "red",
};
