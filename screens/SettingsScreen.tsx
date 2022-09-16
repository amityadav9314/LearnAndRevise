import {Platform, StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';
import {RootTabScreenProps} from "../types";
import EditScreenInfo from "../components/EditScreenInfo";
import {StatusBar} from "expo-status-bar";

export default function Settingscreen({navigation}: RootTabScreenProps<'TabFive'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage your settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/SettingsScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
    marginLeft: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
