export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  username: string;
  dateOfBirth: Date;
  location?: string;
  bio?: string;
}
