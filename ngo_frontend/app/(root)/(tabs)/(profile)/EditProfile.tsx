import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "@/constants/Network";

export default function EditNGOProfile({ route, navigation }) {
  const { ngoDetails } = route.params;

  const [formData, setFormData] = useState({
    reg_id: ngoDetails.reg_id,
    ngo_name: ngoDetails.ngo_name,
    ngo_email: ngoDetails.ngo_email,
    ngo_address: ngoDetails.ngo_address,
    ngo_city: ngoDetails.ngo_city,
    ngo_state: ngoDetails.ngo_state,
    ngo_country: ngoDetails.ngo_country,
    ngo_mobile: ngoDetails.ngo_mobile,
    ngo_web_url: ngoDetails.ngo_web_url,
    ngo_bk_name: ngoDetails.ngo_bk_name,
    ngo_bk_accNo: ngoDetails.ngo_bk_accNo,
    ngo_bk_ifsc: ngoDetails.ngo_bk_ifsc,
    ngo_logo: ngoDetails.ngo_logo,
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Update NGO profile
    axios
      .patch(`${API_BASE_URL}ngo/updateProfile/${ngoDetails._id}`, formData)
      .then(() => {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      })
      .catch((error) =>
        Alert.alert("Error", "Failed to update profile. Please try again.")
      );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Edit NGO Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Registration ID"
        value={String(formData.reg_id)}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.ngo_name}
        onChangeText={(value) => handleInputChange("ngo_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.ngo_email}
        keyboardType="email-address"
        onChangeText={(value) => handleInputChange("ngo_email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={formData.ngo_address}
        onChangeText={(value) => handleInputChange("ngo_address", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.ngo_city}
        onChangeText={(value) => handleInputChange("ngo_city", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={formData.ngo_state}
        onChangeText={(value) => handleInputChange("ngo_state", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={formData.ngo_country}
        onChangeText={(value) => handleInputChange("ngo_country", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={String(formData.ngo_mobile)}
        keyboardType="phone-pad"
        onChangeText={(value) => handleInputChange("ngo_mobile", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Website URL"
        value={formData.ngo_web_url}
        onChangeText={(value) => handleInputChange("ngo_web_url", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={formData.ngo_bk_name}
        onChangeText={(value) => handleInputChange("ngo_bk_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank Account Number"
        value={formData.ngo_bk_accNo}
        onChangeText={(value) => handleInputChange("ngo_bk_accNo", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Bank IFSC Code"
        value={formData.ngo_bk_ifsc}
        onChangeText={(value) => handleInputChange("ngo_bk_ifsc", value)}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Logo URL"
        value={formData.ngo_logo}
        onChangeText={(value) => handleInputChange("ngo_logo", value)}
      /> */}
      <Button title="Save Changes" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
