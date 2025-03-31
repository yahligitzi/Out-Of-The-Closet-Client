export type User = {
  username: string;
  password: string;
  email: string;
  id: string;
  token: string;
};

export type CreateUserDto = Omit<Omit<User, "id">, "token">;
