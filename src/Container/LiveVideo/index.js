import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {NodeCameraView} from 'react-native-nodemediaclient';
import {FLIP, FLASH, START, STOP, PAUSE} from './../../utils/common';
import {styles} from './styles';

const LiveVideo = () => {
  const [publish, setPublish] = useState(false);
  const [flashenable, setFlashenable] = useState(false);
  const vb = useRef(null);

  useEffect(() => {
    return () => vb.current.stop();
  }, []);

  const startLive = () => {
    setPublish(true);
    vb.current.start();
  };

  const stopLive = () => {
    vb.current.stop();
    setPublish(false);
  };

  const flash = () => {
    setFlashenable(!flashenable);
    vb.current.flashEnable(flashenable);
  };

  return (
    <View style={styles.container}>
      <NodeCameraView
        style={{flex: 1}}
        ref={vb}
        outputUrl={
          'rtmp://live.mux.com/app/6bb95647-7f4a-1aa2-7500-936b79e42ed0'
        }
        camera={{cameraId: 1, cameraFrontMirror: false}}
        audio={{bitrate: 32000, profile: 1, samplerate: 44100}}
        video={{
          preset: 12,
          bitrate: 400000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        autopreview={true}
      />
      <View style={styles.btnContainer}>
        <View style={styles.flipContainer}>
          <TouchableOpacity
            onPress={() => {
              vb.current.switchCamera();
              setFlashenable(false);
            }}>
            <Image source={FLIP} style={styles.flipIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={flash}>
            <Image source={FLASH} style={styles.flashIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={startLive}>
            {!publish ? (
              <Image source={START} style={styles.startIcon} />
            ) : (
              <Image source={PAUSE} style={styles.startIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={stopLive}>
            <Image source={STOP} style={styles.startIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LiveVideo;
