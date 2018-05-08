import { Injectable } from '@angular/core';
import { Room } from '../../models/room';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RoomService } from './room.service';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BoardFields } from '../../models/boardFields';

@Injectable()
export class BoardService {

  private myRoomObs = new BehaviorSubject<Room>(null);

  constructor(private roomService: RoomService, private authService: AuthService) {}

  getMyRoom() {
    this.roomService.getRooms();
    const myRooms: Array<Room> = this.roomService.getRoomsList()
      .filter(r => ((r.userId === this.authService.user.email) || (r.guestEmail === this.authService.user.email)));
    this.myRoomObs.next(myRooms[0]);
  }

  addNewRoom(nameRoom: string) {
    const room: Room = {
      name: nameRoom,
      userId: this.authService.user.email,
      guestEmail: 'guest',
      locked: false,
      fields: this.generateNewFields()
    };
    this.myRoomObs.next(room);

    this.roomService.addNewRoomToDatabase(room);
  }

  generateNewFields(): Array<BoardFields> {
    const boardFields: Array<BoardFields> = [];
    for (let i = 0; i < 9; i++) {
      const boardField: BoardFields = {
        player: 'noPlayer',
        idx: i,
        background: 'noBackground',
        opacity: 1,
        locked: false
      };
      boardFields.push(boardField);
    }
    return boardFields;
  }

  getMyRoomObs(): Observable<Room> {
    return this.myRoomObs;
  }

  selectedField(field: BoardFields) {
    const myRoom = this.myRoomObs.getValue();
    if (field.locked !== true) {
      try {
        if (myRoom.userId === this.authService.user.email) {
          field.background = 'cross';
          field.player = 'author';
        }
        if (myRoom.guestEmail === this.authService.user.email) {
          field.background = 'circle';
          field.player = 'guest';
        }
      } catch {}
      field.opacity = 1;
      field.locked = true;
      myRoom.fields[field.idx] = field;
      this.roomService.saveSelectedField(myRoom);
    }
  }
}
