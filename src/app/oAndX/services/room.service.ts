import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../../auth/auth.service';
import {Room} from '../../models/room';
import {HttpService} from '../../services/http.service';

@Injectable()
export class RoomService {

  private roomListObs = new BehaviorSubject<Array<Room>>([]);

  constructor(private httpService: HttpService, private authService: AuthService) {}


  getRooms() {
    this.httpService.getRooms().subscribe(list => {
      this.roomListObs.next(list);
    });
  }

  addNewRoomToDatabase(room: Room) {
    const list = this.roomListObs.getValue();
    list.push(room);
    this.roomListObs.next(list);
    this.saveRoomListObs();
  }

  getRoomListObs(): Observable<Array<Room>> {
    return this.roomListObs.asObservable();
  }

  getRoomsList() {
    return this.roomListObs.getValue();
  }

  saveRoomListObs() {
    this.httpService.newRoom(this.roomListObs.getValue());
  }

  lockedRoom(room: Room) {
    const list = this.roomListObs.getValue().filter(r => r !== room);
    room.locked = true;
    room.guestEmail = this.authService.user.email;
    list.push(room);
    console.log(room);
    this.roomListObs.next(list);
    this.saveRoomListObs();
  }

  saveSelectedField(room: Room) {
    const list = this.roomListObs.getValue()
      .filter(r => ((r.name !== room.name) &&
        ( (r.userId !== this.authService.user.email) ||
        (r.guestEmail !== this.authService.user.email) ) ));
    list.push(room);
    this.roomListObs.next(list);
    this.saveRoomListObs();
  }

  leaveTheRoom() {
    const roomsAuthor: Array<Room> = this.roomListObs.getValue()
      .filter(r => (r.userId === this.authService.user.email));
    const roomsGuest: Array<Room> = this.roomListObs.getValue()
      .filter(r => (r.guestEmail === this.authService.user.email));

    if (roomsAuthor.length > 0) {
      if (roomsAuthor[0].guestEmail === 'guest') {
        const list = this.roomListObs.getValue()
          .filter(r => (r.userId !== this.authService.user.email));
        this.roomListObs.next(list);
      } else {
        const list = this.roomListObs.getValue()
          .filter(r => (r.userId !== this.authService.user.email));
        roomsAuthor[0].locked = false;
        roomsAuthor[0].userId = roomsAuthor[0].guestEmail;
        roomsAuthor[0].guestEmail = 'guest';
        list.push(roomsAuthor[0]);
        this.roomListObs.next(list);

      }
    }
    if (roomsGuest.length > 0) {
      const list = this.roomListObs.getValue()
        .filter(r => (r.guestEmail !== this.authService.user.email));
      this.roomListObs.next(list);
      roomsGuest[0].guestEmail = 'guest';
      roomsGuest[0].locked = false;
      list.push(roomsGuest[0]);
      this.roomListObs.next(list);
    }
    this.saveRoomListObs();
  }
}
