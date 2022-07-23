import React, { useContext, useState, useEffect } from 'react';

import { View, Text, Modal, Platform } from 'react-native';
import { AuthContext } from '../../contexts/auth';

import { Header } from '../../components/Header';

import Feather from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {
  Container,
  Name,
  Email,
  Button,
  ButtonText,
  UploadButton,
  UploadText,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input,
} from './styles';

export function Profile() {
  const { signOut, user, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.nome);
  const [url, setUrl] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadAvatar() {
      try {
        let response = await storage()
          .ref('users')
          .child(user?.uid)
          .getDownloadURL();
        setUrl(response);
      } catch (error) {
        console.log('Não encontramos nenhuma foto');
      }
    }
    loadAvatar();
    return () => loadAvatar();
  }, []);

  async function handleSignOut() {
    await signOut();
  }
  //Atualizar o perfil
  async function updateProfile() {
    if (name === '') {
      return;
    }

    await firestore().collection('users').doc(user?.uid).update({
      nome: name,
    });

    //Buscar todos os posts desse user e atualizar o nome dele

    const postDocs = await firestore()
      .collection('posts')
      .where('userId', '==', user?.uid)
      .get();
    //Percorrer os Posts do user e atualizar
    postDocs.forEach(async (doc) => {
      await firestore().collection('posts').doc(doc.id).update({
        autor: name,
      });
    });
    let data = {
      uid: user.uid,
      nome: name,
      email: user.email,
    };
    setUser(data);
    storageUser(data);
    setOpen(false);
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('Cancelou');
      } else if (response.error) {
        console.log('Ops parece que deu algum erro');
      } else {
        // Subir para o firebase
        uploadFileFirebase(response).then(() => {
          uploadAvatarPosts();
        });
        setUrl(response.assets[0].uri);
      }
    });
  };

  const getFileLocalPath = (response) => {
    //extrair e retornar a url da foto.
    return response.assets[0].uri;
  };

  const uploadFileFirebase = async (response) => {
    const fileSource = getFileLocalPath(response);

    const storageRef = storage().ref('users').child(user?.uid);

    return await storageRef.putFile(fileSource);
  };

  const uploadAvatarPosts = async () => {
    const storageRef = storage().ref('users').child(user?.uid);

    const url = await storageRef
      .getDownloadURL()
      .then(async (image) => {
        //Atualizar todas as imagens dos posts desse user
        const postDocs = await firestore()
          .collection('posts')
          .where('userId', '==', user?.uid)
          .get();
        //Percorrer os Posts e trocar a url da imagem
        postDocs.forEach(async (doc) => {
          await firestore().collection('posts').doc(doc.id).update({
            avatarUrl: image,
          });
        });
      })
      .catch((error) => {
        console.log('Error ao atualizar foto dos posts', error);
      });
  };

  return (
    <Container>
      <Header />
      {url ? (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText>+</UploadText>
          <Avatar source={{ uri: url }} />
        </UploadButton>
      ) : (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText>+</UploadText>
        </UploadButton>
      )}
      <Name>{user?.nome}</Name>
      <Email>{user?.email}</Email>
      <Button bg="#428cfd" onPress={() => setOpen(true)}>
        <ButtonText color="#fff">Atualizar Perfil</ButtonText>
      </Button>
      <Button bg="#ddd" onPress={handleSignOut}>
        <ButtonText color="#353840">Sair</ButtonText>
      </Button>
      <Modal visible={open} animationType="slide" transparent={true}>
        <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'}>
          <ButtonBack onPress={() => setOpen(false)}>
            <Feather name="arrow-left" size={25} color="#121212" />
            <ButtonText color="#121212">Voltar</ButtonText>
          </ButtonBack>
          <Input
            placeholder={user?.nome}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Button bg="#428cfd" onPress={updateProfile}>
            <ButtonText color="#fff">Salvar</ButtonText>
          </Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
