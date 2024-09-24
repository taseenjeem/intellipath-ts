// Interface representing a category of courses
export interface ICategory {
  id: string; // Unique identifier for the category
  title: string; // Title of the category
  slug: string; // URL-friendly version of the title
  thumbnail: string; // URL of the category thumbnail image
  description: string; // Description of the category
}

// Interface representing a course
export interface ICourses {
  id: string; // Unique identifier for the course
  title: string; // Title of the course
  slug: string; // URL-friendly version of the title
  thumbnail: string; // URL of the course thumbnail image
  description: string; // Description of the course
  instructor: string; // Name of the course instructor
  rating: number; // Average rating of the course
  reviews: number; // Number of reviews for the course
}

// Interface representing a testimonial for a course
export interface ITestimonial {
  id: string; // Unique identifier for the testimonial
  name: string; // Name of the person giving the testimonial
  avatar: string; // URL of the person's avatar image
  role: string; // Role or title of the person
  course: string; // Course related to the testimonial
  content: string; // Text content of the testimonial
  rating: number; // Rating given in the testimonial
  date: string; // Date of the testimonial
}

// Interface for registration form inputs
export interface IRegisterFormInputs {
  firstName: string; // First name of the user
  lastName: string; // Last name of the user
  email: string; // Email address of the user
  password: string; // Password for the user's account
  confirmPassword: string; // Confirmation of the password
}

// Interface representing a country
export interface ICountry {
  name: string; // Name of the country
  code: string; // ISO code for the country
}

// Interface for credential-based login form data
export interface ICredentialLoginFormData {
  email: string; // Email address for login
  password: string; // Password for login
}

// Interface for change password form inputs
export interface IChangePassForm {
  currentPassword: string; // Current password of the user
  newPassword: string; // New password to be set
  confirmNewPassword: string; // Confirmation of the new password
}

// Interface representing user information
export interface IUserInfo {
  status: boolean; // Status indicating if the user is active
  _id: string; // Unique identifier for the user
  firstName: string; // First name of the user
  lastName: string; // Last name of the user
  fullName: string; // Full name of the user
  username: string; // Username of the user
  password: string; // Password for the user's account
  authenticationMethod: string; // Method used for user authentication
  profileImageUrl?: string | null; // Optional URL for the user's profile image
  gender?: string | null; // Optional gender of the user
  birthDate?: string | null; // Optional birth date of the user
  country?: string | null; // Optional country of the user
  email: string; // Email address of the user
  phone?: string | null; // Optional phone number of the user
  address?: string | null; // Optional address of the user
  role: string; // Role of the user (e.g., admin, student)
  courses?: string[]; // Optional list of course IDs associated with the user
  expertise?: string[]; // Optional list of areas of expertise
  biography?: string | null; // Optional biography of the user
  education?: {
    // Optional list of education details
    _id?: string; // Unique ID for the education information
    degree: string; // Degree obtained
    institution: string; // Institution where the degree was obtained
    location: string; // Location of the institution
    startDate: string; // Start date of the education
    endDate: string; // End date of the education
  }[];
  certifications?: {
    // Optional list of certifications obtained
    _id?: string; // Unique ID for the certification information
    title: string; // Title of the certification
    issuer: string; // Issuer of the certification
    dateOfIssue: string; // Date the certification was issued
    url: string; // URL for more information about the certification
  }[];
  experience?: {
    // Optional list of work experience details
    _id?: string; // Unique ID for the experience information
    companyName: string; // Name of the company
    designation: string; // Job title or designation
    location: string; // Location of the company
    startDate: string; // Start date of employment
    endDate: string; // End date of employment
  }[];
  socialLinks?: {
    // Optional list of social media links
    linkedin?: string; // LinkedIn profile URL
    twitter?: string; // Twitter profile URL
    facebook?: string; // Facebook profile URL
    github?: string; // GitHub profile URL
    website?: string; // Personal website URL
  };
  createdAt?: Date | null; // Optional date when the user was created
  updatedAt?: Date | null; // Optional date when the user was last updated
}
