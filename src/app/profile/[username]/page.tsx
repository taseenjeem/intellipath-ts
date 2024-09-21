import { getUserByUsername } from "@/database/server-actions";
import ProfileInfoTab from "@/src/components/page/profile-page/ProfileInfoTab";

interface IMyAccountPageProps {
  params: {
    username: string;
  };
}

const MyAccountPage = async ({ params }: IMyAccountPageProps) => {
  const userData = await getUserByUsername(params.username);

  return <ProfileInfoTab userData={userData} />;
};

export default MyAccountPage;
