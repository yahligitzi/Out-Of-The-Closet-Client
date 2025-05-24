import { QuizData } from "../pages/entranceQuiz/entranceQuiz.types";
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

const submitQuiz = async (quizData: QuizData) => {
  const formData = new FormData();

  // Add all text data as a JSON string
  formData.append(
    "data",
    JSON.stringify({
      gender: quizData.gender,
      measurements: quizData.measurements,
      preferredStyle: quizData.preferredStyle,
      skinTone: quizData.skinTone,
    })
  );

  // Add photos
  quizData?.photos?.forEach((photo) => {
    formData.append(`images`, photo);
  });

  const response = await apiClient.post(`${baseUrl}/quiz`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export { createNewUser, loginExistingUser, validateUserToken, submitQuiz };
