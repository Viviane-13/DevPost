import React, { useState } from 'react';

import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

import { Container, ButtonPost, ListPosts } from './styles';
import { Header } from '../../components/Header';

export function Home() {
  const navigation = useNavigation();

  const [posts, setPosts] = useState([
    { id: 1, content: 'Teste123' },
    { id: 2, content: 'Segundo Post' },
    { id: 3, content: 'Terceiro Post' },
  ]);

  return (
    <Container>
      <Header />

      <ListPosts data={posts} renderItem={({ item }) => <Text>Teste</Text>} />

      <ButtonPost
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NewPost')}
      >
        <Feather name="edit-2" color="#FFF" size={25} />
      </ButtonPost>
    </Container>
  );
}
