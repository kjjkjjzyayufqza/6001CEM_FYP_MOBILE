import {HStack, Image, Input, Text, View} from 'native-base'
import React, {useCallback, useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChatMessageInput from '../../components/ChatMessageInput'

export const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [customInputMessage, setCustomInputMessage] = useState<string>('')

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello, What can i help you ?',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
          // avatar: 'https://placeimg.com/140/140/any',
        },
        // image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png',
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    console.log(messages)
    // messages[0].user._id = 0
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const renderSend = (props: any) => {
    return (
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
        <Send {...props} text={customInputMessage} containerStyle={{borderWidth: 0}}>
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
    )
  }

  const customInputToolbar = (props: any) => {
    // console.log(props.text)
    let c = renderSend(props)
    return (
      // <InputToolbar
      //   {...props}
      //   containerStyle={{
      //     backgroundColor: 'white',
      //     borderTopColor: '#E8E8E8',
      //     borderTopWidth: 1,
      //   }}
      //   renderSend={renderSend}
      // />
      <HStack space={3} w={'full'}>
        <View style={{width: '80%'}}>
          <ChatMessageInput
            onTextUpdate={e => {
              setCustomInputMessage(e)
            }}></ChatMessageInput>
        </View>
        {renderSend(props)}
      </HStack>
    )
  }

  const customBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        // textStyle={{
        //   right: {
        //     color: 'yellow',
        //   },
        // }}
        wrapperStyle={{
          left: {
            backgroundColor: '#FCFFFC',
          },
        }}
      />
    )
  }

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={true}
        renderAvatar={() => (
          <Image
            size={10}
            borderRadius={20}
            alt='icon'
            source={require('../../../public/img/botIcon.png')}></Image>
        )}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'TEST1',
        }}
        alwaysShowSend
        renderSend={props => renderSend(props)}
        renderBubble={props => customBubble(props)}
        renderInputToolbar={props => customInputToolbar(props)}
      />
    </View>
  )
}
