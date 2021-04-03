import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('Showcase', { read: ElementRef }) showcaseRef!: ElementRef;
  @ViewChild('Feed', { read: ElementRef }) feedRef!: ElementRef;
  @ViewChild('Biography', { read: ElementRef }) biographyRef!: ElementRef;
  readonly showcaseAnim$ = new Subject<void>();
  readonly feedAnim$ = new Subject<void>();
  readonly biographyAnim$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  onScrollEvent() {
    if (this.scrollOffset(this.showcaseRef)) {
      this.showcaseAnim$.next();
    } 
    if (this.scrollOffset(this.feedRef)) {
      this.feedAnim$.next();
    } 
    if (this.scrollOffset(this.biographyRef)) {
      this.biographyAnim$.next();
    }
  }

  private scrollOffset(elRef: ElementRef) {
    return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35);
  }
}
