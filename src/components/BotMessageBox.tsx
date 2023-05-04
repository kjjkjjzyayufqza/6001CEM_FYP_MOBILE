import {
  AspectRatio,
  Box,
  Center,
  CheckIcon,
  CircleIcon,
  Divider,
  HStack,
  Heading,
  Input,
  Pressable,
  ScrollView,
  Spacer,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base'
import React, {ReactNode, useEffect, useState} from 'react'
import {postBotMessage} from '../API'
import {AxiosResponse} from 'axios'
import {Image, SafeAreaView} from 'react-native'
import {windowWidth} from '../Dimensions/Dimensions'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
interface BotMessageBoxModel {
  sendMessage: string
}

export function makeid (length: number) {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export const BotMessageBox: React.FC<BotMessageBoxModel> = ({sendMessage}) => {
  const [message, setMessage] = useState<ReactNode>(<></>)
  const [returnResult, setReturnResult] = useState<any>({
    _id: makeid(20),
    createdAt: new Date(),
    text: '',
    user: {_id: 0, name: 'Bot'},
  })

  const selectList = ['According to the description, this may be ']
  const ignore_tag = [
    'greeting',
    'goodbye',
    'thanks',
    'noanswer',
    'options',
    'Identity',
  ]

  useEffect(() => {
    if (sendMessage) {
      // console.log('ready to call')
      setMessage(
        <HStack space={2} justifyContent='center'>
          <Spinner accessibilityLabel='Loading posts' color='indigo.500' />
          <Text fontSize='md'>Loading</Text>
        </HStack>,
      )
      postBotMessage(sendMessage)
        .then(res => {
          // console.log('api done', res.data.botMessage?.message)

          const botMessageTag = res.data.botMessage?.tag ?? ''
          const botMessage = res.data.botMessage?.message ?? ''

          if (!botMessageTag) {
            botMessage && setMessage(<Text>{botMessage}</Text>)
          } else {
            if (ignore_tag.includes(botMessageTag)) {
              botMessage && setMessage(<Text>{botMessage}</Text>)
            } else {
              const random: number = Math.floor(
                Math.random() * selectList.length,
              )
              const message = <Text>{selectList[random] + botMessage}</Text>
              setMessage(message)
            }
          }
        })
        .catch(() => {})
    }
    return () => {}
  }, [])

  return (
    <View>
      <Text>This could be a skin problem</Text>
      <Divider my='2' />
      <Text>Here are some suggestions</Text>
      <VStack space={4}>
        <Box
          p='1'
          bg='white'
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
            letterSpacing: 'lg',
          }}
          borderRadius={5}
          borderWidth={1}
          borderColor={'#EEEEEE'}>
          <HStack space={2}>
            <CircleIcon size='2' mt='2' color='emerald.500' />
            <Text color='black' fontSize='md'>
              Some Recommendation....
            </Text>
          </HStack>
        </Box>
        <Text>In the meantime, I recommend that you try to find doctors in the following categories</Text>
        <Box>
          <Pressable onPress={() => console.log("I'm Pressed")}>
            {({isHovered, isFocused, isPressed}) => {
              return (
                <Box
                  bg={
                    isPressed
                      ? 'coolGray.200'
                      : isHovered
                      ? 'coolGray.200'
                      : 'coolGray.100'
                  }
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                  p={2}
                  h={24}
                  borderRadius={5}
                  shadow={1}>
                  <HStack>
                    <Image
                      style={{
                        width: 100,
                        height: 65,
                        resizeMode: 'cover',
                        borderRadius: 5,
                      }}
                      source={require('../../public/img/doctorList.png')}
                      alt='image'
                    />
                    <VStack flex={1}>
                      <HStack h={'50%'} overflow={'hidden'}>
                        <Text
                          color='coolGray.800'
                          fontWeight='medium'
                          fontSize='xl'>
                          Gastroenterology
                        </Text>
                      </HStack>
                      <Text fontSize='sm' color='#9E9E9E'>
                        General
                      </Text>
                      <Text
                        fontSize='sm'
                        color='#0080EA'
                        style={{textAlign: 'right'}}>
                        Read More...
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              )
            }}
          </Pressable>
        </Box>
      </VStack>
    </View>
  )
}
