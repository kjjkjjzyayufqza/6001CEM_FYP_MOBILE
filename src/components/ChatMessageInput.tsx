import {HStack, Input, View} from 'native-base'
import React from 'react'

interface ChatMessageInputModel {
  onTextUpdate: (e: string) => void
}

export const ChatMessageInput: React.FC<ChatMessageInputModel> = ({
  onTextUpdate,
}) => {
  const [value, setValue] = React.useState('')

  const handleChange = (text: string) => {
    setValue(text)
    onTextUpdate(text)
  }

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
    </HStack>
  )
}

export default ChatMessageInput
