import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { OandxService } from './services/oandx.service';
import { Room } from '../models/room';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-o-and-x',
  templateUrl: './o-and-x.component.html',
  styleUrls: ['./o-and-x.component.css']
})
export class OAndXComponent implements OnInit {

  private roomName: string;
  protected roomsList: Array<Room> = [];
  protected userInRoom = false;

  constructor(private oandxService: OandxService, private roomService: RoomService, private authService: AuthService) {
    this.oandxService.getroomListObs().subscribe((room: Array<Room>) => {
      this.roomsList = room;
    });
    setInterval(() => this.getRooms(), 1000);
    // this.getRooms();
   }

  ngOnInit() {
  }

  getRooms() {
    if (this.authService.user) {
      this.roomService.getRooms();
      console.log('pobiera rooms');
    } else {
      console.log('nie pobiera rooms');
    }
  }

  newRoom(formData: NgForm) {
    this.oandxService.addNewRoom(formData.value.newRoom);
    this.userInRoom = true;
  }

  joinTheRoom(room: Room) {
    this.userInRoom = true;
    this.roomService.lockedRoom(room);
  }

  leaveTheRoom() {
    this.userInRoom = false;
    this.roomService.leaveTheRoom();
  }

}
