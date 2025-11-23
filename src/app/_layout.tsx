import "../global.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { View } from "react-native";

const HeaderBackground = () => {
  return (
    <View className="h-10 w-10">
      <Image
        className="h-10 w-10"
        contentFit="cover"
        source={require("@/assets/images/cassette-header.png")}
        style={{ width: "100%", height: "100%", padding: 0 }}
      />
    </View>
  );
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerStyle: {
              backgroundColor: colorScheme === "dark" ? "black" : "white"
            },
            headerTitle: "Cassette",
            headerTitleAlign: "center",
            // headerTitle: () => (
            //   <View className="flex flex-row items-center">
            //     <Text className="text-lg pr-2 text-white">Cassette</Text>
            //     <Image
            //       source={require("@/assets/images/cassette-header-fluo.png")}
            //       style={{ width: 30, height: 20 }}
            //     />
            //   </View>
            // ),
            // header: HeaderBackground,
            
          }}
        />
        <Stack.Screen
          name="modal"
          options={{
            headerTintColor: "pink",
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
