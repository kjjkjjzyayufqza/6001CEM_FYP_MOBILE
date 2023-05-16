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
import React, {FC, useEffect, useState} from 'react'
import {Basestyles} from '../../Styles/Styles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {navigateTo} from './RootNavigation'
import {getUser} from '../API'
import {useIsFocused} from '@react-navigation/native'

export const UserNameBar: FC<{_isLogin: boolean; _userName: string}> = ({
  _isLogin,
  _userName,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    setIsLogin(_isLogin)
    setUserName(_userName)
  }, [_isLogin,_userName])

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
            {userName}
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
              navigateTo('LoginScreen', {})
            }}>
            Sign in
          </Button>
        </HStack>
      )}
    </VStack>
  )
}

export default UserNameBar
