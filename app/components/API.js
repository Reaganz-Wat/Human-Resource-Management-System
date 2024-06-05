const IP_ADDRESS = "10.160.1.10";

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
    leaveRequestcruds: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/leaveRequestCRUDS.php`,
    markAttendancecruds: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/attendanceCRUDS.php`,
    updateSalary: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/updateSalary.php`,
    JobsCRUDS: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/jobsCRUDS.php`,
    createJobs: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/createJobs.php`,
    get_user_by_id: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/get_user_by_id.php`,
    edit_employee: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/edit_employees.php`,
    get_employee_attendance: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/get_attendance.php`,
    update_employee_leave: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/update_employee_attendance.php`,
    get_accepted_leaves: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/get_accepted_leave.php`,
    get_employee_leaves_by_id: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/get_leave_by_id.php`,
    create_employee_leaves: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/create_employee_leave.php`,
    create_benefit: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/create_benefit.php`,
    create_salary: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/insertSalary.php`,
    get_emp_sal: `http://${IP_ADDRESS}WEB APPLICATIONS/human resource system/ADMINCRUDS/get_employeeSal.php`,
    benefits_endpoint: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/getBenefits.php`,
    edit_benefit: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/ADMINCRUDS/edit_benefit.php`,
    employee_benefit_application: `http://${IP_ADDRESS}/WEB APPLICATIONS/human resource system/EMPLOYEECRUDS/application_benefits.php`
};
export default MyAPI;