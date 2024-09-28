import { Types } from "mongoose";

export interface ICategory {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
}

export interface ICourses {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  instructor: string;
  rating: number;
  reviews: number;
}

export interface ITestimonial {
  _id: string;
  user: Types.ObjectId;
  course: Types.ObjectId;
  content: string;
  rating: number;
  date: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IRegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface ICountry {
  name: string;
  code: string;
}

export interface ICredentialLoginFormData {
  email: string;
  password: string;
}

export interface IChangePassForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IUserInfo {
  status: boolean;
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  password: string;
  authenticationMethod: string;
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
    _id?: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
  }[];
  certifications?: {
    _id?: string;
    title: string;
    issuer: string;
    dateOfIssue: string;
    url: string;
  }[];
  experience?: {
    _id?: string;
    companyName: string;
    designation: string;
    location: string;
    startDate: string;
    endDate: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
    website?: string;
  };
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface ICourse {
  _id: string;
  title: string;
  slug: string;
  instructor: Types.ObjectId;
  thumbnail: string;
  category: string;
  price: number;
  discount: number;
  language: string;
  duration: string;
  requirements: string;
  coupons?: { _id?: string; code: string; discount: number }[];
  lessons: { _id?: string; title: string; url: string }[];
  testimonials: ITestimonial[];
  short_description: string;
  full_description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
