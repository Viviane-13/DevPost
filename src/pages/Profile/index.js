import React, { useContext, useState } from 'react';

import { View, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import { Header } from '../../components/Header';
import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
} from './styles';

export function Profile() {
  const { signOut, user } = useContext(AuthContext);

  const [name, setName] = useState(user?.nome);
  const [url, setUrl] = useState(null);

  async function handleSignOut() {
    await signOut();
  }
  return (
    <Container>
      <Header />
      {url ? (
        <UploadButton onPress={() => alert('Clicou 1')}>
          <UploadText>+</UploadText>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => alert('Clicou 2')}>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>
      <Button bg="#428cfd">
        <ButtonText color="#fff">Atualizar Perfil</ButtonText>
      </Button>
      <Button bg="#ddd" onPress={handleSignOut}>
        <ButtonText color="#353840">Sair</ButtonText>
      </Button>
    </Container>
  );
}
