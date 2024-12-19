import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";

export default function Onboarding() {
  const router = useRouter();
  const toggleHasOnBoarded = useUserStore((state) => state.toggleHasOnBoarded);

  function handleContinue() {
    toggleHasOnBoarded();
    router.replace("/profile");
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[theme.colorGreen, theme.colorAppleGreen, theme.colorLimeGreen]}
      style={styles.container}
    >
      <View>
        <Text style={styles.heading}>Planty</Text>
        <Text style={styles.tagline}>Keep your plants happy and hydrated</Text>
      </View>
      <PlantlyImage />
      <PlantlyButton title="Let me in!" onPress={handleContinue} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: theme.colorWhite,
    marginBottom: 12,
    textAlign: "center",
  },
  tagline: {
    fontSize: 24,
    color: theme.colorWhite,
    textAlign: "center",
  },
});
