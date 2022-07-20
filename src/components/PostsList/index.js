import React, { useState } from 'react';
import {
  Container,
  Header,
  Avatar,
  Name,
  ContentView,
  Content,
  Actions,
  LikeButton,
  Like,
  TimePost,
} from './styles';

import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function PostsList({ data, userId }) {
  const [likePost, setLikePost] = useState(data?.likes);

  async function handleLikePost(id, likes) {
    const docId = `${userId}_${id}`;

    //Checar se post já foi curtido
    const doc = await firestore().collection('likes').doc(docId).get();

    if (doc.exists) {
      //Já curtiu o post, remover o like
      await firestore()
        .collection('posts')
        .doc(id)
        .update({
          likes: likes - 1,
        });
      await firestore()
        .collection('likes')
        .doc(docId)
        .delete()
        .then(() => {
          setLikePost(likes - 1);
        });
      return;
    }
    //Colocar o like no post
    await firestore().collection('likes').doc(docId).set({
      postId: id,
      userId: userId,
    });

    await firestore()
      .collection('posts')
      .doc(id)
      .update({
        likes: likes + 1,
      })
      .then(() => {
        setLikePost(likes + 1);
      });
  }
  function formatTimePost() {
    const datePost = new Date(data.created.seconds * 1000);

    return formatDistance(new Date(), datePost, { locale: ptBR });
  }
  return (
    <Container>
      <Header>
        {data.avatarUrl ? (
          <Avatar source={{ uri: data.avatarUrl }} />
        ) : (
          <Avatar source={require('../../assets/avatar.png')} />
        )}

        <Name numberOfLines={1}>{data?.autor}</Name>
      </Header>
      <ContentView>
        <Content>{data?.content}</Content>
      </ContentView>
      <Actions>
        <LikeButton onPress={() => handleLikePost(data.id, likePost)}>
          <Like>{likePost === 0 ? '' : likePost}</Like>
          <Icon
            name={likePost === 0 ? 'heart-plus-outline' : 'cards-heart'}
            size={20}
            color="#E52246"
          />
        </LikeButton>
        <TimePost>{formatTimePost()}</TimePost>
      </Actions>
    </Container>
  );
}
