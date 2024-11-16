import { getAllUsers } from "@/database/server-actions";
import ChangePassword from "@/src/components/page/profile-page/ChangePassword";
import ProfileInfoForm from "@/src/components/page/profile-page/ProfileInfoForm";
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
    title: `${params.username} - Settings | Intellipath`,
  };
};

const SettingsPage = () => {
  return (
    <>
      <ProfileInfoForm />
      <ChangePassword />
    </>
  );
};

export default SettingsPage;
