import {
  AddIcon,
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
  Image,
  Progress,
  useToast,
} from 'native-base'
import React, {FC, ReactNode, useEffect, useRef, useState} from 'react'
import {postBotMessage, postImage} from '../API'
import {AxiosResponse} from 'axios'
import {SafeAreaView, TouchableOpacity} from 'react-native'
import {windowWidth} from '../Dimensions/Dimensions'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {navigateTo} from './RootNavigation'
import getUserLocation, {LocationModel} from '../MOCK/LocationPoint'
import {MOCK_DATA_DOCTOR, MOCK_DATA_DOCTOR_MODEL} from '../MOCK'
import * as geolib from 'geolib'
import * as ImagePicker from 'react-native-image-picker'
import {decode as atob, encode as btoa} from 'base-64'
import {BotImageResponseModel} from '../MODEL'
interface BotMessageBoxModel {
  sendMessage: string
  onlyUpload?: boolean
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

export const BotMessageBox: React.FC<BotMessageBoxModel> = ({
  sendMessage,
  onlyUpload = false,
}) => {
  const [message, setMessage] = useState<ReactNode>(<></>)
  const [showSuggestions, setShowSuggestions] = useState<ReactNode>(<></>)
  const [returnResult, setReturnResult] = useState<any>({
    _id: makeid(20),
    createdAt: new Date(),
    text: '',
    user: {_id: 0, name: 'Bot'},
  })
  const [isSkinIssue, setIsSkinIssue] = useState<boolean>(false)

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
    if (!onlyUpload && onlyUpload == false)
      if (sendMessage) {
        // console.log('ready to call',sendMessage)
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
                if (botMessage.startsWith('skin issue')) {
                  setIsSkinIssue(true)
                  PubSub.publish(
                    'addCustomMsg',
                    <View>
                      <ImageUploadBox />
                    </View>,
                  )
                }
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
      {!onlyUpload && onlyUpload == false ? (
        <>
          <Text>{message}</Text>
          {showSuggestions}
          {/* {isSkinIssue && <ImageUploadBox />} */}
        </>
      ) : (
        <ImageUploadBox />
      )}
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
        <Divider my={5} />
        <Text>
          In the meantime, I recommend the following of doctors to you
        </Text>
        <GetClosestDoctor Type={Type} />
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

const GetClosestDoctor: FC<{Type: any}> = ({Type}) => {
  const DoctorData = MOCK_DATA_DOCTOR

  let locationPointData: LocationModel
  let _doctorData: MOCK_DATA_DOCTOR_MODEL
  DoctorData.map(e => {
    if (e.category == SwitchDoctorCate(Type)) {
      locationPointData = e.locationPoint
      _doctorData = e
    }
  })
  // console.log()
  const [resultValue, setResultValue] = useState<number>()
  const [isLoadingDistance, setIsLoadingDistance] = useState<boolean>(true)

  useEffect(() => {
    // setResultValue(getMeters(locationPointData[0]))
    getUserLocation()
      .then(res => {
        const cal_Distance = geolib.getPreciseDistance(locationPointData, res)
        setResultValue(cal_Distance * 0.000621)
        setIsLoadingDistance(false)
      })
      .catch(err => {})
  }, [])
  // console.log('resultValue is ', resultValue)
  return (
    <Box>
      <Pressable
        onPress={() => {
          navigateTo('Detail', _doctorData)
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
              h={'140px'}
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
                  source={{uri: _doctorData.image}}
                  alt='image'
                />
                <VStack flex={1} px={1}>
                  <View h={'20px'} overflow={'hidden'}>
                    <Text
                      color='#0080EA'
                      fontWeight='600'
                      fontSize='18px'
                      lineHeight={'19px'}>
                      {_doctorData.name}
                    </Text>
                  </View>
                  <Text fontSize='13px' color='#9E9E9E' mb={-1} mt={2}>
                    Category
                  </Text>
                  <Text
                    fontSize='16px'
                    color='#373737'
                    h={'20px'}
                    overflow={'hidden'}>
                    {SwitchDoctorCate(Type ?? '')}
                  </Text>

                  {/* <Text
                fontSize='sm'
                color='#0080EA'
                style={{textAlign: 'right'}}>
                Read More...
              </Text> */}
                </VStack>
              </HStack>

              <Text
                fontSize='sm'
                color='black'
                style={{textAlign: 'left'}}
                top={3}>
                Recommends the doctor closest to you.
              </Text>
              {isLoadingDistance ? (
                <HStack space={2} top={6}>
                  <Spinner accessibilityLabel='Loading posts' />
                  <Text color='gray.400' fontSize='sm'>
                    Loading
                  </Text>
                </HStack>
              ) : (
                <VStack>
                  <Text
                    fontSize='14px'
                    color='#0099EB'
                    overflow={'hidden'}
                    top={2}>
                    {_doctorData.location}
                  </Text>
                  <Text
                    fontSize='sm'
                    color='gray.400'
                    style={{textAlign: 'left'}}>
                    Distance from you {resultValue && resultValue.toFixed(2)} KM
                  </Text>
                </VStack>
              )}
            </Box>
          )
        }}
      </Pressable>
    </Box>
  )
}

const ImageUploadBox: FC<any> = () => {
  const [imageUrl, setImageUrl] = useState<ImagePicker.Asset>()
  const [response, setResponse] = useState<BotImageResponseModel>()

  const chooseImage = () => {
    var options: ImagePicker.ImageLibraryOptions = {
      mediaType: 'photo',
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage)
      } else {
        if (response.assets) {
          setImageUrl(response.assets[0])
        }
      }
    })
  }
  const toast = useToast();
  useEffect(() => {
    if (imageUrl) {
      const fmData = new FormData()
      // fmData.append('image', imageByte)
      fmData.append('image', {
        uri: imageUrl?.uri,
        type: imageUrl?.type,
        name: imageUrl?.fileName,
      })
      postImage(fmData)
        .then(res => {
          // console.log(res)
          toast.show({
            title: "Image Upload Success",
            placement: "top"
          })
          setResponse(res.data)
        })
        .catch(err => {
          toast.show({
            title: "Image Upload Error",
            placement: "top"
          })
          console.log(err)
        })
    }
  }, [imageUrl])

  const colorScheme = ['primary', 'secondary', 'emerald', 'warning', 'light']

  return (
    <VStack>
      <Divider mt={5} my={2} />
      <Text fontWeight={700} py={1}>
        If you can provide relevant skin pictures, we will predict what kind of
        skin disease it belongs to.
      </Text>

      <Pressable
        onPress={() => {
          chooseImage()
        }}>
        {({isHovered, isFocused, isPressed}) => {
          return (
            <Box
              maxW='96'
              borderWidth='1'
              borderColor='coolGray.300'
              bg={
                isPressed
                  ? 'coolGray.200'
                  : isHovered
                  ? 'coolGray.200'
                  : 'coolGray.100'
              }
              p={imageUrl ? '1' : '5'}
              rounded='8'
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
              }}>
              {imageUrl ? (
                <Center>
                  <Image
                    source={{
                      uri: imageUrl?.uri,
                    }}
                    alt='Alternate Text'
                    size='xl'
                    resizeMode={'cover'}
                  />
                </Center>
              ) : (
                <Center>
                  <AddIcon style={{width: '30px', height: '30px'}} />
                </Center>
              )}
            </Box>
          )
        }}
      </Pressable>
      {response && !response.result && (
        <Text my={3} color='#EB1111'>
          The image you provided is not a human skin, please reselect it!
        </Text>
      )}
      {response && response.result && (
        <>
          <Text my={3} fontWeight={600}>
            Based on the analysis, the results are as follows:
          </Text>
          <Box w='90%' maxW='300'>
            <VStack mx='4' space='md'>
              {response.top5Prediction?.map((e, i) => {
                return (
                  <Box key={i}>
                    <Text>{sortName(e[0])}</Text>
                    <Progress colorScheme={colorScheme[i]} value={e[1]} />
                  </Box>
                )
              })}
            </VStack>
          </Box>
          <Text mt={4} color='gray.500'>
            The prediction is for reference only, we suggest you can go to the
            information doctor based on the data.
          </Text>
        </>
      )}
    </VStack>
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

const sortName = (name: string) => {
  switch (name) {
    case 'Acne and Rosacea Photos':
      return 'Acne and Rosacea'
    case 'Bullous Disease Photos':
      return 'Bullous Disease'
    case 'Cellulitis Impetigo and other Bacterial Infections':
      return 'Cellulitis Impetigo'
    case 'Eczema Photos':
      return 'Eczema'
    case 'Melanoma Skin Cancer Nevi and Moles':
      return 'Melanoma Skin Cancer'
    case 'Poison Ivy Photos and other Contact Dermatitis':
      return 'Contact Dermatitis'
    case 'Scabies Lyme Disease and other Infestations and Bites':
      return 'Scabies Lyme Disease'
    case 'Seborrheic Keratoses and other Benign Tumors':
      return 'Seborrheic Keratoses'
    case 'Systemic Disease':
      return 'Systemic Disease'
    case 'Tinea Ringworm Candidiasis and other Fungal Infections':
      return 'Fungal Infections'
    case 'Urticaria Hives':
      return 'Urticaria Hives'
    case 'Vasculitis Photos':
      return 'Vasculitis Photos'
    case 'Warts Molluscum and other Viral Infections':
      return 'Other Viral Infections'
    case 'Normal':
      return 'Normal'
    default:
      return 'Not Found'
  }
}
