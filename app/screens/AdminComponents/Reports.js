import React from "react";
import { Dimensions, View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { PieChart, BarChart, ProgressChart } from "react-native-chart-kit";
import * as Animatable from "react-native-animatable";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#F0F8FF", // Light blue
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#BBE6E6", // Light green
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(25, 135, 255, ${opacity})`, // Blue
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const Reports = () => {
  // Total number of employees
  const totalEmployees = 300;

  // Number of employees on leave
  const employeesOnLeave = 50;

  // Number of employees not on leave
  const employeesNotOnLeave = totalEmployees - employeesOnLeave;

  // Data for pie chart representing employee leave status
  const pieData = [
    {
      name: "On Leave",
      population: employeesOnLeave,
      color: "#4CAF50", // Green
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Not on Leave",
      population: employeesNotOnLeave,
      color: "#2196F3", // Blue
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  // Data for progress chart representing total benefits
  const progressData = {
    labels: ["Healthcare", "Retirement", "Vacation", "Education"], // Example benefit categories
    data: [0.6, 0.8, 0.4, 0.5], // Example progress percentages
  };

  // Data for bar chart representing total jobs
  const barData = {
    labels: ["Full-time", "Part-time", "Contract"], // Example job categories
    datasets: [
      {
        data: [100, 50, 30], // Example total number of jobs
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animatable.View animation="fadeInUp" delay={500} style={styles.chartContainer}>
        <Text style={styles.title}>Employee Leave Status</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={styles.chart}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1000} style={styles.chartContainer}>
        <Text style={styles.title}>Total Benefits</Text>
        <ProgressChart
          data={progressData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1500} style={styles.chartContainer}>
        <Text style={styles.title}>Total Jobs</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
        />
      </Animatable.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  chartContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  chart: {
    borderRadius: 10,
  },
});

export default Reports;
