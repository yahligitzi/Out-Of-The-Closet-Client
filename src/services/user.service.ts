import { CreateUserDto, CreateUserResDto, User } from "../types/user.type";
import apiClient from "./axiosInstance";

const baseUrl = "/users";

const createNewUser = async (userToCreate: CreateUserDto) =>
  await apiClient.post<CreateUserResDto>(baseUrl, userToCreate);

const loginExistingUser = async (username: string, password: string) =>
  await apiClient.post<CreateUserResDto>(`${baseUrl}/login`, {
    username,
    password,
  });

const validateUserToken = async () =>
  apiClient.post<User | null>(`${baseUrl}/token`, {});

export { createNewUser, loginExistingUser, validateUserToken };
