import React, {Component, useRef, useState} from 'react';

import {Text, TouchableOpacity, View, Image} from 'react-native';
import {PLAY} from '../../utils/common';
import Video from 'react-native-video';
import {styles} from './style';

const PlayVideo = () => {
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [resizeMode, setResizemode] = useState('contain');
  const [duration, setDuration] = useState(0.0);
  const [currentTime, setCurrenttime] = useState(0.0);
  const [paused, setPaused] = useState(true);
  const video = useRef(null);

  const onLoad = () => {
    setDuration(duration);
  };

  const onProgress = data => {
    setCurrenttime(currentTime);
  };

  const onEnd = () => {
    setPaused(true);
    video.current.seek(0);
  };

  const onAudioBecomingNoisy = () => {
    setPaused(true);
  };

  const onAudioFocusChanged = hasAudioFocus => {
    setPaused(!hasAudioFocus);
  };

  const getCurrentTimePercentage = () => {
    if (currentTime > 0) {
      return parseFloat(currentTime) / parseFloat(duration);
    }
    return 0;
  };

  const renderRateControl = rate => {
    const isSelected = rate === rate;

    return (
      <TouchableOpacity
        onPress={() => {
          setRate(rate);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  };

  const renderResizeModeControl = resizeMode => {
    const isSelected = resizeMode === resizeMode;

    return (
      <TouchableOpacity
        onPress={() => {
          setResizemode(resizeMode);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVolumeControl = volume => {
    const isSelected = volume === volume;

    return (
      <TouchableOpacity
        onPress={() => {
          setVolume(volume);
        }}>
        <Text
          style={[
            styles.controlOption,
            {fontWeight: isSelected ? 'bold' : 'normal'},
          ]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.fullScreen}
        onPress={() => setPaused(!paused)}>
        <Video
          ref={video}
          source={{
            uri:
              'https://stream.mux.com/YAQEybr3Oi2VDYx1gE3N00zAqU4AxQ2xo.m3u8',
          }}
          style={styles.fullScreen}
          rate={rate}
          paused={paused}
          volume={volume}
          muted={muted}
          resizeMode={resizeMode}
          onLoad={onLoad}
          onProgress={onProgress}
          onEnd={onEnd}
          onAudioBecomingNoisy={onAudioBecomingNoisy}
          onAudioFocusChanged={onAudioFocusChanged}
          repeat={false}
        />
        {paused && (
          <View style={styles.playContainer}>
            <Image source={PLAY} style={{height: 60, width: 60}} />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.controls}>
        <View style={styles.generalControls}>
          <View style={styles.volumeControl}>
            {renderVolumeControl(0.5)}
            {renderVolumeControl(1)}
            {renderVolumeControl(1.5)}
          </View>

          <View style={styles.resizeModeControl}>
            {renderResizeModeControl('cover')}
            {renderResizeModeControl('contain')}
            {renderResizeModeControl('stretch')}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlayVideo;
