import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Layout, Spin } from "antd";
import Logo from "../../components/Logo";
import MenuList from "../../components/MenuList";

import "./Home.css";
import { userServices } from "../../services/userService";

const { Sider } = Layout;

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [authenticated, setAuthticated] = useState<boolean | null>(null);

  const navigator = useNavigate();

  async function handlePreventUserLoggedIn() {
    const user = localStorage.getItem("user-token");

    if (user && user !== "") {
      setAuthticated(true);
    } else {
      setAuthticated(false);
    }
  }

  useEffect(() => {
    handlePreventUserLoggedIn().then(() => {
      userServices.getMe();
    });
  }, [authenticated]);

  if (!authenticated) {
    return authenticated == false ? <Navigate replace to="/login" /> : <Spin />;
  } else {
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
}

export default Home;
