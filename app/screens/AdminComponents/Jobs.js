import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import MyAPI from "../../components/API";
import axios from "axios";
import CustomModal from "../../components/CustomModal";
import CustomCard from "../../components/CustomCard";
import FloatingButton from "../../components/FloatingButton";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [jobID, setJobID] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [salaryRange, setSalaryRange] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [crudStatus, setCrudStatus] = useState(null);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const response = await fetch(MyAPI.JobsCRUDS);
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = () => {
    // Handle edit action
    // You can implement your edit logic here
    // For example, you can send a PUT request to update the job details
    console.log("Editing job:", selectedJob);
    // Close the modal
    setModalVisible(false);
  };

  const sendintDataToDatabase = async () => {
    try {
      const response = axios.post(MyAPI.JobsCRUDS, {
        editMode: true,
        id: jobID,
        title: editTitle,
        description: editDescription,
        modified_by: 1,
      });
      console.log("Response: ", (await response).data);
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const createJobsInDatabase = async () => {
    // console.log("Title: ", editTitle);
    // console.log("Description: ", editDescription);
    // console.log("Salary Range: ", salaryRange);


    try {
      const response = await axios.post(MyAPI.createJobs, {
        title: editTitle,
        description: editDescription,
        salary_range: salaryRange,
      });
      const response_data = await response.data;
      console.log("Create Jobs Response: ", response_data);
    } catch (err) {
      console.error(err);
    }


    setCrudStatus("");
    setRefresh(!refresh);
    
  };

  const deleteDataToDatabase = async () => {
    try {
      const response = await axios.post(MyAPI.JobsCRUDS, {
        deleteMode: true,
        id: jobID,
      });
      console.log("Response: ", (await response).data);
      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to render the CustomCard and the CustomContent
  const renderJobs = () => {
    return jobs.map((job) => (
      // Custom Card
      <CustomCard
        key={job.job_id}
        onPress={() => {
          setSelectedJob(job);
          setEditTitle(job.title);
          setEditDescription(job.description);
          setModalVisible(true);
          setJobID(job.job_id);
        }}
        cardContent={customCardContent}
        job={job}
      />
    ));
  };

  // Custom content for the CustomCard
  const customCardContent = ({ job }) => (
    <View>
      <Text style={styles.title}>Title</Text>
      <Text style={styles.description}>{job.title}</Text>
      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>{job.description}</Text>
    </View>
  );

  // Custom modal content for the CustomModal
  const customModalContent = () => (

    // Renders thes components based on some conditions
    <View>
      <TextInput
        style={styles.input}
        value={crudStatus == "create" ? null : editTitle}
        onChangeText={(text) => setEditTitle(text)}
        placeholder="Title"
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={crudStatus == "create" ? null : editDescription}
        onChangeText={(text) => setEditDescription(text)}
        placeholder="Description"
        multiline
      />

      {/* Shows when only creating a new job */}
      {crudStatus == "create" ? (
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={crudStatus == "create" ? null : editDescription}
          onChangeText={(text) => setSalaryRange(text)}
          placeholder="Salary range e.g 300000 - 450000"
          multiline
        />
      ) : null}
      
      {/* All these components only shows when creating the jobs, using conditionals */}
      {/* Edit Button */}
      {crudStatus == "create" ? null : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={() => {
            handleEdit();
            sendintDataToDatabase();
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}

      {/* Delete Button */}
      {crudStatus == "create" ? null : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => {
            setModalVisible(false);
            deleteDataToDatabase();
          }}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      )}

      {/* Delete Button */}
      {crudStatus == "create" ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "green" }]}
          onPress={() => {
            setModalVisible(false);
            createJobsInDatabase();
          }}
        >
          <Text style={styles.buttonText}>Create Jobs Detail</Text>
        </TouchableOpacity>
      ) : null}

      {/* Cancel button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(false)
          setCrudStatus("");
        }}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  // Custom modal content for the addJobs
  const addJobsModalContent = () => (
    <View>
      <TextInput placeholder="Enter title" />
      <TextInput placeholder="Descriptions" />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* MAIN CONTENT */}
      <ScrollView>{renderJobs()}</ScrollView>

      {/* Here is the CustomModal */}
      {
        <CustomModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(!modalVisible);
          }}
          contentComponent={customModalContent}
        />
      }

      <FloatingButton
        onPress={() => {
          setCrudStatus("create");
          setModalVisible(!modalVisible);
        }}
      />

      {/* Modal triggered by the floating button to add jobs */}
      {/* {
        <CustomModal
          visible={modalVisible}
          onClose={() => {
            setModalVisible(!modalVisible)
          }}
          contentComponent={addJobsModalContent}
        />
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#537791",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Jobs;
