import SearchBox from "@/components/search-box";
import { useHomeStore } from "@/hooks/use-home-store";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ItemProps = {
  browseId: string;
  title: string;
  info?: string;
  thumbnailUrl?: string;
  year?: string;
};

export default function Home() {
  const { query, loading, setQuery, searchAlbums, albums } = useHomeStore();
  return (
    <SafeAreaView>
      <SearchBox
        query={query}
        setQuery={setQuery}
        startSearch={async () => await searchAlbums(query)}
      />
      {loading ? (
        <ActivityIndicator size="large" className="mx-auto mt-20" />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          data={albums}
          renderItem={({ item }) => (
            <Item
              browseId={item.browseId}
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

const Item = ({ title, info, thumbnailUrl, year, browseId }: ItemProps) => {
  const router = useRouter();

  const goToAlbum = (browseId: string, title: string) => {
    router.navigate(`/albums/${browseId}?title=${title}`);
  };
  return (
    <TouchableHighlight onPress={() => goToAlbum(browseId, title)} underlayColor="#DDDDDD">
      <View className="flex w-full flex-row p-2 border-b border-gray-200">
        <View className="grow shrink">
          <Text className="text-lg text-gray-800 dark:text-gray-100 px-4 pt-4 line-clamp-1 text-ellipsis">
            {title}
          </Text>
          <Text className="text-sm text-gray-500 px-4 line-clamp-1 text-ellipsis">
            {info}
          </Text>
        </View>
        <View className=" w-20 h-20 bg-gray-100 p-1">
          <Image
            contentFit="cover"
            source={
              thumbnailUrl ||
              require("@/assets/images/album-cover-not-found.png")
            }
            style={{ width: "100%", height: "100%", padding: 20 }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};
