const IP_ADDRESS = "192.168.219.83";

const MyAPI = {
    registerUser: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/registerUser.php`,
    readDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/readDepartment.php`,
    editDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/editDepartment.php`,
    createDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/createDepartment.php`,
    deleteDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/deleteDepartment.php`,
    loginUser: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/login.php`,
    fetchUsers: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/fetchUsers.php`,
    fetchManagers: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/fetchManagers.php`,
    fetchSalary: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/fetchSalary.php`,
    fetchEmployees: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/fetchEmployees.php`,
    leaveRequestcruds: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/leaveRequestCRUDS.php`
};
export default MyAPI;