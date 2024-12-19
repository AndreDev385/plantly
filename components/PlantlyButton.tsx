import { Platform, Pressable, StyleSheet, Text } from "react-native";
import * as Haptics from "expo-haptics";

import { theme } from "@/theme";

type Props = {
  title: string;
  onPress: () => void;
};

export function PlantlyButton({ title, onPress }: Props) {
  function handlePress() {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  }

  return (
    <Pressable
      style={({ pressed }) => {
        if (pressed) {
          return [styles.button, styles.buttonPressed];
        }
        return styles.button;
      }}
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colorWhite,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 6,
    backgroundColor: theme.colorGreen,
  },
  buttonPressed: {
    backgroundColor: theme.colorLeafyGreen,
  },
});
