import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  @Input() datasource: Partial<Post> = {};

  constructor() { }

  ngOnInit(): void {
  }

}
