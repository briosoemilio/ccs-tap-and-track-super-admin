export interface GetUserDetailsRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface GetAllUsersRes {
  res: UserDetails;
  statusCode: number;
  message: string;
  data: {
    data: UserDetails[];
    total: number;
    page: number;
    itemsPerPage: number;
  };
}

export interface UserDetails {
  id: number;
  uuid: string;
  email: string;
  password: string;
  name: string;
  role: string;
  yearSection: null;
  idNumber: string;
  createdAt: Date;
  updatedAt: Date;
  isLogged: boolean;
  isArchived: boolean;
  cardKey: string;
}

export interface ChangeSectionRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface ChangePasswordRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface CreateUserReq {
  email: string;
  password?: string;
  name: string;
  role: string;
  yearSection: string;
  idNumber: string;
}

export interface RegisterRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}

export interface UpdateUserReq {
  email: string;
  name: string;
  yearSection?: string;
  idNumber?: string;
  id: number;
}

export interface UpdateUserRes {
  statusCode: number;
  message: string;
  data: UserDetails;
}
