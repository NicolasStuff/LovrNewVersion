import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

function Modal {

const [modalVisible, setModalVisible] = useState(false);

  return (

    <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Become Lovable has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <LinearGradient colors={['#FFB199', '#FF164B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.modalText}>Félicitations, vous êtes maintenant LOVABLE durant</Text>

            <TouchableHighlight
              style={styles.openButton1}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle2}>Continuer</Text>
            </TouchableHighlight>
            </LinearGradient>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton2}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle1}>Devenir LOVABLE</Text>
      </TouchableHighlight>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: 300,
    width: 300,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton1: {
    backgroundColor: "#FFFF",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton2: {
    backgroundColor: "#36B547",
    borderRadius: 20,
    padding: 10,
    shadowColor: "#FFFF",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  textStyle1: {
    color: "#FFFF",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle2: {
    color: "#FF164B",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: '#FFFF',
    fontSize: 18,
    marginBottom: 20,
    padding: 10,
    textAlign: "center"
  }
});

export default Modal;