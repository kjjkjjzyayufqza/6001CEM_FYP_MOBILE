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
} from 'native-base'
import React from 'react'
import SearchInput from '../../components/SearchInput'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {TouchableOpacity} from 'react-native'

export const HomeScreen = () => {
  return (
    <ScrollView>
      <View
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        bg={'white'}>
        <VStack flex={1} alignItems='center'>
          <HStack px={5} pt={2}>
            <Text color={'#A5A4A4'} fontSize={25} fontWeight={500}>
              Hello,
            </Text>
            <Spacer />
          </HStack>
          <HStack px={5}>
            <Text fontSize={30} fontWeight={600}>
              Radovan
            </Text>
            <Spacer />
            <Avatar
              bg='green.500'
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
              }}
              size={'md'}>
              AJ
            </Avatar>
          </HStack>
          <Box alignItems='center' p={5} flex={1} zIndex={3}>
            <SearchInput />
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
                  <Button rounded={100} bg={'#40BEEE'}>
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
            <TouchableOpacity>
              <Box pr={4}>
                <Box
                  bg={'#ffffff'}
                  borderWidth={1}
                  borderColor={'#eaeaea'}
                  p={2}
                  rounded={10}>
                  <HStack
                    flex={1}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Box p={3} bg={'#E75B5B'} rounded={8}>
                      <MaterialCommunityIcons
                        name='human'
                        size={30}
                        color={'white'}
                      />
                    </Box>
                    <Text px={3} color={'#545454'} w={'100px'}>
                      General Practitioner
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box pr={4}>
                <Box
                  bg={'#ffffff'}
                  borderWidth={1}
                  borderColor={'#eaeaea'}
                  p={2}
                  rounded={10}>
                  <HStack
                    flex={1}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Box p={3} bg={'#0064A9'} rounded={8}>
                      <MaterialCommunityIcons
                        name='cards-heart'
                        size={30}
                        color={'white'}
                      />
                    </Box>
                    <Text px={3} color={'#545454'} w={'100px'}>
                      Internal Medicine
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box pr={4}>
                <Box
                  bg={'#ffffff'}
                  borderWidth={1}
                  borderColor={'#eaeaea'}
                  p={2}
                  rounded={10}>
                  <HStack
                    flex={1}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Box p={3} bg={'#DFDF4B'} rounded={8}>
                      <MaterialCommunityIcons
                        name='hand-back-right-outline'
                        size={30}
                        color={'white'}
                      />
                    </Box>
                    <Text px={3} color={'#545454'} w={'100px'}>
                      Dermatology
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box pr={4}>
                <Box
                  bg={'#ffffff'}
                  borderWidth={1}
                  borderColor={'#eaeaea'}
                  p={2}
                  rounded={10}>
                  <HStack
                    flex={1}
                    alignItems={'center'}
                    justifyContent={'center'}>
                    <Box p={3} bg={'#B48CE7'} rounded={8}>
                      <MaterialCommunityIcons
                        name='eye-outline'
                        size={30}
                        color={'white'}
                      />
                    </Box>
                    <Text px={3} color={'#545454'} w={'100px'}>
                      Ophthalmology
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </TouchableOpacity>
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
                <Text w={'70%'}>
                  We have added a new number of physicians to our general
                  clinic.
                </Text>
              </HStack>
            </Box>
          </VStack>
        </VStack>
      </View>
    </ScrollView>
  )
}
