interface From {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  language_code: string;
}

interface CallbackQuery {
  id: string;
  from: From;
}

export interface AppUpdate {
  callback_query: CallbackQuery
}
