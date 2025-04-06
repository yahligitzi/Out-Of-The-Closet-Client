export type User = {
  username: string;
  email: string;
  id: string;
};

export type CreateUserDto = Omit<User, "id">;

export type CreateUserResDto = User & { token: string };
