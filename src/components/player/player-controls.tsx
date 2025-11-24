// import Icon from '@react-native-vector-icons/fontawesome6';
import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import TrackPlayer, { usePlaybackState } from 'react-native-track-player';

import { IconSymbol } from '../ui/icon-symbol';
import { PlayPauseButton } from './play-pause-button';
import { PlaybackError } from './playback-error';

const performSkipToNext = () => TrackPlayer.skipToNext();
const performSkipToPrevious = () => TrackPlayer.skipToPrevious();

export const PlayerControls: React.FC = () => {
  const playback = usePlaybackState();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableWithoutFeedback onPress={performSkipToPrevious}>
          <IconSymbol name="backward.fill" size={30} color="white" />
        </TouchableWithoutFeedback>
        <PlayPauseButton />
        <TouchableWithoutFeedback onPress={performSkipToNext}>
          <IconSymbol name="forward.fill" size={30} color="white" />
        </TouchableWithoutFeedback>
      </View>
      <PlaybackError
        error={'error' in playback ? playback.error.message : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
