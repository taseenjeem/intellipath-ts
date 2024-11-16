import { getAllUsers } from "@/database/server-actions";
import ProfileInfoTab from "@/src/components/page/profile-page/ProfileInfoTab";
import { IUserInfo } from "@/types";

export const generateStaticParams = async () => {
  const allUsers: IUserInfo[] = await getAllUsers();
  return allUsers.map((user: IUserInfo) => ({ username: user.username }));
};

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  return {
    title: `${params.username} - Profile Info | Intellipath`,
  };
};

const MyAccountPage = async () => {
  return <ProfileInfoTab />;
};

export default MyAccountPage;
