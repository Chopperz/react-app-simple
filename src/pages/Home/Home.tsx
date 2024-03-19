import { useEffect, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Layout, Spin } from "antd";
import Logo from "@components/Logo";
import { userServices } from "@services/userService";
import MenuList from "./components/MenuList";
import UserInfoView from "./components/UserInfoView";
import "./Home.css";
import App from "../../App";
import globalRouter from "@constants/navigate";

const { Sider, Content } = Layout;

function Home() {
  const initialize = useRef(false);
  const [collapsed, setCollapsed] = useState(false);
  const [authenticated, setAuthticated] = useState<boolean | null>(null);

  const navigate = (globalRouter.navigate = useNavigate());

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
          <UserInfoView isCollapsed={collapsed} />
        </Sider>
        <Content>
          <App />
        </Content>
      </Layout>
    );
  }

  return authenticated == false ? <Navigate replace to="/login" /> : <Spin />;
}

export default Home;
