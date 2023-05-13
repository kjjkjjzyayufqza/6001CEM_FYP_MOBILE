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
