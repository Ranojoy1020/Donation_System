import React from "react";
import { View, Text, Button, StyleSheet, Alert, Image, StatusBar } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "@/constants/Network";
import CustomButton from "@/components/CustomButton";

export default function DonationDetail({ route, navigation }) {
  const { donation } = route.params;

  const handleAcceptDonation = () => {
    axios
      .patch(`${API_BASE_URL}ngo/acceptRequest?field=${donation._id}&value=Scheduled`)
      .then(() => {
        Alert.alert("Success", "Donation request accepted.");
        navigation.goBack();
      })
      .catch((error) => Alert.alert("Error", "Unable to accept the donation."));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} /> 
      
      <Text style={styles.title}>Donated Item</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Donor: {donation.user_id}</Text>

        {donation.amount ? (
          <Text style={styles.text}>Amount: ${donation.amount}</Text>
        ) : (
          <>
            <Text style={styles.text}>Donated Item:</Text>
            <Image
              source={{ uri: API_BASE_URL + "donations/" + donation.item_img_path }}
              style={styles.donationImage}
              resizeMode="contain"
            />
          </>
        )}

        <Text style={styles.text}>Donor Message: {donation.donor_msg}</Text>
        <Text style={styles.text}>Preferred Collection Date-Time:</Text>
        <Text style={styles.text}>{donation.collection_schedule}</Text>

        <View style={styles.buttonContainer}>
          <CustomButton button_text="Accept Donation" onPress={handleAcceptDonation} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  donationImage: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
