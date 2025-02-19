export interface User {
  uid: string;
  userName: string;
  Name: string;
  email: string;
  links?: string[];
  profilePicture?: string;
  isVerified: boolean;
  theme?: string;
  Bio?: string;
}