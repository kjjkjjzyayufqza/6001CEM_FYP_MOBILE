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
  ScrollView,
  Spacer,
  Text,
  VStack,
  WarningOutlineIcon,
  useToast,
} from 'native-base'
import React, {useState} from 'react'
import {TouchableOpacity} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Yup from 'yup'
import {ThreeCirBox} from '../../components/ThreeCirBox'
import {navigateTo} from '../../components/RootNavigation'
import {login, register, uploadLocalStr} from '../../API'
import {SHA256} from 'crypto-js'

export const RegisterScreen = () => {
  let userSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'User name length must be more than 1')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.'),
    // .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })
  const [show, setShow] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string>()
  const toast = useToast();
  return (
    <ScrollView bg={'white'}>
      <VStack flex={1}>
        <ThreeCirBox Title={'Register'} sTitle={'Create your account'} />
        <Box flex={1} bg={'white'} p={5}>
          <Formik
            initialValues={{name: '', email: '', password: ''}}
            onSubmit={values => {
              const hash_ps = SHA256(values.password).toString()
              register({
                name: values.name,
                email: values.email,
                password: hash_ps,
              })
                .then(res => {
                  console.log(res.data)
                  login({email: values.email, password: hash_ps})
                    .then(lres => {
                      uploadLocalStr(lres.data)
                      navigateTo('Main', {})
                    })
                    .catch(lerr => {
                      console.log('register then login error')
                    })
                })
                .catch(err => {
                  console.log(err)
                  if (err.response.data) {
                    toast.show({
                      title: err.response.data.detail,
                      placement: 'top',
                    })
                  }else{
                    toast.show({
                      title: 'Network Error',
                      placement: 'top',
                    })
                  }
                })
            }}
            validationSchema={userSchema}>
            {({handleChange, handleBlur, handleSubmit, values, errors}) => (
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input placeholder='Name' onChangeText={handleChange('name')} />
                {errors.name && (
                  <HStack>
                    <WarningOutlineIcon
                      size={4}
                      mt={1}
                      mr={2}
                      color={'#FF3737'}
                    />
                    <Text color={'#FF3737'}>{errors.name}</Text>
                  </HStack>
                )}
                <FormControl.Label pt={4}>Email</FormControl.Label>
                <Input
                  placeholder='Email'
                  onChangeText={handleChange('email')}
                />
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

                <Box pt={10}>
                  <Button
                    bg={'#1EADF1'}
                    onPress={() => {
                      handleSubmit()
                    }}>
                    <Text fontWeight={600} color='white'>
                      Register
                    </Text>
                  </Button>
                </Box>
              </FormControl>
            )}
          </Formik>
        </Box>
      </VStack>
    </ScrollView>
  )
}
