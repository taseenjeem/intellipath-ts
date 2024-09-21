import { getUserByUsername } from "@/database/server-actions";
import ProfileInfoForm from "@/src/components/page/profile-page/ProfileInfoForm";

const SettingsPage = async () => {
  return (
    <>
      <ProfileInfoForm />
    </>
  );
};

export default SettingsPage;
