import { TextInput, TouchableHighlight, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";

interface SearchBoxProps {
  query: string;
  setQuery: (query: string) => void;
  startSearch: (query: string) => void;
}

export default function SearchBox(props: SearchBoxProps) {
  const { query, setQuery, startSearch } = props;
  return (
    <View className="bg-white border border-gray-300 flex flex-row radius-lg mx-2 rounded-lg items-center px-2">
      <IconSymbol color="gray" name="magnifyingglass" />
      <TextInput
        enterKeyHint="search"
        className="h-12 grow"
        value={query}
        onChangeText={(query) => setQuery(query)}
        keyboardType="default"
        returnKeyType="search"
        placeholder="Search..."
        onSubmitEditing={() => startSearch(query)}
      />
      <TouchableHighlight
        onPress={() => {
          console.log("clearing...");
          setQuery("");
        }}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        className="rounded-2xl p-1 bg-gray-200"
      >
        <IconSymbol color="gray" name="clear" />
      </TouchableHighlight>
    </View>
  );
}
