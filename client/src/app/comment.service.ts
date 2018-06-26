import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { io } from 'socket.io-client';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private socket;
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

}
