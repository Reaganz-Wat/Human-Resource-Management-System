import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';
import GetStartedScreen from './app/screens/GetStartedScreen';
import OnboardingScreen from './app/screens/OnboardingScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
        <Stack.Screen name='GetStartedScreen' component={GetStartedScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
