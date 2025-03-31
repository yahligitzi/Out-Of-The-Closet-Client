import { CreateUserDto, User } from "../types/user.type";
import apiClient from "./axiosInstance";

const baseUrl = "/users";

const createNewUser = async (userToCreate: CreateUserDto): Promise<User> =>
  await apiClient.post(baseUrl, userToCreate);

const loginExistingUser = async (username: string, password: string) =>
  await apiClient.post(`${baseUrl}/login`, { username, password });

export { createNewUser, loginExistingUser };
