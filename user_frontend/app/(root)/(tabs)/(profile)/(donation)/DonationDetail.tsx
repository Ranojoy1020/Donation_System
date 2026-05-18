import React from "react";
import { View, Text, Button, StyleSheet, Alert, Image } from "react-native";
import axios from "axios";
import { API_BASE_URL } from "@/constants/Network";
import BackButton from "@/components/BackButton";

export default function DonationDetail({ route , navigation }) {
  const { donation } = route.params;

  return (
    <View style={styles.container}>
      <BackButton onPress={() => navigation.goBack()}/>
      <View style={styles.card}>
      <Text style={styles.title}>{donation.donation_type}</Text>
      <Text style={styles.text}>NGO: {donation.ngo_id}</Text>
      
      {donation.amount ? (
        <Text style={styles.text}>Amount: ${donation.amount}</Text>
      ) : (
        <>
        <Text style={styles.text}>Donated Item:</Text>
        <Image
          source={{ uri: API_BASE_URL + "donations/" + donation.item_img_path }}
          style={styles.donation_img}
          resizeMode="contain"
        />
        </>
      )}

      <Text style={styles.text}>Your Message: {donation.donor_msg}</Text>

      <View>
      <Text style={styles.text}>Preffered Collection Date-Time: </Text>
      <Text style={styles.text}> {donation.collection_schedule}</Text>
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
  },

  card : {
    backgroundColor: "#ddd",
    padding: 10,
    height:'90%',
    width: '95%',
    borderRadius:10,
    justifyContent:'space-around'
  },
  
  title: { 
    fontSize: 24, 
    fontWeight: "bold",
  },

  text: {
    fontSize: 18,
  },

  donation_img: {
    width: "100%",
    height: "50%",
    borderRadius: 5,
  },
});
