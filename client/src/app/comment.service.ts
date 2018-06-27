import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private socket;
  private url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) {
    this.socket = io(this.url);
  }

  sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  doLike(like) {
    this.socket.emit('do-like', like);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message);
      });
    });
  }

  public getAllMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('all-comments', (messages) => {
        observer.next(messages);
      });
    });
  }

  sendComment(comment) {
    console.log(comment);
    const data = {
      comment: comment
    };
    return this.http.post(this.url + '/comments/postComment', data);
  }

  getComments() {
    return this.http.get(this.url + '/comments/getComments');
  }

}
