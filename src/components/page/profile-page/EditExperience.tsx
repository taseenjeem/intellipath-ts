import { IUserInfo } from "@/types";

interface IEditExperienceProps {
  formData: IUserInfo;
}

const EditExperience = ({ formData }: IEditExperienceProps) => {
  return (
    <>
      <h3 className="text-2xl font-semibold text-primary underline underline-offset-4 mt-16 mb-5">
        Experiences
      </h3>
      <h3>
        Total Experiences: {formData?.teachingExperience?.totalExperience} years
      </h3>
    </>
  );
};

export default EditExperience;
