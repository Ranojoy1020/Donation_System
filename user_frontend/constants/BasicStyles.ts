import { StyleSheet } from "react-native";

export const baseStyles = StyleSheet.create({
  base_container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header_text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  base_text: {
    fontSize: 18,
    color: "#333",
  },
  base_input_label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  base_input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
