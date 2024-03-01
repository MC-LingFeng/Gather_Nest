export interface UserType {
  user_id?: number;
  username: string;
  password_encrypted: string;
  phone?: string;
  mail?: string;
  gender?: string;
  password_tag: string;
  password_key: string;
  password_vector: string;
  password_algorithm: string;
  grade?: number;
}
