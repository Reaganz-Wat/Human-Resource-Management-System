import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';
import GetStartedScreen from './app/screens/GetStartedScreen';
import OnboardingScreen from './app/screens/OnboardingScreen';
import AdminDashboard from './app/screens/AdminDashboard';
import DrawerNavigation from './app/screens/DrawerNavigation';
import Departments from './app/screens/AdminComponents/Departments';
import Employee from './app/screens/AdminComponents/Employee';
import Users from './app/screens/AdminComponents/Users';
import Managers from './app/screens/AdminComponents/Managers';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
        <Stack.Screen name='GetStartedScreen' component={GetStartedScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        {/* <Stack.Screen name='AdminDashboard' component={AdminDashboard}/> */}
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation}/>
        <Stack.Screen name='AdminDepartments' component={Departments} options={{headerShown: true, title: 'Departments'}}/>
        <Stack.Screen name='Employee' component={Employee}/>
        <Stack.Screen name='Users' component={Users} options={{headerShown: true, title: "All Users"}}/>
        <Stack.Screen name='AdminManager' component={Managers} options={{headerShown: true, title: "Managers"}}/>
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