import { useRouter } from 'expo-router'
import {StyleSheet, View, Text, ImageBackground, Dimensions, StatusBar, Touchable, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function App() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      
      <SafeAreaView>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 
        
        <ImageBackground source={require('../assets/images/icon.png')} style={styles.img}>

          <View>
           <Text style={styles.titleText}>Helping Hands</Text>
          <Text style={styles.titleText}>Donation App</Text> 
          </View>
          
        
          <TouchableOpacity style={styles.button} onPress={() => router.push("./Register")}>
              <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        
        </ImageBackground>

      </SafeAreaView>
    </View>
  )
}

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    alignItems: 'center',
    justifyContent: 'space-around',
    },
    img:{
      height: height,
      width: width,
      resizeMode: 'cover',
    },
    titleText : {
      fontSize: 40,
      color:'#fff'
    },
    button: {
      width: 0.8 * width,
      backgroundColor: '#841584',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      position:'absolute',
      bottom:40,
      left: 40
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      },

})