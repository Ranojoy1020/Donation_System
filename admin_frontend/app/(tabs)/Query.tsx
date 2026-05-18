import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '@/constants/Network';
import CustomButton from '@/components/CustomButton';

export default function AdminQuery() {
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}admin/openQueries`);
      setQueries(response.data);
      
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch queries.');
    }
  };

  const handleResponseSubmit = async () => {
    if (!response) {
      Alert.alert('Error', 'Response cannot be empty!');
      return;
    }

    try {
      const res = await axios.put(`${API_BASE_URL}admin/answerQuery`, {
        query_id : selectedQuery._id,
        answer : response,
      });
      if (res.status == 200) {
        Alert.alert('Success', 'Response sent successfully!');
        setResponse('');
        setSelectedQuery(null);
        fetchQueries();
      }
      
    } catch (error) {
      Alert.alert('Error', 'Failed to send the response.');
    }
  };

  const renderQueryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedQuery(item)} style={styles.queryItem}>
      <Text style={styles.queryTitle}>{item._id}</Text>
      <Text style={styles.queryPreview}>{item.query_msg}...</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!selectedQuery ? (
        <>
          <Text style={styles.title}>Donor Queries</Text>
          <FlatList
            data={queries}
            renderItem={renderQueryItem}
            keyExtractor={(item) => item._id}
          />
        </>
      ) : (
        <View>
          <Text style={styles.title}>Query Details</Text>
          <Text style={styles.detailText}>User Id: {selectedQuery.user_id}</Text>
          <Text style={styles.detailText}>Message: {selectedQuery.query_msg}</Text>

          <TextInput
            style={styles.input}
            placeholder="Write your response here..."
            value={response}
            onChangeText={setResponse}
            multiline
          />
          <CustomButton button_text="Send Response" onPress={handleResponseSubmit} />
          <CustomButton button_text="Back to Queries" onPress={() => setSelectedQuery(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  queryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  queryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  queryPreview: {
    fontSize: 14,
    color: '#555',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
});
