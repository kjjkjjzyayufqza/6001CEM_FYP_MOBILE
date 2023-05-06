import {Button, HStack, Input, Text, View} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {Send} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Basestyles} from '../../Styles/Styles'
import {Formik} from 'formik'
import {createNavigationContainerRef} from '@react-navigation/native'
import { navigateTo } from './RootNavigation'

interface SearchInputModel {
  bgColor?: string
  brColor?: string
}

export const SearchInput: React.FC<SearchInputModel> = ({bgColor, brColor}) => {
  useEffect(() => {
    return () => {}
  }, [])

  return (
    <Formik
      initialValues={{searchValue: ''}}
      onSubmit={values => {
        console.log(values)
        navigateTo('SearchList', {userName: 'aa'})
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
          <Button onPress={handleSubmit} bg='#4191E7' rounded={6}>
            Search
          </Button>
        </HStack>
      )}
    </Formik>
  )
}

export default SearchInput
