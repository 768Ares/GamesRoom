import {Injectable} from '@angular/core';
import {Room} from '../../models/room';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {RoomService} from './room.service';
import {AuthService} from '../../auth/auth.service';
import {Observable} from 'rxjs/Observable';
import {BoardFields} from '../../models/boardFields';

@Injectable()
export class BoardService {

  private myRoomObs = new BehaviorSubject<Room>(null);

  constructor(private roomService: RoomService, private authService: AuthService) {
  }

  getMyRoom() {
    this.roomService.getRooms();
    const myRooms: Array<Room> = this.roomService.getRoomsList()
      .filter(r => ((r.userId === this.authService.user.email) || (r.guestEmail === this.authService.user.email)));
    this.myRoomObs.next(myRooms[0]);
    const myRoom = myRooms[0];
    if (myRooms.length > 0) {
      if (myRoom.userId === this.authService.user.email) {
        if (this.gameOver(myRoom.fields, 'author') === true) {
          alert('Zwycięscą został: ' + myRoom.userId);
          this.resetFields(myRoom, 'author');
        }
        if (this.gameOver(myRoom.fields, 'guest') === true) {
          alert('Zwycięscą został: ' + myRoom.guestEmail);
          this.resetFields(myRoom, 'guest');
        }
      } else if (myRoom.guestEmail === this.authService.user.email) {
        if (this.gameOver(myRoom.fields, 'author') === true) {
          alert('Zwycięscą został: ' + myRoom.userId);
          this.resetFields(myRoom, 'author');
        }
        if (this.gameOver(myRoom.fields, 'guest') === true) {
          alert('Zwycięscą został: ' + myRoom.guestEmail);
          this.resetFields(myRoom, 'guest');
        }
      }
    }
  }

  resetFields(myRoom: Room, winPlayer: string) {
    myRoom.fields = this.generateNewFields();
    if (winPlayer === 'author') {
      myRoom.userScore += 1;
    } else if (winPlayer === 'guest') {
      myRoom.guestScore += 1;
    }
    this.roomService.saveSelectedField(myRoom);
  }

  addNewRoom(nameRoom: string) {
    const room: Room = {
      name: nameRoom,
      userId: this.authService.user.email,
      guestEmail: 'guest',
      userScore: 0,
      guestScore: 0,
      turn: 'author',
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
        if (myRoom.userId === this.authService.user.email && myRoom.turn === 'author') {
          field.background = 'cross';
          field.player = 'author';
          field.opacity = 1;
          field.locked = true;
          myRoom.fields[field.idx] = field;
          myRoom.turn = 'guest';
          this.roomService.saveSelectedField(myRoom);
        }
        if (myRoom.guestEmail === this.authService.user.email && myRoom.turn === 'guest') {
          field.background = 'circle';
          field.player = 'guest';
          field.opacity = 1;
          field.locked = true;
          myRoom.fields[field.idx] = field;
          myRoom.turn = 'author';
          this.roomService.saveSelectedField(myRoom);
        }
      } catch {
      }

    }
  }

  gameOver(field: Array<BoardFields>, player: string): boolean {
    let win = false;
    for (let i = 0; i < 9; i = i + 3) {
      if (field[i].player === player) {
        if (field[i + 1].player === player) {
          if (field[i + 2].player === player) {
            win = true;
          }
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (field[i].player === player) {
        if (field[i + 3].player === player) {
          if (field[i + 6].player === player) {
            win = true;
          }
        }
      }
    }

    if (field[0].player === player) {
      if (field[4].player === player) {
        if (field[8].player === player) {
          win = true;
        }
      }
    }

    if (field[2].player === player) {
      if (field[4].player === player) {
        if (field[6].player === player) {
          win = true;
        }
      }
    }

    return win;
  }
}
