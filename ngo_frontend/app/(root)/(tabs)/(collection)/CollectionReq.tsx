import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "@/constants/Network";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CollectionReq({}) {
  const navigation = useNavigation();
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // Fetch pending donation requests
    axios
      .get(`${API_BASE_URL}ngo/ngo_getPendingDonation/`)
      .then((response) => setDonations(response.data))
      .catch((error) =>
        console.log("Error fetching donations:", error.response)
      );
  }, []);

  const renderDonationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("DonationDetail", { donation: item })}
      style={styles.neumorphicCard}
    >
      <View style={styles.donationContent}>
        <Text style={styles.donationTitle}>{item.title}</Text>
        <Text>Donation Type: {item.donation_type}</Text>
        <Text>Donor: {item.user_id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <Text style={styles.headerText}>Collection Requests</Text>
      {
        donations.length > 0 
        ? 
        (
          <FlatList
          data={donations}
          renderItem={renderDonationItem}
          keyExtractor={(item) => item._id}
          />
        )
        :
        (
          <Text style={styles.noDonationsText}>
            No collection requests available
          </Text>
        )
      }
      
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    donationContent: {
      flex:1,
      padding: 10,
      justifyContent: 'center'
    },
    donationTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    neumorphicCard: {
      marginHorizontal: 5,
      marginVertical: 10,
      borderRadius: 10,
      backgroundColor: "#f5f5f5",
      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    // noDonationsText: {
    //   marginTop: 20,
    //   fontSize: 18,
    //   textAlign: "center",
    // },
  });
