import "../global.css";

import SearchBox from "@/components/search-box";
import { useHomeStore } from "@hooks/use-home-store";
import { Image } from "expo-image";
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ItemProps = {
  browseId?: string;
  title: string;
  info?: string;
  thumbnailUrl?: string;
  year?: string;
};

export default function Home() {
  const { query, loading, setQuery, searchAlbum, albums } = useHomeStore();
  return (
    <SafeAreaView>
      <SearchBox
        query={query}
        setQuery={setQuery}
        startSearch={async () => await searchAlbum(query)}
      />
      <View>
        <Button
          title="Load"
          onPress={async () => await searchAlbum(query)}
        ></Button>
      </View>
      {loading ? (
        <ActivityIndicator size="large" className="mx-auto mt-20" />
      ) : (
        <FlatList
          data={albums}
          renderItem={({ item }) => (
            <Item 
              title={item.title} 
              info={item.info} 
              year={item.year} 
              thumbnailUrl={item.thumbnailUrl?.url}
              />
          )}
          keyExtractor={(item) => item.browseId}
        />
      )}
    </SafeAreaView>
  );
}

const Item = ({ title, info, thumbnailUrl, year }: ItemProps) => (
  <View className="flex w-full flex-row p-2 border-b border-gray-200">
    <View className="grow">
      <Text className="text-lg text-gray-800 px-4 pt-4">{title}</Text>
      <Text className="text-sm text-gray-500 px-4 pb-4">{info} - {year}</Text>
    </View>
    <View className="w-20 h-20 bg-gray-100 p-1">
      <Image
        contentFit="cover"
        source={
          thumbnailUrl || require("@/assets/images/album-cover-not-found.png")
        }
        style={{ width: "100%", height: "100%", padding: 20 }}
      />
    </View>
  </View>
);
