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

  messages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.commentService.getMessages().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ''
    });
  }

  postComment() {
    const message = this.commentForm.get('comment').value;
    this.commentService.sendMessage(message);
    this.commentForm.reset();
  }

  like() {}

}
