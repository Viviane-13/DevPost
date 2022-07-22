import React, { useState } from 'react';

import { View, Text } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { Container, AreaInput, Input, List } from './styles';

export function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#E52246" />
        <Input
          placeholder="Procurando alguém? "
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="#353840"
        />
      </AreaInput>
    </Container>
  );
}
