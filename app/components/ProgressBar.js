import React from "react";
import { View, Modal } from "react-native";
import { Text } from "react-native-paper";
import * as Progress from 'react-native-progress';

function ProgressBar({ modalVisible }) {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              width: "70%",
              backgroundColor: "white",
              padding: 22,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 4,
              borderColor: "rgba(0, 0, 0, 0.1)",
              flexDirection: 'row',
              gap: 10
            }}
          >
            <Progress.CircleSnail color={['red', 'green', 'blue']} duration={600}/>
            <Text style={{ fontSize: 20 }}>Loading...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ProgressBar;
