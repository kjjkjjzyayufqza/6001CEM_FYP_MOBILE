import {
  Avatar,
  Box,
  Button,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
} from 'native-base'
import React, {useEffect, useState} from 'react'
import {Basestyles} from '../../Styles/Styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigateTo } from './RootNavigation'

export const UserNameBar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  useEffect(() => {
    AsyncStorage.setItem('isLogin', 'false')
    AsyncStorage.getItem('isLogin').then(value => {
      if (value != null) {
        console.log(value)
        if (value == 'true') {
          setIsLogin(true)
        } else {
          setIsLogin(false)
        }
      }
    })
  }, [])

  return (
    <VStack flex={1} alignItems='center'>
      <HStack px={5} pt={2}>
        <Text color={'#A5A4A4'} fontSize={25} fontWeight={500}>
          Hello,
        </Text>
        <Spacer />
      </HStack>
      {isLogin ? (
        <HStack px={5}>
          <Text fontSize={30} fontWeight={600}>
            Radovan
          </Text>
          <Spacer />
          <Avatar
            bg='green.500'
            source={{
              uri: 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg',
            }}
            size={'md'}>
            AJ
          </Avatar>
        </HStack>
      ) : (
        <HStack px={5}>
          <Text fontSize={30} fontWeight={600}>
            Guest
          </Text>
          <Spacer />
          <Button
            variant={'ghost'}
            onPress={() => {
              navigateTo('LoginScreen',{})
            }}>
            Sign in
          </Button>
        </HStack>
      )}
    </VStack>
  )
}

export default UserNameBar
