import { QuizData } from "../pages/entranceQuiz/entranceQuiz.types";
import apiClient from "./axiosInstance";
const baseUrl = "/quiz";

class QuizService {
  async submitQuiz(quizData: QuizData) {
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
    quizData?.photos?.forEach((photo, index) => {
      formData.append(`photo${index + 1}`, photo);
    });

    const response = await apiClient.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}

export default new QuizService();
