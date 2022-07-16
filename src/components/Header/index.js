import React from 'react';

import { View, Text } from 'react-native';
import { Container, Title } from './styles';

export function Header() {
  return (
    <Container>
      <Title>
        Dev
        <Text style={{ fontStyle: 'italic', color: '#E52246' }}>Post</Text>
      </Title>
    </Container>
  );
}