const IP_ADDRESS = "10.160.1.248";

const MyAPI = {
    registerUser: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/registerUser.php`,
    readDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/readDepartment.php`,
    editDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/editDepartment.php`,
    createDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/createDepartment.php`,
    deleteDepartment: `http://${IP_ADDRESS}/WEB%20APPLICATIONS/human%20resource%20system/ADMINCRUDS/deleteDepartment.php`,
};
export default MyAPI;