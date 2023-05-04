import axios, {AxiosResponse} from 'axios';
import {BotMessageResponseModel} from '../MODEL';

const BaseURL = 'https://fyp-chatbot-python.azurewebsites.net/';

export function postBotMessage(
  Message: string,
): Promise<AxiosResponse<BotMessageResponseModel>> {
  let data = {
    MessageStr: Message || 'hi',
  };
  return axios.post(BaseURL + 'Chat', data);
}

export function postImage(
  ImageByte: FormData,
): Promise<AxiosResponse<BotMessageResponseModel>> {
  const config = {
    headers: {'content-type': 'multipart/form-data'},
  };
  return axios.post(BaseURL + 'files', ImageByte, config);
}
