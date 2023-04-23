import {HStack, Input, Text, View} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {Send} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Basestyles} from '../../Styles/Styles'

interface ChatMessageInputModel {
  props: any
  clearValue: boolean
  onClearValue: () => void
}

export const ChatMessageInput: React.FC<ChatMessageInputModel> = ({
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
    <HStack justifyContent={'center'}>
      <View style={{width: '85%'}}>
        <Input
          size='md'
          value={value}
          onChangeText={handleChange}
          placeholder='md Input'
          focusOutlineColor={'#E8E8E8'}
          bgColor='white'
          px='10px'
          h='40px'
          borderColor='#E5E5E5'
          borderWidth='1px'
          borderRadius={20}
          fontSize={16}
          height={24}
          fontWeight={400}
          InputRightElement={
            <TouchableOpacity onPress={() => {}}>
              <View style={{marginTop: 8}}>
                <Icon
                  name='microphone'
                  style={{
                    marginBottom: 8,
                    marginRight: 20,
                    transform: [{rotateY: '180deg'}],
                  }}
                  size={18}
                  color='#8E8E8E'
                />
              </View>
            </TouchableOpacity>
          }
        />
      </View>
      <View
        bg={'#33A6B8'}
        borderRadius={30}
        w={'10%'}
        h='40px'
        ml={2}
        justifyContent={'center'}>
        <Send
          {...props}
          text={customInputMessage}
          containerStyle={{borderWidth: 0}}>
          <Icon
            name='send'
            style={{marginBottom: 12, marginRight: 0, marginLeft: 8}}
            size={20}
            color='white'
          />
        </Send>
      </View>
    </HStack>
  )
}

export default ChatMessageInput
