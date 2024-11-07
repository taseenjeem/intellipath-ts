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
  courses?: ICourse[];
  enrolledCourses?: IEnrollments[];
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
  _id?: string;
  title: string;
  slug: string;
  instructor: IUserInfo;
  thumbnail: string;
  category: string;
  price: number;
  discount: number | null;
  language: string;
  duration: number;
  requirements: string;
  level: string;
  coupons?: { _id?: string; code: string; discount: number }[];
  lessons: { _id?: string; title: string; url: string }[];
  enrollments?: Types.ObjectId[];
  testimonials?: ITestimonial[];
  short_description: string;
  full_description: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export interface IPublishCourse {
  isLoading: boolean;
  title: string | null;
  slug: string | null;
  instructor: string | null;
  category: string | null;
  price: number | null;
  discount: number | null;
  language: string | null;
  duration: number | null;
  requirements: string | null;
  level: string | null;
  lessons: { title: string; url: string }[];
  short_description: string | null;
  full_description: string | null;
}

export interface IEnrollments {
  _id?: string;
  stripe_session_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string | null;
  created: number;
  expires_at: number;
  payment_intent: string | null;
  payment_status: string;
  mode: string;
  status: string | null;
  success_url: string | null;
  cancel_url: string | null;
  customer_details?: {
    email_while_payment?: string | null;
    name_while_payment?: string | null;
    address_while_payment?: string | null;
  };
  payment_method_type: string[];
  instructor: IUserInfo;
  purchased_by: IUserInfo;
  purchased_course: ICourse;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}
