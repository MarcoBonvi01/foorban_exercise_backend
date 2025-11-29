// define the interface for the request

export interface UpdateInfoRequest {
  name: string;
  age: number;
  is_married: boolean | null;
  birth_date: Date;
}
