const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <section className="custom-min-h container w-full">
        <h1 className="lg:text-4xl text-3xl text-primary uppercase font-semibold mt-5">
          My Profile
        </h1>
        <div className="w-full mt-5">{children}</div>
      </section>
    </>
  );
};

export default ProfileLayout;
