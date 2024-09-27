import ProfileNavigation from "@/src/components/page/profile-page/ProfileNavigation";

const ProfileLayout = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    username: string;
  };
}>) => {
  return (
    <>
      <section className="custom-min-h container w-full">
        <h1 className="lg:text-4xl text-3xl text-primary uppercase font-semibold mt-5">
          Dashboard
        </h1>
        <div className="w-full mt-5">
          <ProfileNavigation username={params.username} />
          {children}
        </div>
      </section>
    </>
  );
};

export default ProfileLayout;
