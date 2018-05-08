import { BoardFields } from './boardFields';
export interface Room {
  _id?: {$oid: string};
  name: string;
  userId: string;
  guestEmail: string;
  locked: boolean;
  fields: Array<BoardFields>;
  }

