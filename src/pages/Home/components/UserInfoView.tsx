import { AuthUserInterface } from "@interfaces/auth.interface";
import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { Avatar } from "antd";

interface UserInfoViewInterface {
  isCollapsed: boolean,
}

function UserInfoView(props: UserInfoViewInterface) {
  const userInfo: AuthUserInterface = useSelector(
    (state: RootState) => state.user.user
  );

  return (
    <div className="user-info-view">
      <Avatar src={userInfo.image} size={"large"} />
      <div hidden={props.isCollapsed} className="user-info-description">
        <h5>
          {userInfo.firstName} {userInfo.lastName}
        </h5>
        <h5>{userInfo.email}</h5>
      </div>
    </div>
  );
}

export default UserInfoView;
