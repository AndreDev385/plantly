import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";

import { PlantlyButton } from "@/components/PlantlyButton";
import { PlantlyImage } from "@/components/PlantlyImage";
import { theme } from "@/theme";
import { usePlantStore } from "@/store/plantStore";
import { useRouter } from "expo-router";

export default function NewScreen() {
  const [name, setName] = React.useState<string>("");
  const [days, setDays] = React.useState<string>("");
  const [imageUri, setImageUri] = React.useState<string>("");

  const addPlant = usePlantStore((state) => state.addPlant);
  const router = useRouter();

  function handleSubmit() {
    if (!name) {
      return Alert.alert("Validation error", "Give your plant a name!");
    }
    if (!days) {
      return Alert.alert(
        "Validation error",
        `How often does ${name} need to be watered?`,
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation error",
        "Watering frequency needs to be a number!",
      );
    }

    addPlant(name, Number(days), imageUri);

    router.navigate("/");
  }

  async function handleChooseImage() {
    if (Platform.OS === "web") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        onPress={handleChooseImage}
        activeOpacity={0.6}
        style={styles.centered}
      >
        <PlantlyImage imageUri={imageUri} />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the cactus"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Watering frequency (every X days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 6"
        keyboardType="numeric"
      />
      <PlantlyButton title="New plant" onPress={handleSubmit} />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: "center",
    marginBottom: 24,
  },
});
