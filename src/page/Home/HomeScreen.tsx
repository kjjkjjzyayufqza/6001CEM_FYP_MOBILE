import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Image,
  Input,
  ScrollView,
  Spacer,
  Stack,
  Text,
  VStack,
  View,
  useToast,
} from 'native-base'
import React, {FC, ReactNode, useEffect, useState} from 'react'
import SearchInput from '../../components/SearchInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {TouchableOpacity} from 'react-native'
import {UserNameBar} from '../../components/UserNameBar'
import {getDistanceResult} from '../../MOCK/LocationPoint'
import {navigateTo} from '../../components/RootNavigation'
import {useIsFocused} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getUser} from '../../API'

export const HomeScreen = () => {
  // check if screen is focused
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>()
  const isFocused = useIsFocused()
  // listen for isFocused, if useFocused changes
  // call the function that you use to mount the component.
  useEffect(() => {
    isFocused &&
      AsyncStorage.getItem('isLogin').then(value => {
        if (value != null) {
          if (value == 'true') {
            getUser()
              .then(res => {
                setIsLogin(true)
                setUserName(res.data.name)
              })
              .catch(err => {
                console.log('Get User Fail')
                AsyncStorage.clear()
              })
          } else {
            setIsLogin(false)
          }
        } else {
          setIsLogin(false)
        }
      })
  }, [isFocused])

  const categoriesList = [
    'General Practitioner',
    'Ophthalmologist',
    'General Surgeon',
    'Dermatologists',
    'Orthopedic Surgeon',
    'Internal Medicine Physician',
    'Otolaryngologist',
    'Psychologist',
  ]

  const categoriesIconAndBG = [
    {
      icon: <MaterialCommunityIcons name='human' size={30} color={'white'} />,
      iconBg: '#E75B5B',
    },
    {
      icon: (
        <MaterialCommunityIcons name='eye-outline' size={30} color={'white'} />
      ),
      iconBg: '#C89247',
    },
    {
      icon: <MaterialCommunityIcons name='human' size={30} color={'white'} />,
      iconBg: '#95C847',
    },
    {
      icon: <MaterialCommunityIcons name='bone' size={30} color={'white'} />,
      iconBg: '#4FC847',
    },
    {
      icon: (
        <MaterialCommunityIcons name='eye-outline' size={30} color={'white'} />
      ),
      iconBg: '#47ABC8',
    },
    {
      icon: <MaterialCommunityIcons name='human' size={30} color={'white'} />,
      iconBg: '#4749C8',
    },
    {
      icon: <MaterialCommunityIcons name='human' size={30} color={'white'} />,
      iconBg: '#C847C8',
    },
    {
      icon: <MaterialCommunityIcons name='human' size={30} color={'white'} />,
      iconBg: '#EBD33D',
    },
  ]

  return (
    <ScrollView>
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        bg={'white'}>
        <VStack flex={1} alignItems='center'>
          <UserNameBar _isLogin={isLogin} _userName={userName ?? ''} />
          <Box alignItems='center' p={5} flex={1} zIndex={3}>
            <SearchInput
              _onSubmit={value => {
                navigateTo('SearchList', value)
              }}
              _isLogin={isLogin}
            />
          </Box>
          <Box alignItems='center' p={5} flex={1}>
            <Center position='absolute' zIndex={2} bottom={'18px'} right={0}>
              <AspectRatio w='70%' ratio={1} h={'70%'}>
                <Image
                  source={require('../../../public/img/doctor-14044.png')}
                  w={'100%'}
                  h={'120%'}
                  alt='image'
                />
              </AspectRatio>
              <AspectRatio
                w='30%'
                h='30%'
                ratio={4 / 3}
                position={'absolute'}
                top={10}
                left={'76px'}>
                <Image
                  source={require('../../../public/img/botIcon.png')}
                  w={'100%'}
                  h={'100%'}
                  alt='image'
                  rounded={500}
                />
              </AspectRatio>
            </Center>
            <Box
              rounded='lg'
              overflow='hidden'
              borderColor='coolGray.200'
              borderWidth='1'
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}>
              <Box flex={1}>
                <AspectRatio w='100%' ratio={18 / 9} flex={1}>
                  <Image
                    source={require('../../../public/img/wave_background-19_generated_y.jpg')}
                    w={'100%'}
                    h={'100%'}
                    alt='image'
                  />
                </AspectRatio>

                <Center
                  _text={{
                    color: 'black',
                    fontWeight: '700',
                    fontSize: 'md',
                  }}
                  position='absolute'
                  top='0'
                  py='3'
                  w={'200px'}>
                  Do you have any questions ?
                </Center>
                <Center
                  _text={{
                    color: 'warmGray.50',
                    fontWeight: '700',
                    fontSize: 'xs',
                  }}
                  position='absolute'
                  top={'75px'}
                  px='6'
                  py='1.5'>
                  <Button
                    rounded={100}
                    bg={'#40BEEE'}
                    onPress={() => {
                      navigateTo('Chat', {})
                    }}>
                    Conducting Chat
                  </Button>
                </Center>
              </Box>
            </Box>
          </Box>
          <HStack px={5} py={2}>
            <Text fontSize={20} fontWeight={600}>
              Categories
            </Text>
            <Spacer />
          </HStack>
          <ScrollView horizontal={true} pb={5} px={5} pt={2}>
            {categoriesList.map((e, i) => {
              return (
                <CategoriesCard
                  key={i}
                  icon={categoriesIconAndBG[i].icon}
                  iconBG={categoriesIconAndBG[i].iconBg}
                  title={e}
                  _isLogin={isLogin}
                />
              )
            })}
          </ScrollView>
          <HStack px={5} py={2}>
            <Text fontSize={20} fontWeight={600}>
              News
            </Text>
            <Spacer />
          </HStack>
          <VStack pb={5} pt={2} px={5}>
            <Box
              rounded='lg'
              overflow='hidden'
              borderColor='coolGray.200'
              borderWidth='1'
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'white',
              }}
              _light={{
                backgroundColor: 'white',
              }}
              p={2}>
              <HStack space={4}>
                <AspectRatio w='100px' ratio={16 / 9}>
                  <Image
                    resizeMode='cover'
                    source={{
                      uri: 'https://cms-api-in.myhealthcare.co/image/20220910103120.jpeg',
                    }}
                    alt='Picture of a Flower'
                  />
                </AspectRatio>
                <Text w={'70%'}>The chat model has been updated</Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>
      </View>
    </ScrollView>
  )
}

const CategoriesCard: FC<{
  icon: ReactNode
  iconBG: string
  title: string
  _isLogin: boolean
}> = ({icon, iconBG, title, _isLogin}) => {
  const toast = useToast()
  return (
    <TouchableOpacity
      onPress={() => {
        if (_isLogin) {
          navigateTo('SearchList', {categories: title})
        } else {
          toast.show({
            title: 'Must be logged in to use',
            placement: 'top',
          })
        }
      }}>
      <Box pr={4}>
        <Box
          bg={'#ffffff'}
          borderWidth={1}
          borderColor={'#eaeaea'}
          p={2}
          rounded={10}>
          <HStack flex={1} alignItems={'center'} justifyContent={'center'}>
            <Box p={3} bg={iconBG} rounded={8}>
              {icon}
            </Box>
            <Text
              px={3}
              color={'#545454'}
              w={'100px'}
              overflow={'hidden'}
              h={'60px'}>
              {title}
            </Text>
          </HStack>
        </Box>
      </Box>
    </TouchableOpacity>
  )
}
