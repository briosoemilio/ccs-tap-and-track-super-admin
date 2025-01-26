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
