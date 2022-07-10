import React, { useContext } from 'react';

import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';

export function Profile() {
  const { signOut } = useContext(AuthContext);

  async function handleSignOut() {
    await signOut();
  }
  return (
    <View>
      <Text>Tela Profile</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
}
