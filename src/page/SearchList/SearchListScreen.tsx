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
  Heading,
  Image,
  Pressable,
  Select,
  Spacer,
  Spinner,
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
  allDoctorCta,
  allLocation,
} from '../../MOCK'
import Location from '@react-native-community/geolocation'
import * as geolib from 'geolib'
import {LocationModel} from '../../MOCK/LocationPoint'
import {getDoctor} from '../../API'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {navigateTo} from '../../components/RootNavigation'

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

  const [currentLocation, setCurrentLocation] = useState<LocationModel>()

  const [doctorList, setDoctorList] = useState<MOCK_DATA_DOCTOR_MODEL[]>([])
  const [searchName, setSearchName] = useState<string>('')
  const [sortByTitle, setSortByTitle] = useState<string>()
  const [filterValue, setFilterValue] = useState<
    | {
        category: string
        location: string
      }
    | undefined
  >(undefined)
  const navigation = useNavigation()

  useEffect(() => {
    let temp_searchName: any = ''
    let temp_category: any = ''
    navigation.getState().routes.map(e => {
      if (e.name == 'SearchList') {
        const temp: any = e.params
        if (temp?.categories) {
          temp_category = temp?.categories
          getDoctor({category: temp_category})
            .then(res => {
              // console.log(res.data)
              setDoctorList(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          temp_searchName = temp
          setSearchName(temp_searchName)
          getDoctor({category: temp_category})
            .then(res => {
              // console.log(res.data)
              setDoctorList(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
  }, [])

  useEffect(() => {
    if (filterValue) {
      console.log(1)
      console.log(filterValue)
      getDoctor({
        name: searchName,
        category: filterValue?.category,
        location: filterValue?.location,
      })
        .then(res => {
          // console.log(res.data)
          setDoctorList(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [filterValue])

  useEffect(() => {
    if (searchName) {
      console.log(2)

      getDoctor({
        name: searchName,
        category: filterValue?.category,
        location: filterValue?.location,
      })
        .then(res => {
          // console.log(res.data)
          setDoctorList(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [searchName])

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
          <SearchInput
            bgColor='white'
            brColor={'gray.200'}
            _value={searchName}
            _onSubmit={e => {
              setSearchName(e)
            }}
          />
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
                  <Text>{sortByTitle ?? 'Sort By'}</Text>
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
            Show results : {doctorList.length}
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
        <SortBottomSheet
          _bottomSheetModalRef={bottomSheetModalRef_sort}
          onClick={e => {
            setSortByTitle(e)
          }}
        />
        <FilterBottomSheet
          _bottomSheetModalRef={bottomSheetModalRef_filter}
          onClick={(category, location) => {
            console.log('click了')
            setFilterValue({
              category: category as any,
              location: location as any,
            })
          }}
        />
      </GestureHandlerRootView>
    </VStack>
  )
}

const RenderItemDoctorList: FC<{
  item: MOCK_DATA_DOCTOR_MODEL
  _CurrentLocation?: LocationModel
}> = ({item, _CurrentLocation}) => {
  console.log(_CurrentLocation)
  const [Distance, setDistance] = useState<number | undefined>()
  useEffect(() => {
    if (_CurrentLocation) {
      setDistance(
        geolib.getPreciseDistance(_CurrentLocation, item.locationPoint) * 0.000621,
      )
    }
  })

  let disEle = (
    <HStack>
      <MaterialIcons name={'location-on'} size={15} style={{marginTop: 3}} />
      <Text fontSize='sm' color='gray.400'>
        Distance from you : {Distance && Distance.toFixed(2)} KM
      </Text>
    </HStack>
  )

  if (!_CurrentLocation) {
    disEle = (
      <HStack space={2}>
        <Spinner accessibilityLabel='Loading posts' color='gray.500'/>
        <Heading color='gray.500' fontSize='md'>
          Loading
        </Heading>
      </HStack>
    )
  }

  return (
    <Box p={3}>
      <Pressable
        onPress={() => {
          navigateTo('Detail', item)
        }}>
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
              {disEle}
            </Box>
          </VStack>
        </Box>
      </Pressable>
    </Box>
  )
}

interface SortBottomSheetModal {
  _bottomSheetModalRef: any
  onClick: (e: string) => void
}

const SortBottomSheet: FC<SortBottomSheetModal> = ({
  _bottomSheetModalRef,
  onClick,
}) => {
  // variables
  const snapPoints = useMemo(() => ['49.9%', '50%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index)
  }, [])

  const [selectItem, setSelectItem] = useState<number>()

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
              Sort By
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSelectItem(0)
                onClick('Recommended')
              }}>
              <HStack py={2}>
                <Text fontWeight={600} fontSize={'lg'}>
                  Recommended
                </Text>
                <Spacer />
                {selectItem == 0 && (
                  <MaterialCommunityIcons
                    name='record-circle-outline'
                    size={25}
                    color={'black'}
                  />
                )}
              </HStack>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectItem(1)
                onClick('Sort by area distance')
              }}>
              <HStack py={2}>
                <Text fontWeight={600} fontSize={'lg'}>
                  Sort by area distance
                </Text>
                <Spacer />
                {selectItem == 1 && (
                  <MaterialCommunityIcons
                    name='record-circle-outline'
                    size={25}
                    color={'black'}
                  />
                )}
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
  onClick: (category?: string, location?: string) => void
}

const FilterBottomSheet: FC<FilterBottomSheetModal> = ({
  _bottomSheetModalRef,
  onClick,
}) => {
  // variables
  const snapPoints = useMemo(() => [350, '70%'], [])

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index)
  }, [])
  const [categoryValue, setCategoryValue] = useState<string>()
  const [locationValue, setLocationValue] = useState<string>()

  useEffect(() => {
    if (categoryValue || locationValue) {
      onClick(categoryValue, locationValue)
    }
  }, [categoryValue, locationValue])

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
              <TouchableOpacity
                onPress={() => {
                  setCategoryValue('')
                  setLocationValue('')
                  onClick('', '')
                }}>
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
                {allDoctorCta.map((e, i) => {
                  return <Select.Item key={i} label={e} value={e} />
                })}
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
                {allLocation.map((e, i) => {
                  return <Select.Item key={i} label={e} value={e} />
                })}
              </Select>
            </HStack>
          </VStack>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}
