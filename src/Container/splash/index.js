import React, {useEffect} from 'react';
import {View, Image} from 'react-native';

const Splash = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Dashboard');
    }, 1500);
  }, []);

  return (
    <View style={{flex: 1, width: '100%', height: '100%'}}>
      <Image
        source={require('./../../../assests/live.gif')}
        style={{flex: 1, resizeMode: 'stretch'}}
      />
    </View>
  );
};

export default Splash;
