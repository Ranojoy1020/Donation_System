import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { API_BASE_URL } from "@/constants/Network";
import { states_cities } from "@/constants/States_Cities";
import {useRouter} from 'expo-router'
import RNPickerSelect from 'react-native-picker-select';



export default function UserRegistrationScreen() {

  const router = useRouter()

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [profileImage, setProfileImage] = useState(null);


  const countryOptions = [
    // { label: 'United States', value: 'United States' },
    // { label: 'Canada', value: 'Canada' },
    { label: 'India', value: 'India' },
];

  const stateOptions = Object.keys(states_cities)

  const cityOptions = state ? states_cities[state] : []


  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const validateStep1 = () => firstName.trim() && lastName.trim() && phoneNumber.trim();
  const validateStep2 = () =>
    email.trim() && password.trim() && confirmPassword.trim() && password.trim() === confirmPassword.trim();
  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3) handleRegister();
    else Alert.alert("Error", "Please complete all fields");
  };
  const handlePrevious = () => setStep(step - 1);

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("user_fname", firstName.trim());
    formData.append("user_lname", lastName.trim());
    formData.append("user_email", email.trim());
    formData.append("user_mobile", phoneNumber.trim());
    formData.append("user_passwd", password.trim());
    formData.append("user_addr", streetAddress.trim());
    formData.append("user_city", city.trim());
    formData.append("user_state", state.trim());
    formData.append("user_country", country.trim());
    formData.append("user_pincode", pincode.trim());
    if (profileImage) {
      formData.append("file", {
        uri: profileImage,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(
        API_BASE_URL + "user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success)
        Alert.alert("Success", "Registration successful!");
        router.push('./Login');
    } catch (error : any) {
      Alert.alert("Error", JSON.stringify(error.response.data.message));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Text style={styles.title}>User Registration</Text>

      {step === 1 && (
        <>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/images/user.png")
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.uploadText}>Upload Profile Picture</Text>

          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter First Name"
          />
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter Last Name"
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter Password"
            secureTextEntry
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            secureTextEntry
          />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={streetAddress}
            onChangeText={setStreetAddress}
            placeholder="Enter Street Address"
            multiline
          />
          
          {/* Country Dropdown */}
          <Text style={styles.label}>Country</Text>
          <RNPickerSelect
            onValueChange={(value) => setCountry(value)}
            items={countryOptions}
            placeholder={{ label: 'Select a country', value: null }}
            style={{ inputAndroid: styles.input, inputIOS: styles.input }}
            value={country}
          />

          {/* State Dropdown */}
          <Text style={styles.label}>State</Text>
          <RNPickerSelect
            onValueChange={(value) => setState(value)}
            items={stateOptions.map((state) => ({ label: state, value: state }))}
            placeholder={{ label: 'Select a state', value: null }}
            style={{ inputAndroid: styles.input, inputIOS: styles.input }}
            value={state}
          />

          {/* City Dropdown */}
          <Text style={styles.label}>City</Text>
          <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            items={cityOptions.map((state : any) => ({ label: state, value: state }))}
            placeholder={{ label: 'Select a city', value: null }}
            style={{ inputAndroid: styles.input, inputIOS: styles.input }}
            value={city}
          />
          <Text style={styles.label}>Pincode</Text>
          <TextInput
            style={styles.input}
            value={pincode}
            onChangeText={setPincode}
            placeholder="Enter Pincode"
            keyboardType="number-pad"
          />
        </>
      )}

      <View style={styles.buttonContainer}>
        {step > 1 && <Button title="Previous" onPress={handlePrevious} />}
        <Button title={step === 3 ? "Register" : "Next"} onPress={handleNext} />
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  uploadText: { textAlign: "center", color: "#888", marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
