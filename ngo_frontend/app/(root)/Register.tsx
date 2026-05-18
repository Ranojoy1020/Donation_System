import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';

export default function UserRegistrationScreen() {
  const [step, setStep] = useState(1);
  const [Name, setName] = useState('');
  const [regId, setRegId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [url, setUrl] = useState('');
  const [bkName, setBkName] = useState('');
  const [bkAccNo, setAccNo] = useState('');
  const [bkIfsc, setIfsc] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const validateStep1 = () => Name && regId && phoneNumber;
  const validateStep2 = () => email && password && confirmPassword && password === confirmPassword;
  const validateStep3 = () => streetAddress && city && state && country && pincode;
  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
    else if (step === 4) handleRegister();
    else Alert.alert('Error', 'Please complete all fields');
  };
  const handlePrevious = () => setStep(step - 1);

  const handleRegister = async () => {
    const formData = new FormData();
    
    formData.append("ngo_name", Name);
    formData.append("reg_id", regId);
    formData.append("ngo_email", email);
    formData.append("ngo_passwd", password);
    formData.append("ngo_mobile", phoneNumber);
    formData.append("ngo_addr", streetAddress);
    formData.append("ngo_city", city);
    formData.append("ngo_state", state);
    formData.append("ngo_country", country);
    formData.append("ngo_pincode", pincode);
    formData.append("ngo_url", url);
    formData.append("ngo_bank_name", bkName);
    formData.append("ngo_bank_acc_no", bkAccNo);
    formData.append("ngo_bank_ifsc", bkIfsc);
    if (profileImage) {
      formData.append("file", {
        uri: profileImage,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(API_BASE_URL + "ngo/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 201) Alert.alert('Success', 'Registration successful!');
      
    } catch (error : any) {
      Alert.alert('Error', error.response.data);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" translucent={false} />
      <Text style={styles.title}>NGO Registration</Text>

      {step === 1 && (
        <>
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={profileImage ? { uri: profileImage } : require('../../assets/images/icon.png')}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <Text style={styles.uploadText}>Upload Profile Picture</Text>
          <Text style={styles.label}>NGO Name</Text>
          <TextInput style={styles.input} value={Name} onChangeText={setName} placeholder="Enter First Name" />
          <Text style={styles.label}>Registration Number</Text>
          <TextInput style={styles.input} value={regId} onChangeText={setRegId} placeholder="Enter Registration No." />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Enter Phone Number" keyboardType="phone-pad" />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter Email" keyboardType="email-address" />
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter Password" secureTextEntry />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Confirm Password" secureTextEntry />
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Street Address</Text>
          <TextInput style={styles.input} value={streetAddress} onChangeText={setStreetAddress} placeholder="Enter Street Address" multiline />
          <Text style={styles.label}>City</Text>
          <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Enter City" />
          <Text style={styles.label}>State</Text>
          <TextInput style={styles.input} value={state} onChangeText={setState} placeholder="Enter State" />
          <Text style={styles.label}>Country</Text>
          <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="Enter Country" />
          <Text style={styles.label}>Pincode</Text>
          <TextInput style={styles.input} value={pincode} onChangeText={setPincode} placeholder="Enter Pincode" keyboardType="number-pad" />
        </>
      )}
      
      {step === 4 && (
        <>
          <Text style={styles.label}>NGO Web URL</Text>
          <TextInput style={styles.input} value={url} onChangeText={setUrl} placeholder="Enter Street Address" multiline />
          <Text style={styles.label}>Bank Name</Text>
          <TextInput style={styles.input} value={bkName} onChangeText={setBkName} placeholder="Enter City" />
          <Text style={styles.label}>Account Number</Text>
          <TextInput style={styles.input} value={bkAccNo} onChangeText={setAccNo} placeholder="Enter State" />
          <Text style={styles.label}>IFSC</Text>
          <TextInput style={styles.input} value={bkIfsc} onChangeText={setIfsc} placeholder="Enter Country" />
        </>
      )}

      <View style={styles.buttonContainer}>
        {step > 1 && <Button title="Previous" onPress={handlePrevious} />}
        <Button title={step === 4 ? "Register" : "Next"} onPress={handleNext} />
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
