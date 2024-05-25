import { Schema } from "../../../amplify/data/resource";

type Props = {
  onUserClick: (userId: string) => () => void;
  userInfo: Schema["User"]["type"];
};

function UserBubble({ onUserClick, userInfo }: Props) {
  console.log("userInfo", userInfo.profilePictureUrl);

  return (
    <div
      onClick={onUserClick(userInfo.fullName || "No Name")}
      className="w-8 h-8 bg-secondary rounded-full cursor-pointer"
    >
      <img
        src={userInfo?.profilePictureUrl || "https://via.placeholder.com/150"}
        alt="user-profile-pic"
        className="w-8 h-8 rounded-full"
      />
    </div>
  );
}

export default UserBubble;
