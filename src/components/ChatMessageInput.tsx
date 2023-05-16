import {
  Actionsheet,
  Box,
  Button,
  Center,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
  View,
  useDisclose,
} from 'native-base'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {Send} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Basestyles} from '../../Styles/Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PubSub from 'pubsub-js'

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
  const {isOpen, onOpen, onClose} = useDisclose()
  const handleChange = (text: string) => {
    setValue(text)
    setCustomInputMessage(text)
  }

  const quickSendMsgList = [
    'I want to upload pictures of my skin to tell what skin problems I have.',
    'My skin feels itchy, how can I solve it?',
    'My head feels painful.',
  ]

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
    <VStack>
      <HStack justifyContent={'center'}>
        <View style={{width: '85%'}}>
          <Input
            size='md'
            value={value}
            onChangeText={handleChange}
            placeholder='Input here...'
            focusOutlineColor={'#E8E8E8'}
            bgColor='white'
            px='10px'
            h='40px'
            borderColor='#E5E5E5'
            borderWidth='1px'
            borderRadius={20}
            fontSize={16}
            fontWeight={400}
            InputRightElement={
              <HStack>
                <TouchableOpacity
                  onPress={() => {
                    onOpen()
                  }}>
                  <View style={{marginTop: 8}}>
                    <Icon
                      name='caret-up'
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
                <TouchableOpacity onPress={() => {
                  PubSub.publish('onSpeechText', "hi")
                }}>
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
              </HStack>
            }
          />
        </View>
        <View
          bg={'#33A6B8'}
          borderRadius={30}
          w={'40px'}
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
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Center w='100%' h={60} px={4}>
            <Text
              fontSize='16'
              color='gray.500'
              _dark={{
                color: 'gray.300',
              }}>
              Quick Send
            </Text>
          </Center>
          {quickSendMsgList.map((e, i) => {
            return (
              <Actionsheet.Item
                key={i}
                onPress={() => {
                  PubSub.publish('QuickSendMessage', e)
                  onClose()
                }}>
                {e}
              </Actionsheet.Item>
            )
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  )
}

export default ChatMessageInput
