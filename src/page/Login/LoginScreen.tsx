import {ErrorMessage, Formik} from 'formik'
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  HStack,
  Icon,
  Input,
  Pressable,
  Slide,
  Spacer,
  Text,
  VStack,
  WarningOutlineIcon,
  useToast,
} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Yup from 'yup'
import {ThreeCirBox} from '../../components/ThreeCirBox'
import {navigateTo} from '../../components/RootNavigation'
import {getToken, login, uploadLocalStr} from '../../API'
import {SHA256} from 'crypto-js'
import {TokenModel} from '../../MODEL'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const LoginScreen = () => {
  let userSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
  })
  const [show, setShow] = useState(false)
  const [isOpenTop, setIsOpenTop] = useState<{open: boolean; message: string}>({
    open: false,
    message: '',
  })
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false)
  const toast = useToast()

  useEffect(() => {
    if (isOpenTop) {
      const timer = setTimeout(() => {
        setIsOpenTop({open: false, message: ''})
      }, 3000)
    }
  }, [isOpenTop])

  return (
    <VStack flex={1}>
      <Slide in={isOpenTop.open} placement='top' duration={100}>
        <Alert justifyContent='center' status={'success'}>
          <Alert.Icon />
          <Text color={'black'} fontWeight='medium'>
            {isOpenTop.message}
          </Text>
        </Alert>
      </Slide>
      <ThreeCirBox
        Title={'Sign in to your Account'}
        sTitle={'Sign in to your Account'}
      />
      <Box flex={1} bg={'white'} p={5}>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            setIsLoginLoading(true)
            const hash_ps = SHA256(values.password).toString()
            // console.log(values.password, hash_ps)
            login({email: values.email, password: hash_ps})
              .then(res => {
                setIsLoginLoading(false)
                uploadLocalStr(res.data)
                getToken()
                toast.show({
                  description: "Login Success"
                })
                navigateTo('Main', {})
              })
              .catch(err => {
                console.log(err)
                setIsLoginLoading(false)
                toast.show({
                  description: 'Incorrect email or password',
                  placement: 'top',
                })
              })
          }}
          validationSchema={userSchema}>
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
              <FormControl.Label pt={4}>Password</FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                onChangeText={handleChange('password')}
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
              {errors.password && (
                <HStack>
                  <WarningOutlineIcon
                    size={4}
                    mt={1}
                    mr={2}
                    color={'#FF3737'}
                  />
                  <Text color={'#FF3737'}>{errors.password}</Text>
                </HStack>
              )}
              <HStack pt={4}>
                <Spacer />
                <TouchableOpacity
                  onPress={() => {
                    navigateTo('ForgotPSScreen', {})
                  }}>
                  <Text color={'#1EADF1'}>Forgot Password?</Text>
                </TouchableOpacity>
              </HStack>
              <Box pt={4}>
                <Button
                  isLoading={isLoginLoading}
                  bg={'#1EADF1'}
                  onPress={() => {
                    handleSubmit()
                  }}>
                  <Text fontWeight={600} color='white'>
                    Login
                  </Text>
                </Button>
              </Box>
              <Divider
                my={10}
                _light={{
                  bg: 'muted.300',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              <HStack justifyContent={'center'}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigateTo('RegisterScreen', {})
                  }}>
                  <Text pl={2} color='#1EADF1'>
                    Register
                  </Text>
                </TouchableOpacity>
              </HStack>
            </FormControl>
          )}
        </Formik>
      </Box>
    </VStack>
  )
}
