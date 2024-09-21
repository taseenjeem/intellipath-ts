import { getUserByUsername } from "@/database/server-actions";
import CoursesTab from "@/src/components/page/profile-page/CourseTab";
import ProfileInfoTab from "@/src/components/page/profile-page/ProfileInfoTab";
import SettingsTab from "@/src/components/page/profile-page/SettingsTab";

interface IMyAccountPageProps {
  params: {
    username: string;
  };
}

const MyAccountPage = async ({ params }: IMyAccountPageProps) => {
  const userData = await getUserByUsername(params.username);

  return (
    <div role="tablist" className="tabs tabs-bordered w-full mt-5">
      <ProfileInfoTab userData={userData} />
      <CoursesTab />
      <SettingsTab
        userEmail={userData?.email ?? ""}
        userId={userData?._id ?? ""}
      />
    </div>
  );
};

export default MyAccountPage;
