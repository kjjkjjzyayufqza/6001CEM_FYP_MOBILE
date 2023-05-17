import {
  AspectRatio,
  Box,
  Button,
  Divider,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  View,
} from 'native-base'
import React, {FC, useEffect, useState} from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {MOCK_DATA_DOCTOR_MODEL} from '../../MOCK'
import {useNavigation} from '@react-navigation/native'

export const Detail = () => {
  const [doctor, setDoctor] = useState<MOCK_DATA_DOCTOR_MODEL>()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.getState().routes.map(e => {
      if (e.name == 'Detail') {
        const temp: MOCK_DATA_DOCTOR_MODEL = e.params
        if (temp) {
          setDoctor(temp)
        } else {
        }
      }
    })
  }, [])

  return (
    <ScrollView bg={'white'}>
      <AspectRatio ratio={4 / 5}>
        {doctor?.image && (
          <Image
            resizeMode='cover'
            source={{
              uri: doctor?.image,
            }}
            alt='Picture of a Flower'
          />
        )}
      </AspectRatio>
      <Box
        bg={'white'}
        w={'100%'}
        h={'100%'}
        borderTopRadius={40}
        top={'-200px'}
        shadow={'9'}
        p={7}>
        <VStack>
          <HStack justifyContent={'space-between'}>
            <VStack>
              <Text fontSize={'20px'} fontWeight={700}>
                {doctor?.name}
              </Text>
              <Text fontSize={'15px'} color='gray.400'>
                {doctor?.category}
              </Text>

            </VStack>
            <Button bg={'#4AC18E'} rounded={10}>
              <MaterialCommunityIcons name='phone' size={30} color={'white'} />
            </Button>
          </HStack>
          <Divider my={6} />
          <Text fontSize={'18px'} fontWeight={700}>
            Phone
          </Text>
          <Text fontSize={'15px'} color='gray.400'>
            {doctor?.mobile}
          </Text>
          <Text fontSize={'18px'} fontWeight={700} mt={5}>
            About
          </Text>
          <Text fontSize={'15px'} color='gray.400'>
            {doctor?.about}
          </Text>
          <Text fontSize={'18px'} fontWeight={700} mt={5}>
            Location
          </Text>
          <Text fontSize={'15px'} color='gray.400'>
            {doctor?.location}
          </Text>
          <Text fontSize={'18px'} fontWeight={700} mt={5}>
            Working hours
          </Text>
          <Text fontSize={'15px'} color='gray.400'>
            {doctor?.openingHours}
          </Text>
          <Text fontSize={'18px'} fontWeight={700} mt={5}>
            Stats
          </Text>
          <HStack justifyContent={'center'} space={'80px'}>
            <VStack>
              <HStack alignItems={'flex-end'} space={1}>
                <Text fontSize={'20px'} fontWeight={700}>
                  {doctor?.experience.split('years')[0]}
                </Text>
                <Text fontSize={'13px'} fontWeight={500} mb={'3px'}>
                  years
                </Text>
              </HStack>
              <Text fontSize={'15px'} color='gray.400'>
                Experience
              </Text>
            </VStack>
            <VStack>
              <HStack alignItems={'flex-end'} space={1}>
                <Text fontSize={'20px'} fontWeight={700}>
                  {doctor?.certifications}
                </Text>
              </HStack>
              <Text fontSize={'15px'} color='gray.400'>
                Certifications
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </ScrollView>
  )
}
