import React from "react";
import { Modal, View, StyleSheet } from "react-native";

/*This is a custom modal that takes three parameters
visible ( variable returning true or false )-- for showing the modal
onClose -- function to change the variable for the visible to false
contentComponent -- function to return the content you want to render in the modal
*/

const CustomModal = ({ visible, onClose, contentComponent }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContentContainer}>
          {contentComponent && contentComponent({ onClose })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
  });

export default CustomModal;