import {HStack, Input, View} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {Send} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'

interface ChatMessageInputModel {
  props: any
  clearValue: boolean
  onClearValue: () => void
}

export const ChatMessageInput: React.FC<ChatMessageInputModel> = ({
  clearValue,
  props,
  onClearValue
}) => {
  const [value, setValue] = useState('')
  const [customInputMessage, setCustomInputMessage] = useState<string>('')
  const handleChange = (text: string) => {
    setValue(text)
    setCustomInputMessage(text)
  }

  useEffect(() => {
    console.log(clearValue)
    if (clearValue) {
      setValue('')
      setCustomInputMessage('')
      onClearValue()
    }
    return () => {
      
    }
  }, [clearValue])

  return (
    <HStack>
      <View style={{width: '80%'}}>
        <Input
          size='md'
          value={value}
          onChangeText={handleChange}
          placeholder='md Input'
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{marginTop: 8}}>
            <Icon
              name='paperclip'
              style={{
                marginBottom: 10,
                marginRight: 10,
                transform: [{rotateY: '180deg'}],
              }}
              size={25}
              color='blue'
            />
          </View>
        </TouchableOpacity>
        <Send
          {...props}
          text={customInputMessage}
          containerStyle={{borderWidth: 0}}>
          <View>
            <Icon
              name='send'
              style={{marginBottom: 10, marginRight: 10}}
              size={25}
              color='orange'
            />
          </View>
        </Send>
      </View>
    </HStack>
  )
}

export default ChatMessageInput
