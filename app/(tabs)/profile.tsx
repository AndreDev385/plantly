import { View, StyleSheet } from "react-native";

import { theme } from "@/theme";
import { useUserStore } from "@/store/userStore";
import { PlantlyButton } from "@/components/PlantlyButton";

function Profile() {
  const toggleHasOnBoarded = useUserStore((state) => state.toggleHasOnBoarded);

  function handleReturnToOnboarding() {
    toggleHasOnBoarded();
  }

  return (
    <View style={styles.container}>
      <PlantlyButton title="Onboarding" onPress={handleReturnToOnboarding} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Profile;
