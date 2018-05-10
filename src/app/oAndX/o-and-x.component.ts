import { OnInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomService } from './services/room.service';
import { BoardService } from './services/board.service';
import { Room } from '../models/room';
import { AuthService } from '../auth/auth.service';
import { BoardFields } from '../models/boardFields';

@Component({
  selector: 'app-o-and-x',
  templateUrl: './o-and-x.component.html',
  styleUrls: ['./o-and-x.component.css']
})
export class OAndXComponent implements OnInit {

  protected roomsList: Array<Room> = [];
  protected userInRoom = false;
  public myRoom: Room;
  protected boardFields: Array<BoardFields> = [];

  constructor(private oandxService: BoardService, private roomService: RoomService, private authService: AuthService) {
    this.roomService.getRoomListObs().subscribe((room: Array<Room>) => {
      this.roomsList = room.filter(r => (
        r.locked === false
      ));
    });

    this.oandxService.getMyRoomObs().subscribe( (room: Room) => {
      this.myRoom = room;
      if (room) {
        this.boardFields = room.fields;
      }

    } );

    setInterval(() => this.getRoomsAndBoard(), 350);
   }

  ngOnInit() { }


  getRoomsAndBoard() {
    if (!this.userInRoom) {
      if (this.authService.user) {
        this.roomService.getRooms();
      }
    } else {
      this.oandxService.getMyRoom();
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

  selectedField(field: BoardFields) {
    this.oandxService.selectedField(field);
  }

  getMyStyle(field: BoardFields) {
    const myStyle = {
      'width': '100%',
      'height': 'auto',
      'opacity': field.opacity
    };
    return myStyle;
  }

}
