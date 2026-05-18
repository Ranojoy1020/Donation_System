import { useRoute } from '@react-navigation/native';
import { View, Text } from 'react-native';

export default function ResetPasswordScreen() {
  const route = useRoute();
  const { token } = route.params || {};

  return (
    <View>
      <Text>Reset Password</Text>
      <Text>Your token: {token}</Text>
      {/* Add password reset form */}
    </View>
  );
}
