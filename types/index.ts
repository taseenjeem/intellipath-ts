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
}

export interface ICountry {
  name: string;
  code: string;
}

export interface ILearnerInfo {
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  birthDate: string;
  country: string;
  email: string;
  phone: string;
  address: string;
  courses: [];
}
