import TrackPlayer from "react-native-track-player";

// import playlistData from '../assets/data/playlist.json';
// // @ts-expect-error – sure we can import this
// import localTrack from '../assets/resources/pure.m4a';
// // @ts-expect-error – sure we can import this
// import localArtwork from '../assets/resources/artwork.jpg';

export const QueueInitialTracksService = async (): Promise<void> => {
  await TrackPlayer.add([
    {
      url: "https://rntp.dev/example/Longing.mp3",
      title: "Longing",
      artist: "David Chavez",
      artwork: "https://rntp.dev/example/Longing.jpeg",
      duration: 143,
    },
    {
      url: "https://rntp.dev/example/Soul%20Searching.mp3",
      title: "Soul Searching (Demo)",
      artist: "David Chavez",
      artwork: "https://rntp.dev/example/Soul%20Searching.jpeg",
      duration: 77,
    },
  ]);
};
