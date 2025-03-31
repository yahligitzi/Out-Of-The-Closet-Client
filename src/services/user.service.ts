import { CreateUserDto, User } from "../types/user.type";
import apiClient from "./axiosInstance";

const baseUrl = "/users";

const createNewUser = async (userToCreate: CreateUserDto): Promise<User> =>
  await apiClient.post(`${baseUrl}`, userToCreate);

const getExistingUser = async (username: string, password: string) =>
  await apiClient.post(``);

export { createNewUser, getExistingUser };
