import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';
import GetStartedScreen from './app/screens/GetStartedScreen';
import OnboardingScreen from './app/screens/OnboardingScreen';
import DrawerNavigation from './app/screens/DrawerNavigation';
import Departments from './app/screens/AdminComponents/Departments';
import Employee from './app/screens/AdminComponents/Employee';
import Users from './app/screens/AdminComponents/Users';
import Managers from './app/screens/AdminComponents/Managers';
import Salary from './app/screens/Salary';
import Attendance from './app/screens/AdminComponents/Attendance';
import MarkAttendance from './app/screens/AdminComponents/MarkAttendance';
import SalaryDetailPage from './app/screens/AdminComponents/SalaryDetailedPage';
import Jobs from './app/screens/AdminComponents/Jobs';
import EmployeeDashboard from './app/screens/EmployeeComponents/EmployeeDashboard';
import EmpProfile from './app/screens/EmployeeComponents/EmpProfile';
import EmpAttendance from './app/screens/EmployeeComponents/EmpAttendance';
import EmpSalary from './app/screens/EmployeeComponents/EmpSalary';
import ManagerDashboard from './app/screens/ManagerComponents/ManagerDashboard';
import EmpLeaveRequest from './app/screens/EmployeeComponents/EmpLeaveRequest';
import EmpPerformanceReview from './app/screens/EmployeeComponents/EmpPerformanceReview';
import Leaves from './app/screens/AdminComponents/Leaves';
import Reports from './app/screens/AdminComponents/Reports';
import EmployeeBenefits from './app/screens/EmployeeComponents/EmployeeBenefits';
import AdminEmployeeBenefits from './app/screens/AdminComponents/AdminEmployeeBenefits';
import AddSalary from './app/screens/AdminComponents/AddSalary';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='EmployeeBenefits'>
        <Stack.Screen name='OnboardingScreen' component={OnboardingScreen}/>
        <Stack.Screen name='GetStartedScreen' component={GetStartedScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation}/>
        <Stack.Screen name='AdminDepartments' component={Departments} options={{headerShown: true, title: 'Departments'}}/>
        <Stack.Screen name='Employee' component={Employee}/>
        <Stack.Screen name='Users' component={Users} options={{headerShown: true, title: "All Users"}}/>
        <Stack.Screen name='AdminManager' component={Managers} options={{headerShown: true, title: "Managers"}}/>
        <Stack.Screen name='SalaryScreen' component={Salary} options={{headerShown: true, title: "Salary details"}}/>
        <Stack.Screen name='AttendanceScreen' component={Attendance} options={{headerShown: true, title: "Mark Attendance"}}/>
        <Stack.Screen name='MarkAttendanceScreen' component={MarkAttendance} options={{headerShown: true}} />
        <Stack.Screen name='SalaryDetailScreen' component={SalaryDetailPage} options={{headerShown: true}} />
        <Stack.Screen name='JobScreen' component={Jobs} options={{headerShown: true, title: "Jobs"}}/>
        <Stack.Screen name='EmployeeDashboardScreen' component={EmployeeDashboard} />
        <Stack.Screen name='EmployeeProfile' component={EmpProfile} />
        <Stack.Screen name='EmployeeAttendance' component={EmpAttendance} options={{headerShown: true, title: "Attendance"}} />
        <Stack.Screen name='EmployeeSalaryScreen' component={EmpSalary} options={{headerShown: true, title: "Salary Details"}} />
        <Stack.Screen name='ManagerDashboardScreen' component={ManagerDashboard} />
        <Stack.Screen name='LeaveRequestsScreen' component={EmpLeaveRequest} options={{headerShown: true, title: "Request Leave"}} />
        <Stack.Screen name='EmployeePerformanceScreen' component={EmpPerformanceReview} />
        <Stack.Screen name='ReportScreen' component={Reports} options={{headerShown: true, title: "Reports"}}/>
        <Stack.Screen name='EmployeeBenefits' component={EmployeeBenefits} options={{headerShown: true, title: "Benefit Programs"}}/>
        <Stack.Screen name='AdminEmployeeBenefits' component={AdminEmployeeBenefits} options={{headerShown: true, title: "Employee Benefits Programs"}} />
        <Stack.Screen name='AddSalaryScreen' component={AddSalary} options={{headerShown: true, title: "Add Salary"}}/>
        <Stack.Screen name='Leaves' component={Leaves} />
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