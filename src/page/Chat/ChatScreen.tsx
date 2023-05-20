import {
  Button,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  useToast,
} from 'native-base'
import React, {useCallback, useEffect, useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Message,
  MessageProps,
  Send,
} from 'react-native-gifted-chat'
import Icon from 'react-native-vector-icons/FontAwesome'
import ChatMessageInput from '../../components/ChatMessageInput'
import {postBotMessage} from '../../API'
import {BotMessageBox, makeid} from '../../components/BotMessageBox'
import {QuickReplies} from 'react-native-gifted-chat/lib/QuickReplies'
import PubSub from 'pubsub-js'
export const ChatScreen = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  // const [customInputMessage, setCustomInputMessage] = useState<string>('')

  const [needClearValue, setNeedClearValue] = useState<boolean>(false)
  const toast = useToast()
  useEffect(() => {
    const defMessage: IMessage[] = [
      {
        _id: 1,
        text: (
          <View>
            <Text>Hello, What can i help you?</Text>
          </View>
        ) as any,
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
        quickReplies: {
          type: 'radio', // or 'checkbox',
          values: [
            {
              title: 'My skin is itchy, can you help me?',
              value: 'My skin is itchy, can you help me?',
            },
            {
              title: 'My stomach feels uncomfortable.',
              value: 'My stomach feels uncomfortable.',
            },
            {
              title:
                'I want to upload pictures of my skin to tell what skin problems I have.',
              value:
                'I want to upload pictures of my skin to tell what skin problems I have.',
            },
          ],
        },
      },
    ]

    setMessages(defMessage)

    let ClearAllMessage = (msg: any, data: any) => {
      toast.closeAll()
      setMessages(defMessage)
      toast.show({
        description: 'Dialogue has been reset',
      })
    }
    let QuickSendMessage = (msg: any, data: any) => {
      onSend([
        {
          _id: makeid(20),
          createdAt: new Date(),
          text: data,
          user: {_id: 1, name: 'TEST1'},
        },
      ])
    }

    let onSpeechText = async (msg: any, data: any) => {}

    let addCustomMsg = async (msg: any, data: any) => {
      onSend([
        {
          _id: makeid(20),
          createdAt: new Date(),
          text: data,
          user: {_id: 0, name: 'Bot'},
          disable: true,
        },
      ])
    }

    // add the function to the list of subscribers for a particular topic
    // we're keeping the returned token, in order to be able to unsubscribe
    // from the topic later on
    let token = PubSub.subscribe('ClearAllMessage', ClearAllMessage)
    let quickSend = PubSub.subscribe('QuickSendMessage', QuickSendMessage)
    let speechText = PubSub.subscribe('onSpeechText', onSpeechText)
    let _addCustomMsg = PubSub.subscribe('addCustomMsg', addCustomMsg)
    return () => {
      setMessages([])
      PubSub.unsubscribe(token)
      PubSub.unsubscribe(quickSend)
      PubSub.unsubscribe(speechText)
      PubSub.unsubscribe(_addCustomMsg)
    }
  }, [])

  const onSend = useCallback((messages: any[] = []) => {
    setNeedClearValue(true)
    const messageString = messages[0]?.text
    const isDeSend = messages[0]?.disable
    let onlyUpload = false
    if (
      messageString ==
      'I want to upload pictures of my skin to tell what skin problems I have.'
    ) {
      onlyUpload = true
    }
    if (!isDeSend) {
      setMessages(previousMessages => {
        messages = [
          {
            _id: makeid(20),
            createdAt: new Date(),
            text: (
              <BotMessageBox
                sendMessage={messageString}
                onlyUpload={onlyUpload}
              />
            ),
            user: {_id: 0, name: 'Bot'},
          },
          ...messages,
        ]
        return GiftedChat.append(previousMessages, messages)
      })
    } else {
      setMessages(previousMessages => {
        return GiftedChat.append(previousMessages, messages)
      })
    }
  }, [])

  const customInputToolbar = (props: any) => {
    // console.log(props.text)
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
      <View>
        <ChatMessageInput
          props={props}
          clearValue={needClearValue}
          onClearValue={() => {
            setNeedClearValue(false)
          }}></ChatMessageInput>
      </View>
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
            // overflow: 'hidden'
          },
        }}
        renderMessageText={e => {
          const user: string = e.currentMessage?.user.name ?? 'abc'
          if (user == 'Bot') {
            return <View p={2}>{e.currentMessage?.text}</View>
          } else {
            return (
              <View p={2}>
                <Text color={'white'}>{e.currentMessage?.text}</Text>
              </View>
            )
          }
        }}
      />
    )
  }

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        onQuickReply={quickReply => {
          const value = {
            _id: makeid(20),
            createdAt: new Date(),
            text: quickReply[0].value,
            user: {_id: 1, name: 'TEST1'},
          }
          onSend([value])
        }}
        messages={messages}
        onLongPress={() => {}}
        renderUsernameOnMessage={true}
        renderAvatar={() => (
          <Image
            size={10}
            borderRadius={20}
            alt='icon'
            source={require('../../../public/img/botIcon.png')}></Image>
        )}
        onSend={messages => {
          // console.log(messages)
          onSend(messages)
        }}
        user={{
          _id: 1,
          name: 'TEST1',
        }}
        alwaysShowSend
        // renderSend={props => renderSend(props)}
        renderBubble={props => customBubble(props)}
        renderInputToolbar={props => customInputToolbar(props)}
      />
    </View>
  )
}
