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
