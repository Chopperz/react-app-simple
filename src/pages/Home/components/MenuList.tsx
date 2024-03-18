import { Menu, MenuProps } from "antd";
import {
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
} from "@ant-design/icons";

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
  return (
    <Menu
      theme="dark"
      className="menu-list"
      mode="vertical"
      defaultSelectedKeys={["application"]}
      items={items}
    />
  );
};

export default MenuList;
