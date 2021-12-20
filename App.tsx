import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={require('./images/avatar.jpeg')} />
        <Text style={styles.headerText}>Hi, Phubordin</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentHeader}>Todo</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F05454',
  },
  header: {
    flex: 0.25,
    justifyContent: 'flex-end',
    paddingLeft: 20,
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
  },
  content: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 0.75,
  },
  contentHeader: {
    fontSize: 18,
    marginLeft: 40,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#30475E',
  }
});
