export interface ICategory {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
}

export interface ICourses {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  instructor: string;
  rating: number;
  reviews: number;
}

export interface ITestimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  course: string;
  content: string;
  rating: number;
  date: string;
}

export interface ILoginFormInputs {
  email: string;
  password: string;
}

export interface IRegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ICountry {
  name: string;
  code: string;
}

export interface ICredentialLoginFormData {
  email: string;
  password: string;
}

export interface IUserInfo {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  profileImageUrl?: string | null;
  gender?: string | null;
  birthDate?: string | null;
  country?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  role: string;
  courses?: string[];
  expertise?: string[];
  biography?: string | null;
  education?: {
    degree: string;
    institution: string;
    yearOfCompletion: string;
  }[];
  teachingExperience?: number | null;
  certifications?: {
    title: string;
    issuer: string;
    dateOfIssue: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
