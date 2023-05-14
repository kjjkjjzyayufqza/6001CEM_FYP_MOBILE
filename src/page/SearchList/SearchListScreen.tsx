import {
  Actionsheet,
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  CheckIcon,
  FlatList,
  HStack,
  Image,
  Pressable,
  Select,
  Spacer,
  Text,
  VStack,
  View,
  useDisclose,
} from 'native-base'
import React, {
  useMemo,
  useRef,
  useCallback,
  FC,
  useState,
  useEffect,
} from 'react'
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
import {
  MOCK_DATA_DOCTOR,
  MOCK_DATA_DOCTOR_MODEL,
  MOCK_DATA_DOCTOR_ONE,
} from '../../MOCK'
import Location from '@react-native-community/geolocation'
import * as geolib from 'geolib'
import {LocationModel} from '../../MOCK/LocationPoint'
import {getDoctor} from '../../API'
import {useNavigation} from '@react-navigation/native'

export const SearchListScreen = () => {
  // ref
  const bottomSheetModalRef_sort = useRef<BottomSheetModal>(null)
  const bottomSheetModalRef_filter = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress_sort = useCallback(() => {
    bottomSheetModalRef_sort.current?.present()
  }, [])

  const handlePresentModalPress_filter = useCallback(() => {
    bottomSheetModalRef_filter.current?.present()
  }, [])

  const [currentLocation, setCurrentLocation] = useState<LocationModel>({
    latitude: 0,
    longitude: 0,
  })

  const [doctorList, setDoctorList] = useState<MOCK_DATA_DOCTOR_MODEL[]>([])
  const navigation = useNavigation()
  console.log(navigation.getState().routes)
  const searchName = navigation.getState().routes[1].params
  console.log(searchName)
  useEffect(() => {
    
    getDoctor({name: searchName})
      .then(res => {
        // console.log(res.data)
        setDoctorList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    Location.getCurrentPosition(
      position => {
        // console.log(position.coords)
        // const a = {latitude: 22.300394, longitude: 114.23495}
        // let b: any = {}
        // b = {
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude,
        // }
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        // const c = geolib.getPreciseDistance(a, b)
        // console.log('Miles:', c * 0.000621)
        // console.log('Meters:', c * 0.000621 * 1609.344)
      },
      error => {
        console.log('Unable to get your location!')
      },
      {enableHighAccuracy: true, maximumAge: 1000},
    )
  }, [])

  return (
    <VStack flex={1} bg='gray.100'>
      <GestureHandlerRootView style={{flex: 1}}>
        <Box p={3}>
          <SearchInput bgColor='white' brColor={'gray.200'} _value={searchName}/>
        </Box>
        <Box p={3} bg={'#F2F2F2'}>
          <HStack
            justifyContent={'space-between'}
            alignItems={'center'}
            space={4}>
            <TouchableOpacity onPress={handlePresentModalPress_sort}>
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
            <TouchableOpacity onPress={handlePresentModalPress_filter}>
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
        <FlatList
          initialNumToRender={5}
          data={doctorList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <RenderItemDoctorList
                item={item}
                _CurrentLocation={currentLocation}
              />
            )
          }}></FlatList>
        <SortBottomSheet _bottomSheetModalRef={bottomSheetModalRef_sort} />
        <FilterBottomSheet _bottomSheetModalRef={bottomSheetModalRef_filter} />
      </GestureHandlerRootView>
    </VStack>
  )
}

const RenderItemDoctorList: FC<{
  item: MOCK_DATA_DOCTOR_MODEL
  _CurrentLocation: LocationModel
}> = ({item, _CurrentLocation}) => {
  const Distance = geolib.getPreciseDistance(
    _CurrentLocation,
    item.locationPoint,
  )
  const Meters = Distance * 0.000621 * 1609.344

  return (
    <Box p={3}>
      <Pressable onPress={() => console.log("I'm Pressed")}>
        <Box
          rounded='lg'
          borderColor='coolGray.200'
          _light={{
            backgroundColor: 'white',
          }}
          h={290}
          style={Basestyles.baseShadow}>
          <VStack p={3} h={'100%'}>
            <Center>
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
                      uri: item.image,
                    }}
                    alt='image'
                  />
                </AspectRatio>
              </Box>
            </Center>
            <HStack justifyContent={'center'} alignItems={'center'}>
              <Box
                bg='white'
                w={'70%'}
                px={5}
                justifyContent={'center'}
                alignItems={'center'}>
                <Text color='coolGray.800' fontWeight='medium' fontSize='xl'>
                  {item.name}
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
                      {item.category}
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
                    {item.location}
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
                    {item.openingHours}
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
                  Distance from you : {Meters.toFixed(2)} M
                </Text>
              </HStack>
            </Box>
          </VStack>
        </Box>
      </Pressable>
    </Box>
  )
}

interface SortBottomSheetModal {
  _bottomSheetModalRef: any
}

const SortBottomSheet: FC<SortBottomSheetModal> = ({_bottomSheetModalRef}) => {
  // variables
  const snapPoints = useMemo(() => ['49.9%', '50%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  useEffect(() => {}, [])

  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal
          backdropComponent={backdropProps => (
            <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
          )}
          ref={_bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <VStack px={3}>
            <Text fontWeight={600} color={'#7e7e7e'} mb={1}>
              SORT BY
            </Text>
            <TouchableOpacity>
              <HStack py={2}>
                <Text fontWeight={600} fontSize={'lg'}>
                  Recommended
                </Text>
                <Spacer />
                <MaterialCommunityIcons
                  name='record-circle-outline'
                  size={25}
                  color={'black'}
                />
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity>
              <HStack py={2}>
                <Text fontWeight={600} fontSize={'lg'}>
                  Sort by area distance
                </Text>
                <Spacer />
                {/* <MaterialCommunityIcons
                  name='record-circle-outline'
                  size={25}
                  color={'black'}
                /> */}
              </HStack>
            </TouchableOpacity>
          </VStack>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

interface FilterBottomSheetModal {
  _bottomSheetModalRef: any
}

const FilterBottomSheet: FC<FilterBottomSheetModal> = ({
  _bottomSheetModalRef,
}) => {
  // variables
  const snapPoints = useMemo(() => [350, '70%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])
  const [categoryValue, setCategoryValue] = useState('')
  const [locationValue, setLocationValue] = useState('')

  const clearAllValue = () => {
    setCategoryValue('')
    setLocationValue('')
  }

  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal
          backdropComponent={backdropProps => (
            <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
          )}
          ref={_bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <VStack px={3}>
            <Box>
              <HStack justifyContent={'center'} alignItems={'center'}>
                <Text fontWeight={400} mb={2} fontSize={18}>
                  Filter
                </Text>
              </HStack>
              <TouchableOpacity onPress={clearAllValue}>
                <Text
                  fontWeight={400}
                  fontSize={15}
                  position={'absolute'}
                  right={0}
                  color={'#8C8C8C'}
                  top={-30}>
                  Reset
                </Text>
              </TouchableOpacity>
            </Box>
            <HStack py={3}>
              <Text fontWeight={400} fontSize={'lg'}>
                Category
              </Text>
              <Spacer />
              <Select
                selectedValue={categoryValue}
                minWidth='140'
                accessibilityLabel='Choose....'
                placeholder='Choose....'
                borderWidth={0}
                fontSize={15}
                fontWeight={400}
                p={-1}
                top={-3}
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size='5' />,
                }}
                mt={1}
                onValueChange={itemValue => setCategoryValue(itemValue)}>
                <Select.Item
                  label='General Practitioner'
                  value='General Practitioner'
                />
                <Select.Item label='Surgeon' value='Surgeon' />
                <Select.Item label='Pediatrician' value='Pediatrician' />
              </Select>
            </HStack>
            <HStack py={3}>
              <Text fontWeight={400} fontSize={'lg'}>
                Location
              </Text>
              <Spacer />
              <Select
                selectedValue={locationValue}
                minWidth='140'
                accessibilityLabel='Choose....'
                placeholder='Choose....'
                borderWidth={0}
                fontSize={15}
                fontWeight={400}
                p={-1}
                top={-3}
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size='5' />,
                }}
                mt={1}
                onValueChange={itemValue => setLocationValue(itemValue)}>
                <Select.Item label='Kowloon Bay' value='Kowloon Bay' />
                <Select.Item label='Kwun Tong' value='Kwun Tong' />
                <Select.Item label='Mongkok' value='Mongkok' />
                <Select.Item label='Shatin' value='Shatin' />
                <Select.Item label='Tsim Sha Tsui' value='Tsim Sha Tsui' />
                <Select.Item label='Whampoa' value='Whampoa' />
              </Select>
            </HStack>
          </VStack>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}
function useNavigationParam (arg0: string) {
  throw new Error('Function not implemented.')
}
