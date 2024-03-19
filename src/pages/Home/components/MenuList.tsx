import { Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Application", "application", <AppstoreOutlined />),
  getItem("Log", "log", <FileTextOutlined />),
  getItem("User Management", "user-management", <TeamOutlined />),
];

const MenuList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuKey, setSelectedKey] = useState("application");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setSelectedKey("application");
        break;
      case "/log":
        setSelectedKey("log");
        break;
      case "/user-management":
        setSelectedKey("user-management");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <Menu
      theme="dark"
      className="menu-list"
      mode="vertical"
      selectedKeys={[menuKey]}
      defaultSelectedKeys={["application"]}
      items={items}
      onSelect={(e) => {
        if (e.key === "application") {
          navigate("/");
        } else {
          navigate(`/${e.key}`);
        }
      }}
    />
  );
};

export default MenuList;
