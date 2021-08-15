import axios, { AxiosInstance } from "axios";
import { getSession } from 'next-auth/client';

export interface UserInfo {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    photoUrl?: string;
}

export class FitnessKitService {
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  private token: string | null = null;
  private http: AxiosInstance;

  public constructor() {
    this.http = axios.create({
      baseURL: this.baseUrl,
    });

    this.http.interceptors.request.use(async (config) => {
      const session = await getSession();
      const token = session?.accessToken || this.token;

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }

  public setToken(token: string) {
      this.token = token;
  }

  public async signUp(email: string, password: string): Promise<string> {
      const { data: { access_token } } = await this.http.post('/auth/register', { email, password });

      this.setToken(access_token);

      return access_token;
  }

  public async signIn(email: string, password: string): Promise<string> {
      const { data: { access_token } } = await this.http.post('/auth/login', { email, password });

      this.setToken(access_token);

      return access_token;
  }

  public async getUserInfo(): Promise<UserInfo> {
    const { data: userInfo } = await this.http.get('/auth/userinfo');

    return userInfo;
  }
}