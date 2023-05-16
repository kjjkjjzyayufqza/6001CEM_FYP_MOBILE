import {
  Box,
  Divider,
  HStack,
  Heading,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Basestyles} from '../../../Styles/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { navigateTo } from '../../components/RootNavigation'

export const AccountScreen = () => {
  const nav = useNavigation()
  const toast = useToast()
  return (
    <VStack flex={1} bg={'white'}>
      <Box p={4}>
        <Box w='full'>
          <Heading alignItems='center' flexDirection='row' mb={3}>
            Action
          </Heading>
          <HStack justifyContent={'space-between'} space={4}>
            <Pressable
              h={'50px'}
              w={'45%'}
              style={Basestyles.baseShadow}
              bg='white'
              rounded={5}>
              <HStack p={2}>
                <Text fontSize={'md'}>Update Account</Text>
                <Spacer />
                <MaterialIcons name='arrow-right' size={20} />
              </HStack>
            </Pressable>
            <Pressable
              h={'50px'}
              w={'45%'}
              style={Basestyles.baseShadow}
              bg='white'
              rounded={5}
              onPress={() => {
                AsyncStorage.clear()
                  .then(res => {})
                  .catch(err => {})
                toast.show({
                  title: 'Successful logout',
                  placement: 'top',
                })
                nav.goBack()
              }}>
              <HStack p={2}>
                <Text fontSize={'md'}>Logout</Text>
                <Spacer />
                <MaterialIcons name='arrow-right' size={20} />
              </HStack>
            </Pressable>
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}
