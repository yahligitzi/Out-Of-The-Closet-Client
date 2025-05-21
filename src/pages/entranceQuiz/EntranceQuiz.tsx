import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import styles from "./entranceQuiz.style";
import { UploadPhotos } from "./components/uploadPhotos/uploadPhotos";
import { GenderSelection } from "./components/GenderSelection/GenderSelection";
import { Measurements } from "./components/Measurements/Measurements";
import { StylePreferences } from "./components/StylePreferences/StylePreferences";
import { SkinTone } from "./components/SkinTone/SkinTone";
import { useSnackbar } from "../../contexts/SnackbarContext";
import { useNavigate } from "react-router-dom";
import { QuizData, QuizStep } from "./entranceQuiz.types";
import { Gender } from "./components/GenderSelection/genderSelection.consts";
import { StyleOption } from "./components/StylePreferences/stylePreferences.types";
import { SkinToneValue } from "./components/SkinTone/skinTone.consts";
import { submitQuiz } from "../../services/user.service";

export const EntranceQuiz = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState<QuizData>();

  const handleGenderSelect = (gender: Gender) => {
    setQuizData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleMeasurementChange = (field: string, value: string) => {
    setQuizData((prev) => ({
      ...prev,
      measurements: {
        ...(prev?.measurements ?? {}),
        [field]: value,
      },
    }));
  };

  const handleStyleSelect = (style: StyleOption) => {
    setQuizData((prev) => ({
      ...prev,
      preferredStyle: style,
    }));
  };

  const handleSkinToneSelect = (tone: SkinToneValue) => {
    setQuizData((prev) => ({
      ...prev,
      skinTone: tone,
    }));
  };

  const handlePhotosChange = (photos: File[]) => {
    setQuizData((prev) => ({
      ...prev,
      photos,
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      setIsSubmitting(true);
      quizData && (await submitQuiz(quizData));
      setSnackbar({
        open: true,
        message: "Quiz submitted successfully!",
        severity: "success",
      });
      navigate("/dashboard"); // Navigate to dashboard after successful submission
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error submitting quiz. Please try again.",
        severity: "error",
      });
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const quizSteps: QuizStep[] = [
    {
      title: "Entrance quiz",
      id: "gender",
      subtitle: "gender selection",
      component: (
        <GenderSelection
          selectedGender={quizData?.gender}
          onSelect={handleGenderSelect}
        />
      ),
      isRequired: true,
    },
    {
      title: "Entrance quiz",
      id: "measurements",
      subtitle: "body measurements",
      component: (
        <Measurements
          measurements={quizData?.measurements}
          onMeasurementChange={handleMeasurementChange}
        />
      ),
    },
    {
      title: "Entrance quiz",
      id: "preferredStyle",
      subtitle: "style preferences",
      component: (
        <StylePreferences
          gender={quizData?.gender}
          selectedStyle={quizData?.preferredStyle}
          onSelect={handleStyleSelect}
        />
      ),
    },
    {
      title: "Entrance quiz",
      id: "skinTone",
      subtitle: "skin tone",
      component: (
        <SkinTone
          selectedTone={quizData?.skinTone}
          onSelect={handleSkinToneSelect}
        />
      ),
    },
    {
      title: "Entrance quiz",
      id: "photos",
      subtitle: "upload photos",
      component: (
        <UploadPhotos
          photos={quizData?.photos}
          onPhotosChange={handlePhotosChange}
        />
      ),
      isRequired: true,
    },
  ];

  const handleNext = () => {
    if (currentStepIndex < quizSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const currentStep = quizSteps[currentStepIndex];
  const isCurrentStepValid = currentStep.isRequired
    ? quizData?.[currentStep.id]
    : true;

  return (
    <Box sx={styles.root}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          {currentStep.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {currentStep.subtitle}
        </Typography>

        <Box sx={styles.content}>{currentStep.component}</Box>

        <Box sx={styles.navigation}>
          <Button
            onClick={handleBack}
            disabled={currentStepIndex === 0 || isSubmitting}
            sx={styles.navigationButton}
          >
            Back
          </Button>
          {currentStepIndex === quizSteps.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              variant="contained"
              sx={styles.navigationButton}
              disabled={!isCurrentStepValid || isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              sx={styles.navigationButton}
              disabled={!isCurrentStepValid}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
