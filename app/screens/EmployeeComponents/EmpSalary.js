import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmpSalary = () => {
    // Sample salary data
    const salaryData = [
        {
            salary_id: 1,
            employee_id: 1,
            salary_amount: 205000.00,
            start_date: '2024-03-31 06:11:37',
            end_date: null,
            status: null,
            created: '2024-03-31 06:11:37',
            created_by: 4,
            modified: '2024-03-31 15:55:01',
            modified_by: 1,
        },
        {
            salary_id: 3,
            employee_id: 9,
            salary_amount: 500000.00,
            start_date: '2024-04-30 12:25:53',
            end_date: '2024-04-10',
            status: null,
            created: '2024-04-30 12:25:53',
            created_by: 1,
            modified: '2024-05-04 11:24:00',
            modified_by: 1,
        },
    ];

    // Function to format salary amount
    const formatSalaryAmount = (amount) => {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    return (
        <View style={styles.container}>
            {salaryData.map((salary) => (
                <View key={salary.salary_id} style={styles.salaryItem}>
                    <Text style={styles.label}>Salary Amount:</Text>
                    <Text style={styles.value}>{formatSalaryAmount(salary.salary_amount)}</Text>
                    <Text style={styles.label}>Start Date:</Text>
                    <Text style={styles.value}>{salary.start_date}</Text>
                    <Text style={styles.label}>End Date:</Text>
                    <Text style={styles.value}>{salary.end_date || 'N/A'}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
        padding: 20,
    },
    salaryItem: {
        backgroundColor: '#FFF',
        padding: 15,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 5,
    },
    label: {
        fontSize: 16,
        color: '#696969',
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default EmpSalary;