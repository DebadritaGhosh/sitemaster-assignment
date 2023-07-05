//import liraries
import React from 'react';
import {StatusBar, Platform, StyleSheet, SafeAreaView} from 'react-native';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = ({backgroundColor, barStyle, ...props}) => (
  <SafeAreaView style={Platform.OS === 'ios' && [{backgroundColor}]}>
    <StatusBar
      translucent={false}
      backgroundColor={backgroundColor}
      barStyle={barStyle}
      hidden={false}
    />
  </SafeAreaView>
);

export default MyStatusBar;