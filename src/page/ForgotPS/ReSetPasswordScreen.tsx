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

export const ReSetPasswordScreen = () => {
  let Schema = Yup.object().shape({
    otp: Yup.string().required('Required'),
    newpassword: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })

  const [show, setShow] = useState(false)

  return (
    <VStack flex={1}>
      <ThreeCirBox
        Title={'OTP Verification'}
        sTitle={'Check your email to see the verification code'}
      />
      <Box flex={1} bg={'white'} p={5}>
        <Formik
          initialValues={{otp: '', newpassword: ''}}
          onSubmit={values => {
            console.log(values)
            navigateTo('Main',{})
          }}
          validationSchema={Schema}>
          {({handleChange, handleBlur, handleSubmit, values, errors}) => (
            <FormControl>
              <FormControl.Label>One Time Password</FormControl.Label>
              <Input placeholder='OTP' onChangeText={handleChange('otp')} />
              {errors.otp && (
                <HStack>
                  <WarningOutlineIcon
                    size={4}
                    mt={1}
                    mr={2}
                    color={'#FF3737'}
                  />
                  <Text color={'#FF3737'}>{errors.otp}</Text>
                </HStack>
              )}
              <FormControl.Label pt={4}>New Password</FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                onChangeText={handleChange('newpassword')}
                InputRightElement={
                  <Pressable onPress={() => setShow(!show)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={show ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr='2'
                      color='muted.400'
                    />
                  </Pressable>
                }
                placeholder='Password'
              />
              {errors.newpassword && (
                <HStack>
                  <WarningOutlineIcon
                    size={4}
                    mt={1}
                    mr={2}
                    color={'#FF3737'}
                  />
                  <Text color={'#FF3737'}>{errors.newpassword}</Text>
                </HStack>
              )}
              <Divider
                my={10}
                _light={{
                  bg: 'muted.300',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              <Box pt={4}>
                <Button bg={'#1EADF1'} onPress={() => {
                  handleSubmit()
                }}>
                  <Text fontWeight={600} color='white'>
                    Done
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
