import {
  AlertDialog,
  AspectRatio,
  Box,
  Button,
  Center,
  CheckIcon,
  CircleIcon,
  Divider,
  FlatList,
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
import React, {FC, ReactNode, useEffect, useRef, useState} from 'react'
import {postBotMessage} from '../API'
import {AxiosResponse} from 'axios'
import {Image, SafeAreaView, TouchableOpacity} from 'react-native'
import {windowWidth} from '../Dimensions/Dimensions'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { navigateTo } from './RootNavigation'

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
  const [showSuggestions, setShowSuggestions] = useState<ReactNode>(<></>)
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
            //Do not understand
            botMessage && setMessage(<Text>{botMessage}</Text>)
          } else {
            if (ignore_tag.includes(botMessageTag)) {
              botMessage && setMessage(<Text>{botMessage}</Text>)
            } else {
              //Diseases
              const random: number = Math.floor(
                Math.random() * selectList.length,
              )
              const message = (
                <Text>
                  {selectList[random]}
                  <Text underline fontWeight={700} fontSize={18}>
                    {botMessage}
                  </Text>
                </Text>
              )
              setMessage(message)
              // console.log(res.data.botMessage)
              setShowSuggestions(
                <RecommendationNode
                  Type={res.data.botMessage?.tag}
                  SuggestionsText={res.data.botMessage?.suggestionsText}
                  SuggestionsList={res.data.botMessage?.suggestions}
                  Introduction={res.data.botMessage?.description}
                />,
              )
            }
          }
        })
        .catch(err => {
          console.log(err)
          setMessage(
            <Text color='#FF3737'>Network Error, Please Try Again</Text>,
          )
        })
    }
    return () => {}
  }, [])

  return (
    <View>
      <Text>{message}</Text>
      {showSuggestions}
    </View>
  )
}

interface RecommendationNodeModel {
  Type?: string
  SuggestionsText?: string
  SuggestionsList?: string[]
  Introduction?: string
}

const RecommendationNode: FC<RecommendationNodeModel> = ({
  Type,
  SuggestionsText,
  SuggestionsList,
  Introduction,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => setIsOpen(false)

  const cancelRef = useRef(null)

  return (
    <View>
      <Divider my='2' />
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <HStack
          alignItems={'center'}
          borderWidth={1}
          w={'50%'}
          borderColor={'#43B2FF'}
          rounded={5}
          px={1}>
          <AntDesign
            name='questioncircleo'
            style={{color: '#088CE7'}}
            size={15}
          />
          <Text color='#088CE7' ml={3}>
            What's this?
          </Text>
        </HStack>
      </TouchableOpacity>
      <Text color='#585858'>{SuggestionsText}</Text>
      <VStack space={4} py={1}>
        <FlatList
          data={SuggestionsList}
          renderItem={({item, index}) => {
            if (index < 2) {
              return (
                <View p={1}>
                  <Box
                    p='1'
                    bg='white'
                    _text={{
                      fontSize: 'md',
                      fontWeight: 'medium',
                      color: 'warmGray.50',
                      letterSpacing: 'lg',
                    }}
                    overflow={'hidden'}
                    borderRadius={5}
                    borderWidth={1}
                    borderColor={'#EEEEEE'}>
                    <HStack space={2}>
                      <CircleIcon size='2' mt='2' color='emerald.500' />
                      <Text color='black' fontSize={14} maxW={'95%'}>
                        {item}
                      </Text>
                    </HStack>
                  </Box>
                </View>
              )
            }
            return null
          }}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text>
          In the meantime, I recommend the following of doctors to you
        </Text>
        <Box>
          <Pressable onPress={() => {
            navigateTo('SearchList',{})
          }}>
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
                    <VStack flex={1} px={1}>
                      <Text fontSize='13px' color='#9E9E9E'>
                        Category
                      </Text>
                      <View h={'40px'} overflow={'hidden'}>
                        <Text
                          color='coolGray.800'
                          fontWeight='600'
                          fontSize='18px'
                          lineHeight={'19px'}>
                          {SwitchDoctorCate(Type ?? '')}
                        </Text>
                      </View>

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
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{Type}</AlertDialog.Header>
          <AlertDialog.Body>{Introduction}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button bg={'#19A1FF'} onPress={onClose}>
                OK
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </View>
  )
}

function SwitchDoctorCate (type: string): string {
  const AllChatClass = [
    'infected wound',
    'stomach ache',
    'acne',
    'joint pain',
    'blurry vision',
    'feeling dizzy',
    'foot ache',
    'head ache',
    'ear ache',
    'hair falling out',
    'emotional pain',
    'knee pain',
    'skin issue',
    'muscle pain',
    'feeling cold',
    'back pain',
    'chest pain',
    'shoulder pain',
    'hard to breath',
    'cough',
    'injury from sports',
    'neck pain',
    'internal pain',
    'open wound',
    'body feels weak',
  ]

  switch (type) {
    case AllChatClass[0]:
      //外科医生
      return 'General Surgeon'
    case AllChatClass[1]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[2]:
      //皮肤科
      return 'Dermatologists'
    case AllChatClass[3]:
      //骨科医生
      return 'Orthopedic Surgeon'
    case AllChatClass[4]:
      //眼科医生
      return 'Ophthalmologist'
    case AllChatClass[5]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[6]:
      //内科医生
      return 'Internal Medicine Physician'
    case AllChatClass[7]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[8]:
      //耳鼻喉科医生
      return 'Otolaryngologist'
    case AllChatClass[9]:
      //皮肤科
      return 'Dermatologists'
    case AllChatClass[10]:
      //心理医生
      return 'Psychologist'
    case AllChatClass[11]:
      //骨科医生
      return 'Orthopedic Surgeon'
    case AllChatClass[12]:
      //皮肤科
      return 'Dermatologists'
    case AllChatClass[13]:
      //内科医生
      return 'Internal Medicine Physician'
    case AllChatClass[14]:
      //内科医生
      return 'Internal Medicine Physician'
    case AllChatClass[15]:
      //内科医生
      return 'Internal Medicine Physician'
    case AllChatClass[16]:
      //骨科医生
      return 'Orthopedic Surgeon'
    case AllChatClass[17]:
      //内科医生
      return 'Internal Medicine Physician'
    case AllChatClass[18]:
      //内科医生
      return 'Internal Medicine Physician'
    case AllChatClass[19]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[20]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[21]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[22]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[23]:
      //普通科
      return 'General Practitioner'
    case AllChatClass[24]:
      //外科医生
      return 'General Surgeon'
    case AllChatClass[25]:
      //普通科
      return 'General Practitioner'
    default:
      return 'none'
  }
}
