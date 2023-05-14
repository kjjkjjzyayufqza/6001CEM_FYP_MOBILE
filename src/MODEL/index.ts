export interface BotMessageResponseModel {
  result?: boolean;
  botMessage?: {
    message?: string;
    tag?: string;
    description?: string;
    suggestionsText?: string;
    suggestions?: string[];
  };
}

export interface BotImageResponseModel {
  result?: boolean;
  message?: string;
  top5Prediction?: any[];
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  name: string;
  email: string;
  password: string;
}
export interface TokenModel {
  access_token: string;
  token_type: string;
}

export interface FindDoctorModel {
  name?: string;
  category?: string;
  location?: string;
}
