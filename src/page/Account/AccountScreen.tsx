import {
  Box,
  Divider,
  HStack,
  Heading,
  Spacer,
  Text,
  VStack,
  View,
} from 'native-base'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {Basestyles} from '../../../Styles/Styles'

export const AccountScreen = () => {
  return (
    <VStack flex={1} bg={'white'}>
      <Box p={4}>
        <Box w='full'>
          <Heading alignItems='center' flexDirection='row' mb={3}>
            Action
          </Heading>
          <HStack justifyContent={'space-between'} space={4}>
            <Box
              h={'50px'}
              w={'45%'}
              _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'black',
                letterSpacing: 'lg',
              }}
              style={Basestyles.baseShadow}
              bg='white'
              rounded={5}>
              <HStack p={2}>
                <Text fontSize={'md'}>Update Account</Text>
                <Spacer />
                <MaterialIcons name='arrow-right' size={20} />
              </HStack>
            </Box>
            <Box
              h={'50px'}
              w={'45%'}
              _text={{
                fontSize: 'md',
                fontWeight: 'medium',
                color: 'black',
                letterSpacing: 'lg',
              }}
              style={Basestyles.baseShadow}
              bg='white'
              rounded={5}>
              <HStack p={2}>
                <Text fontSize={'md'}>Logout</Text>
                <Spacer />
                <MaterialIcons name='arrow-right' size={20} />
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Box>
    </VStack>
  )
}
