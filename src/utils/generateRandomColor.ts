import { colors } from "@/common/colors";

export const generateRandomColor = () => {

  return colors[Math.floor(Math.random() * (colors.length - 0 + 1))];
};
