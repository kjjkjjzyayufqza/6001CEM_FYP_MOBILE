import {Button, HStack, Input, Text, View, useToast} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {Send} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Basestyles} from '../../Styles/Styles'
import {Formik} from 'formik'
import {createNavigationContainerRef, useIsFocused} from '@react-navigation/native'
import {navigateTo} from './RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface SearchInputModel {
  bgColor?: string
  brColor?: string
  _value?: string
  _onSubmit: (value: any) => void
  _isLogin?: boolean
}

export const SearchInput: React.FC<SearchInputModel> = ({
  bgColor,
  brColor,
  _value,
  _onSubmit,
  _isLogin,
}) => {
  const toast = useToast()
  const [isLogin, setIsLogin] = useState<boolean>()
  const isFocused = useIsFocused()

  useEffect(() => {
    setIsLogin(_isLogin)
  }, [_isLogin])

  return (
    <Formik
      enableReinitialize
      initialValues={{searchValue: _value}}
      onSubmit={values => {
        // console.log(values)
        _onSubmit(values.searchValue)
      }}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <HStack space={4}>
          <View flex={1}>
            <Input
              size='md'
              onChangeText={handleChange('searchValue')}
              onBlur={handleBlur('searchValue')}
              value={values.searchValue}
              placeholder='Search'
              focusOutlineColor={'#E8E8E8'}
              bgColor={bgColor ?? '#F3F3F3'}
              px='10px'
              h='50px'
              borderColor={brColor ?? '#F3F3F3'}
              borderWidth='1px'
              borderRadius={8}
              fontSize={16}
              fontWeight={400}
              InputLeftElement={
                <TouchableOpacity onPress={handleSubmit}>
                  <View style={{marginTop: 8}}>
                    <Icon
                      name='search'
                      style={{
                        marginBottom: 8,
                        marginLeft: 10,
                      }}
                      size={18}
                      color='#8E8E8E'
                    />
                  </View>
                </TouchableOpacity>
              }
              clearButtonMode='always'
            />
          </View>
          <Button
            onPress={() => {
              if (!isLogin) {
                toast.show({
                  title: 'Must be logged in to use',
                  placement: 'top',
                })
              } else {
                handleSubmit()
              }
            }}
            bg={isLogin ? '#4191E7' : '#C8C8C8'}
            rounded={6}>
            Search
          </Button>
        </HStack>
      )}
    </Formik>
  )
}

export default SearchInput
