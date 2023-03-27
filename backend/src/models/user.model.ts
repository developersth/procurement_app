import { Document } from 'mongoose';

export interface User extends Document {
   username: string;
   password: string;
   name :string;
   email:string;
   mobile:string;
   is_active:boolean;
   role:object;

}