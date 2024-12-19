import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as FileSystem from "expo-file-system";

export type Plant = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  imageUri?: string;
  lastWateredAtTimestamp?: number;
};

type PlantStore = {
  nextId: number;
  plants: Plant[];
  addPlant: (
    name: string,
    wateringFrequencyDays: number,
    imageUri?: string,
  ) => Promise<void>;
  removePlant: (id: string) => void;
  watterPlant: (id: string) => void;
};

export const usePlantStore = create(
  persist<PlantStore>(
    (set) => ({
      nextId: 0,
      plants: [],
      addPlant: async (name, wateringFrequencyDays, imageUri?) => {
        const savedImageUri =
          FileSystem.documentDirectory +
          `/${new Date().getTime()}-${imageUri?.split("-").slice(-1)[0]}.png`;

        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        set((state) => ({
          ...state,
          nextId: state.nextId + 1,
          plants: [
            {
              id: state.nextId.toString(),
              name,
              wateringFrequencyDays,
              imageUri: imageUri ?? savedImageUri,
            },
            ...state.plants,
          ],
        }));
      },
      removePlant: (id) => {
        set((state) => ({
          ...state,
          plants: state.plants.filter((plant) => plant.id !== id),
        }));
      },
      watterPlant: (id) => {
        set((state) => ({
          ...state,
          plants: state.plants.map((plant) => {
            if (plant.id === id) {
              return {
                ...plant,
                lastWateredAtTimestamp: Date.now(),
              };
            }
            return plant;
          }),
        }));
      },
    }),
    {
      name: "plantly-plants-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
