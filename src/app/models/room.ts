import { BoardFields } from './boardFields';
export interface Room {
  _id?: {$oid: string};
  name: string;
  userId: string;
  guestEmail: string;
  userScore: number;
  guestScore: number;
  turn: string;
  locked?: boolean;
  fields?: Array<BoardFields>;
  }

