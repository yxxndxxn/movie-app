import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

interface CustomTextProps extends TextProps {
  w?: "regular" | "bold" | "light" | "medium";
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  w = "regular",
  ...props
}) => {
  const getFontFamily = () => {
    switch (w) {
      case "medium":
        return "Pretendard-Medium";
      case "bold":
        return "Pretendard-Bold";
      default:
        return "Pretendard-Regular"; // 기본값
    }
  };

  return (
    <Text
      style={[styles.defaultText, { fontFamily: getFontFamily() }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    color: "#000000", // 기본 검은색
  },
});

export default CustomText;
