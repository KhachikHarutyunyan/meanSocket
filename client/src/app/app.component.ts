import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  commentForm: FormGroup;

  messages = [];
  newMessage = [];
  likes = 0;

  message;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.createForm();
  }

  ngOnInit() {

    this.commentService.getAllMessages().subscribe((messages) => {
      console.log(messages);
      // this.messages.push(messages);
      this.messages = messages;
    });

    this.commentService.getMessages().subscribe((message: string) => {
      this.newMessage.push(message);
    });

  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ''
    });
  }

  postComment() {
    this.message = this.commentForm.get('comment').value;
    this.commentService.sendMessage(this.message);
    // this.commentService.sendComment(message).subscribe(data => {
    //   console.log('postComment ', data);
    // });
    this.commentForm.reset();
  }

  like(like) {
    like++;
    this.commentService.doLike(like);
  }

}
