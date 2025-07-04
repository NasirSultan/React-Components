import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const analyzeResume = async (driveUrl) => {
  const response = await axios.post(`${BASE_URL}/analyze`, { driveUrl });
  return response.data;
};

export const suggestAchievements = async (resumeText) => {
  const response = await axios.post(`${BASE_URL}/suggest-achievements`, { resumeText });
  return response.data;
};

export const improveResume = async ({ userInfo, pdfText, userAcceptedAchievements }) => {
  const response = await axios.post(`${BASE_URL}/improve`, {
    userInfo,
    pdfText,
    userAcceptedAchievements,
  });
  return response.data;
};
