export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface PreferenceUpdate {
  sources: string[];
  categories: string[];
  authors?: string[];
  token?: string | null;
}
