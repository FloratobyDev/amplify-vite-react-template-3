import ProfileCard from "../components/ProfileCard";
import { ProfileType } from "../types";

type Props = {
  profiles: ProfileType[];
};

function AppProfileList({ profiles }: Props) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-4">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} profile={profile} />
      ))}
    </div>
  );
}

export default AppProfileList;
