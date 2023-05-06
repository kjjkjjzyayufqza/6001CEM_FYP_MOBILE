import {ErrorMessage, Formik} from 'formik'
import {
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  Pressable,
  Spacer,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base'
import React, {useState} from 'react'
import {TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Yup from 'yup'
import {ThreeCirBox} from '../../components/ThreeCirBox'
import { navigateTo } from '../../components/RootNavigation'

export const ForgotPSScreen = () => {
  let emailSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
  })

  return (
    <VStack flex={1}>
      <ThreeCirBox
        Title={'Forgot Password'}
        sTitle={'Enter your email to reset password'}
      />
      <Box flex={1} bg={'white'} p={5}>
        <Formik
          initialValues={{email: '', newpassword: ''}}
          onSubmit={values => {
            console.log(values)
            navigateTo('ReSetPasswordScreen',{})
          }}
          validationSchema={emailSchema}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input placeholder='Email' onChangeText={handleChange('email')} />
              {errors.email && (
                <HStack>
                  <WarningOutlineIcon
                    size={4}
                    mt={1}
                    mr={2}
                    color={'#FF3737'}
                  />
                  <Text color={'#FF3737'}>Incorrect email format</Text>
                </HStack>
              )}
              <Box>
                <Text mt={2} color='#7e7e7e'>
                  We will send a one-time verification code to your email
                  address, please check your spam.
                </Text>
              </Box>
              <Box pt={'200px'}>
                <Button
                  bg={'#1EADF1'}
                  onPress={() => {
                    handleSubmit()
                  }}>
                  <Text fontWeight={600} color='white'>
                    Continue
                  </Text>
                </Button>
              </Box>
            </FormControl>
          )}
        </Formik>
      </Box>
    </VStack>
  )
}
