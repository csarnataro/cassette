import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

import { useAlbumStore } from "@/hooks/use-album-store";

import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AlbumScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

  const { songs, loading, fetchSongs } = useAlbumStore();

  useEffect(() => {
    fetchSongs(id)
  }, [fetchSongs, id])

  return (
    <>
      <Stack.Screen options={{ headerTitle: title || "Unknown album" }} />
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator size="large" className="mx-auto mt-20" />
        ) : (
          <FlatList
            data={songs}
            renderItem={({ item }) => (
              <Item
                id
                title={item.title}
                duration={item.duration}
                playerUrl={item.playerUrl}
              />
            )}
            keyExtractor={(item) => item.title}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const Item = ({ title, duration, playerUrl }: any) => {
  return (
    <View className="flex w-full flex-row p-2 border-b border-gray-200">
      <Text className="text-gray-800 dark:text-gray-100">{title}</Text>
      <Text className="text-gray-800 dark:text-gray-100">{duration}</Text>
    </View>
  );
};
