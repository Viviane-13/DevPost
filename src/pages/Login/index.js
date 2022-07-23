import React, { useState, useContext } from 'react';

import { View, Text, ActivityIndicator } from 'react-native';

import * as Animatable from 'react-native-animatable';
const TitleAnimated = Animatable.createAnimatableComponent(Title);

import { AuthContext } from '../../contexts/auth';

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
  const { signUp, signIn, loadingAuth } = useContext(AuthContext);
  const [login, setLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function toggleLogin() {
    setLogin(!login);
    setName('');
    //setLogin('');
    setPassword('');
    setEmail('');
  }

  async function handleSignIn() {
    if (email === '' || password === '') {
      console.log('Preencha todos os campos');
      return;
    }
    await signIn(email, password);
  }

  async function handleSignUp() {
    if (email === '' || password === '' || name === '') {
      console.log('Preencha todos os campos para cadastrar');
      return;
    }
    await signUp(email, password, name);
  }

  if (login) {
    return (
      <Container>
        <TitleAnimated animation="flipInY">
          Dev<Text style={{ color: '#e52246' }}>Post</Text>
        </TitleAnimated>

        <Input
          placeholder="seuemail@teste.com"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="******"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <Button onPress={handleSignIn}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#FFF" />
          ) : (
            <ButtonText>Acessar</ButtonText>
          )}
        </Button>
        <SignUpButton onPress={toggleLogin}>
          <SignUpText>Criar uma conta</SignUpText>
        </SignUpButton>
      </Container>
    );
  }
  return (
    <Container>
      <TitleAnimated animation="flipInX">
        Dev<Text style={{ color: '#e52246' }}>Post</Text>
      </TitleAnimated>
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
        secureTextEntry={true}
      />
      <Button onPress={handleSignUp}>
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#FFF" />
        ) : (
          <ButtonText>Cadastrar</ButtonText>
        )}
      </Button>
      <SignUpButton onPress={toggleLogin}>
        <SignUpText>Já tenho uma conta</SignUpText>
      </SignUpButton>
    </Container>
  );
}
