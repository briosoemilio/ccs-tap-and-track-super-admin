export interface LoginRes {
  statusCode: number;
  message: string;
  data: LoginResData;
}

export interface LoginResData {
  token: string;
}
