import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { merge, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { scan, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('*', style({ opacity: 0 })),
      transition('void => *', [
        style({ opacity: 1 }),
        animate(6000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class NoticeComponent implements OnInit, OnDestroy {
  @Input() messages = new Array<string>();
  @Input() refreshTimer$ = new Subject<void>();
  @Output() readonly closePanel = new EventEmitter();
  private readonly subscriptions = new Subscription();
  
  constructor() { }

  ngOnInit(): void {
    this.subscriptions.add(
      merge(
        of(null),
        this.refreshTimer$
      ).pipe(
        switchMap(() => timer(6000))
      ).subscribe(() => this.closePanel.emit())
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
