type RegistrationStatus = "onboarded" | "registered" | "approved";
export interface User {
  name: string;
  userName: string;
  email: string;
  picture?: string;
  readonly userId: string;
  readonly _id: string;
  mobileNumber?: string;
  readonly createdAt: Number;
  isAdmin: boolean;
  isMaster: boolean;
  verified: boolean;
  email_verified: boolean;
  token: string;
  registrationStatus: RegistrationStatus;
}

export interface State {
  error: any;
  loading: boolean;
  user: User | null;
  getUserByUserName: (userName: string) => void;
  getUserByEmail: (user: User) => Promise<User | undefined>;
  logOut: () => void;
  processError: (error: any) => void;
  addUser: (user: User) => void;
  updateUser: (user: User) => void;
  commitUser: (user: User) => void;
  saveGoogleUserInfo: (googleUser: any) => void;
}
