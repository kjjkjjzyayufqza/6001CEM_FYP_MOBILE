import axios, {AxiosResponse} from 'axios';
import {BotImageResponseModel, BotMessageResponseModel} from '../MODEL';

const BaseURL = 'https://fyp-chatbot-python.azurewebsites.net/';
const DevURL = 'http://10.0.2.2:8000/';

const instance = axios.create({
  baseURL: __DEV__ ? DevURL : BaseURL,
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export function postBotMessage(
  Message: string,
): Promise<AxiosResponse<BotMessageResponseModel>> {
  let data = {
    MessageStr: Message || 'hi',
  };
  return instance.post('Chat', data);
}

export function postImage(ImageByte: FormData): Promise<AxiosResponse<BotImageResponseModel>> {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return instance.post('files', ImageByte, config);
}
