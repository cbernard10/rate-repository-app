import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    primary: "#0366d6",
    backgroundPrimary: "#24292e",
    backgroundSecondary: "#e1e4e8",
  },
  fontSizes: {
    body: 16,
    subheading: 24,
    xl: 32,
  },
  fonts: {
    // main: "System",
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
