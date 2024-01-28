export class InvalidCredentials extends Error {}

export interface BasicUserInfo {
  id: string;
  name: string;
  email?: string;
  domain?: string;
}

export interface AuthProvider {
  checkCredentials(username: string, password: string): Promise<BasicUserInfo>;
  id: string;
}
