import axios, {AxiosResponse} from 'axios';
import {
  BotImageResponseModel,
  BotMessageResponseModel,
  FindDoctorModel,
  LoginModel,
  RegisterModel,
  TokenModel,
} from '../MODEL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MOCK_DATA_DOCTOR_MODEL} from '../MOCK';

const BaseURL = 'https://fyp-chatbot-python.azurewebsites.net/';
const DevURL = 'http://10.0.2.2:8000/';

const instance = axios.create({
  baseURL: __DEV__ ? DevURL : BaseURL,
  timeout: 10000,
  headers: {},
});

// 添加请求拦截器
instance.interceptors.request.use(
  async function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    const isLogin = await AsyncStorage.getItem('isLogin');
    if (isLogin == 'true') {
      config.headers.Authorization = `Bearer ${
        (await getToken()).access_token
      }`;
      // console.log('我做完了', config.headers.Authorization);
    }
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
    if (error.response) {
      if (error.response?.status == 401) {
        console.log('401了');
        AsyncStorage.setItem('isLogin', 'false');
        AsyncStorage.setItem('token', '');
      }
    }
    return Promise.reject(error);
  },
);

export const uploadLocalStr = (response: TokenModel) => {
  AsyncStorage.setItem('isLogin', 'true');
  AsyncStorage.setItem('token', JSON.stringify(response));
};

export const getToken = (): Promise<TokenModel> => {
  return AsyncStorage.getItem('token')
    .then((res: any) => {
      try {
        // console.log(JSON.parse(res));
        return JSON.parse(res);
      } catch (e) {
        // console.log('getToken error');
        return 'error token';
      }
    })
    .catch(err => {});
};

export function postBotMessage(
  Message: string,
): Promise<AxiosResponse<BotMessageResponseModel>> {
  let data = {
    MessageStr: Message || 'hi',
  };
  return instance.post('Chat', data);
}

export function postImage(
  ImageByte: FormData,
): Promise<AxiosResponse<BotImageResponseModel>> {
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  return instance.post('files', ImageByte, config);
}

export function login({
  email,
  password,
}: LoginModel): Promise<AxiosResponse<TokenModel>> {
  const data = {
    username: email,
    password: password,
  };
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return instance.post('Token', data, {headers});
}

export function register({
  name,
  email,
  password,
}: RegisterModel): Promise<AxiosResponse<TokenModel>> {
  const data = {
    name,
    email,
    password,
  };
  return instance.post('Register', data);
}

export function getDoctor({
  name,
  category,
  location,
}: FindDoctorModel): Promise<AxiosResponse<MOCK_DATA_DOCTOR_MODEL[]>> {
  const params = {
    name,
    category,
    location,
  };
  return instance.get('FindDoctor', {params});
}

export function getUser(): Promise<
  AxiosResponse<{name: string; email: string}>
> {
  return instance.get('User');
}
