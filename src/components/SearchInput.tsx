import {HStack, Input, Text, View} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {Send} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Basestyles} from '../../Styles/Styles'

interface SearchInputModel {
  props: any
  clearValue: boolean
  onClearValue: () => void
}

export const SearchInput: React.FC<SearchInputModel> = ({
  clearValue,
  props,
  onClearValue,
}) => {
  const [value, setValue] = useState('')
  const [customInputMessage, setCustomInputMessage] = useState<string>('')
  const handleChange = (text: string) => {
    setValue(text)
    setCustomInputMessage(text)
  }

  useEffect(() => {
    // console.log(clearValue)
    if (clearValue) {
      setValue('')
      setCustomInputMessage('')
      onClearValue()
    }
    return () => {}
  }, [clearValue])

  return (
    <HStack flex={1}>
      <View flex={1}>
        <Input
          size='md'
          value={value}
          onChangeText={handleChange}
          placeholder='Search'
          focusOutlineColor={'#E8E8E8'}
          bgColor='#F3F3F3'
          px='10px'
          h='50px'
          borderColor='#F3F3F3'
          borderWidth='1px'
          borderRadius={8}
          fontSize={16}
          fontWeight={400}
          InputLeftElement={
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
          }
        />
      </View>
    </HStack>
  )
}

export default SearchInput
