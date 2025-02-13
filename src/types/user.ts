import { Prisma } from "@prisma/client";

export type User = {
  uid: number;
  Name: string;
  userName: string;
  links: string[];
  profilePicture?: string | null;
  email: string;
  password: string;
  isVerified: boolean;
  theme: number;
  Bio: true;

};

export type CreateUserInput = Omit<User, "uid">;
export type UpdateUserInput = Partial<Omit<User, "uid" | "userId" | "email">>;

export const userSelect = {
  uid: true,
  userId: true,
  userName: true,
  links: true,
  profilePicture: true,
  email: true,
  isVerified: true,
} as const;

export type UserResponse = Prisma.UserGetPayload<{ select: typeof userSelect }>;
