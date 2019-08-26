import { Component, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fade-in';
import { ContentService } from 'src/app/services/content.service';
import { Subject, Observable, merge, of } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { scan, switchMap, share, take, pluck, tap, map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn('.card')),
  ]
})
export class BlogsComponent implements OnInit {

  readonly updateHistory$: Subject<void>;
  readonly history$: Observable<Post[]>;
  readonly updateCurrent$: Subject<Post>;
  readonly current$: Observable<SafeHtml>;

  constructor(private contents: ContentService, private sanitizer: DomSanitizer, route: ActivatedRoute) {
    this.updateHistory$ = new Subject();
    this.updateCurrent$ = new Subject();
    this.history$ = this.setupPagination(this.updateHistory$);
    this.current$ = this.setupPostArticle(
      this.updateCurrent$, 
      route.paramMap.pipe(
        switchMap(res => {
          return res.get('title')
          ? of({ title: res.get('title') })
          : this.history$.pipe(
            take(1), 
            pluck<Post[], Post>('0')
          )
        })
      )
    );
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  postArticle(post: Post) {
    this.updateCurrent$.next(post);
  }

  private setupPagination(update$: Subject<void>) {
    return merge(of(null), update$).pipe(
      scan(acc => acc + 1, 0), 
      switchMap(res => this.contents.blogPreview(res.toString(), '10')),
      scan((acc, cur) => acc.concat(cur), new Array<Post>()),
      share()
    );
  }

  private setupPostArticle(update$: Subject<Post>, first$: Observable<{ title: string }>) {
    return merge(first$, update$).pipe(
      switchMap(res => this.contents.blogArticle(res)),
      map(res => this.sanitizer.bypassSecurityTrustHtml(res))
    );
  }
}
