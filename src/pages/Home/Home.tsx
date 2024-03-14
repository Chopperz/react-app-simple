import { useEffect, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Layout, Spin } from "antd";
import Logo from "@components/Logo";
import { userServices } from "@services/userService";

import MenuList from "./src/MenuList";
import UserInfoView from "./src/UserInfoView";
import "./Home.css";

const { Sider } = Layout;

function Home() {
  const initialize = useRef(false);
  const [collapsed, setCollapsed] = useState(false);
  const [authenticated, setAuthticated] = useState<boolean | null>(null);

  const navigator = useNavigate();

  async function handlePreventUserLoggedIn() {
    const user = localStorage.getItem("user-token");

    if (user && user !== "") {
      await userServices.getMe();
      setAuthticated(true);
    } else {
      setAuthticated(false);
    }
  }

  useEffect(() => {
    if (!initialize.current) {
      initialize.current = true;
      
      handlePreventUserLoggedIn();
    }
  }, []);

  if (authenticated) {
    return (
      <Layout
        style={{
          width: "100vw",
          height: "100vh",
          background: "white",
        }}
      >
        <Sider
          className="sidebar"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          collapsedWidth={collapsed ? 88 : 263}
        >
          <Logo />
          <MenuList />
          <UserInfoView />
        </Sider>
        <div className="dp-screen">
          <h1
            style={{
              color: "black",
            }}
          >
            HOME
          </h1>
          <Button
            onClick={() => {
              localStorage.removeItem("user-token");
              navigator("/login");
            }}
          >
            Sign out
          </Button>
        </div>
      </Layout>
    );
  }

  return authenticated == false ? <Navigate replace to="/login" /> : <Spin />;
}

export default Home;
