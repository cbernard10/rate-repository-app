import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    flexWrap: "wrap",
  },
  colorTextPrimary: {
    color: theme.colors.textPrimary,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeXl: {
    fontSize: theme.fontSizes.xl,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "textPrimary" && styles.colorTextPrimary,
    color === "primary" && styles.colorPrimary,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontSize === "xl" && styles.fontSizeXl,

    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
