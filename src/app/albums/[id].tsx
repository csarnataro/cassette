import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";

import { useAlbumStore } from "@/hooks/use-album-store";

import { PlayerControls } from "@/components/player/player-controls";
import { Progress } from "@/components/player/progress";
import { Spacer } from "@/components/spacer";
import { usePlayerStore } from "@/hooks/use-player-store";
import { QueueInitialTracksService } from "@/services/queue-initial-tracks-service";
import { SetupService } from "@/services/setup-service";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
export default function AlbumScreen() {
  const { id, title } = useLocalSearchParams<{ id: string; title: string }>();

  const { songs, loading, fetchSongs } = useAlbumStore();
  const { currentSong, callPlayer, currentSongIndex } = usePlayerStore();

  const track = useActiveTrack();
  const isPlayerReady = useSetupPlayer();

  useEffect(() => {
    fetchSongs(id);
  }, [fetchSongs, id]);

  useEffect(() => {
    const firstSong = songs[0];
    if (firstSong) {
      callPlayer(firstSong.videoId, firstSong.playlistId);
    }
  }, [songs, callPlayer]);

  return (
    <>
      <Stack.Screen options={{ headerTitle: title || "Unknown album" }} />
      <SafeAreaView>
        {isPlayerReady ? (
          <>
            <Progress live={track?.isLiveStream} />
            <Spacer />
            <PlayerControls />
          </>
        ) : (
          <ActivityIndicator size="large" className="mx-auto mt-20" />
        )}

        {loading ? (
          <ActivityIndicator size="large" className="mx-auto mt-20" />
        ) : (
          <FlatList
            data={songs}
            renderItem={({ item }) => (
              <Item
                title={item.title}
                duration={item.duration}
                playlistId={item.playlistId}
                videoId={item.videoId}
              />
            )}
            keyExtractor={(item) => item.title}
          />
        )}
      </SafeAreaView>
    </>
  );
}

function useSetupPlayer() {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
      const queue = await TrackPlayer.getQueue();
      if (unmounted) return;
      if (queue.length <= 0) {
        await QueueInitialTracksService();
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

const Item = ({ title, duration, videoId, playlistId }: any) => {
  return (
    <View className="flex w-full flex-col p-2 border-b border-gray-200">
      <Text className="text-gray-800 dark:text-gray-100">{title}</Text>
      <Text className="text-gray-800 dark:text-gray-100">{videoId}</Text>
      <Text className="text-gray-800 dark:text-gray-100">{playlistId}</Text>
    </View>
  );
};
