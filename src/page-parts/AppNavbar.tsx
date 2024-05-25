import { ChangeEvent, useEffect, useState } from "react";
import Brand from "../components/Brand";
import Dropdown from "../components/Dropdown";
import Paragraph from "../components/Paragraph";
import Search from "../components/Search";
import { signOut } from "aws-amplify/auth";
import { useAuth } from "../context/AuthProvider";
import { getUrl } from "aws-amplify/storage";
import NotificationDropdown from "../components/NotificationDropdown";
import Notification03Icon from "../logos/Notification03Icon";

function AppNavbar() {
  const { setHasAuthenticated, userInformation } = useAuth();
  const [image, setImage] = useState("");

  async function handleSignout() {
    await signOut();
    setHasAuthenticated(false);
  }

  useEffect(() => {
    const fetchImage = async () => {
      if (!userInformation || !userInformation.profilePictureUrl) return;

      const url = await getUrl({
        path: userInformation?.profilePictureUrl || "",
      });
      setImage(url.url.toString());
    };
    fetchImage();
  }, [userInformation]);

  const buttons = [
    {
      label: "Profile",
      onClick: () => console.log("Profile"),
    },
    {
      label: "Settings",
      onClick: () => console.log("Settings"),
    },
    {
      label: "Sign Out",
      onClick: handleSignout,
    },
  ];

  return (
    <div className="w-[60%] mx-auto pt-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-center">
        <div className="flex flex-1 gap-x-8 mr-16">
          <Brand />
          <Search
            hasSearchIcon
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              console.log(e.target.value)
            }
            placeholder="Search"
            value=""
          />
        </div>
        <NotificationDropdown jsxComponent={<Notification03Icon />} />
        <Dropdown
          jsxComponent={
            <div className="h-5 w-5">
              <img src={image} alt="profile-image object-fill" />
            </div>
          }
          values={buttons}
        />
        <Paragraph bold>
          {userInformation?.fullName || userInformation?.email || "No name"}
        </Paragraph>
      </div>
    </div>
  );
}

export default AppNavbar;
