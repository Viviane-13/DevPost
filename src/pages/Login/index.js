import React, { useState } from 'react';

import { View, Text } from 'react-native';

import {
  Container,
  Title,
  Input,
  Button,
  ButtonText,
  SignUpButton,
  SignUpText,
} from './styles';

export function Login() {
  const [login, setLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setName('');
    setLogin('');
    setPassword('');
  }

  function handleSignIn() {
    if (email === '' || password === '') {
      console.log('Preencha todos os campos');
      return;
    }
  }

  function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      console.log('Preencha todos os campos para cadastrar');
      return;
    }
    alert('Cadastrar');
  }

  if (login) {
    return (
      <Container>
        <Title>
          Dev<Text style={{ color: '#e52246' }}>Post</Text>
        </Title>

        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="******"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button onPress={handleSignIn}>
          <ButtonText>Acessar</ButtonText>
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }
  return (
    <Container>
      <Title>
        Dev<Text style={{ color: '#e52246' }}>Post</Text>
      </Title>
      <Input
        placeholder="Seu nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder="seuemail@teste.com"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="******"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleSignUp}>
        <ButtonText>Cadastrar</ButtonText>
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}
