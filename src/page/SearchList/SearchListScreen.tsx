import {
  Actionsheet,
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  View,
  useDisclose,
} from 'native-base'
import React, {useMemo, useRef, useCallback} from 'react'
import SearchInput from '../../components/SearchInput'
import {TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {windowWidth} from '../../Dimensions/Dimensions'
import {Basestyles} from '../../../Styles/Styles'
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

export const SearchListScreen = () => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // variables
  const snapPoints = useMemo(() => ['25%', '70%'], [])

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  return (
    <VStack flex={1} bg='gray.100'>
      <GestureHandlerRootView style={{flex: 1}}>
        <Box p={3}>
          <SearchInput bgColor='white' brColor={'gray.200'} />
        </Box>
        <Box p={3} bg={'#F2F2F2'}>
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            space={4}>
            <TouchableOpacity>
              <Box
                w={windowWidth / 2.2}
                p={2}
                rounded='lg'
                overflow='hidden'
                borderColor='coolGray.200'
                borderWidth='1'
                _light={{
                  backgroundColor: 'gray.50',
                }}>
                <HStack justifyContent={'center'}>
                  <MaterialCommunityIcons
                    name='sort-reverse-variant'
                    size={20}
                    color='#828282'
                    style={{paddingRight: 10}}
                  />
                  <Text>Sort by</Text>
                </HStack>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePresentModalPress}>
              <Box
                w={windowWidth / 2.2}
                p={2}
                rounded='lg'
                overflow='hidden'
                borderColor='coolGray.200'
                borderWidth='1'
                _light={{
                  backgroundColor: 'gray.50',
                }}>
                <HStack justifyContent={'center'}>
                  <MaterialCommunityIcons
                    name='filter-variant'
                    size={20}
                    color='#828282'
                    style={{paddingRight: 10}}
                  />
                  <Text>Filter</Text>
                </HStack>
              </Box>
            </TouchableOpacity>
          </HStack>
        </Box>
        <Box px={3} pt={3}>
          <Text color='coolGray.800' fontWeight={500} fontSize={15}>
            Show results : 99
          </Text>
        </Box>
        <Box p={3}>
          <Pressable onPress={() => console.log("I'm Pressed")}>
            <Box
              rounded='lg'
              borderColor='coolGray.200'
              _light={{
                backgroundColor: 'white',
              }}
              h={170}
              style={Basestyles.baseShadow}>
              <VStack p={3} h={'100%'}>
                <HStack>
                  <Box>
                    <AspectRatio
                      w={'120px'}
                      ratio={4 / 4}
                      overflow={'hidden'}
                      borderWidth={1}
                      borderColor={'coolGray.200'}
                      rounded={8}>
                      <Image
                        h={'150px'}
                        resizeMode={'cover'}
                        source={{
                          uri: 'https://thumbs.dreamstime.com/b/senior-doctor-holding-papers-smiling-23096004.jpg',
                        }}
                        alt='image'
                      />
                    </AspectRatio>
                  </Box>
                  <Box bg='white' w={'70%'} px={5}>
                    <Text
                      color='coolGray.800'
                      fontWeight='medium'
                      fontSize='xl'>
                      Dr. Johnson
                    </Text>
                    <HStack mt='2'>
                      <MaterialCommunityIcons
                        name='badge-account-horizontal-outline'
                        size={20}
                        color='#828282'
                        style={{paddingRight: 10}}
                      />
                      <Badge
                        variant={'solid'}
                        bg={'amber.500'}
                        alignSelf='center'
                        p={0}
                        rounded={5}>
                        <Text fontSize='sm' color='white'>
                          General practitioner
                        </Text>
                      </Badge>
                    </HStack>
                    <HStack mt='2'>
                      <MaterialCommunityIcons
                        name='location-exit'
                        size={20}
                        color='#828282'
                        style={{paddingRight: 10}}
                      />
                      <Text fontSize='sm' color='coolGray.700'>
                        Kowloon Bay
                      </Text>
                    </HStack>
                    <HStack mt='2'>
                      <MaterialCommunityIcons
                        name='clock-time-five-outline'
                        size={20}
                        color='#828282'
                        style={{paddingRight: 10}}
                      />
                      <Text fontSize='sm' color='coolGray.700'>
                        11:00 AM - 18:00 PM
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
                <Box w={'300px'} mt={2} h={100}>
                  <HStack>
                    <MaterialIcons
                      name={'location-on'}
                      size={15}
                      style={{marginTop: 3}}
                    />
                    <Text fontSize='sm' color='gray.400'>
                      Distance from you : 423.2 M
                    </Text>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Pressable>
        </Box>
        <BottomSheetModalProvider>
          <View>
            <BottomSheetModal
              backdropComponent={backdropProps => (
                <BottomSheetBackdrop
                  {...backdropProps}
                  enableTouchThrough={true}
                />
              )}
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <View>
                <Text>Awesome 🎉</Text>
              </View>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </VStack>
  )
}
