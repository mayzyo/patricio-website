import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {
  private _success = new Subject<string>();
  private subscription = new Subscription();
  successMessage: string;

  constructor() { }

  ngOnInit() {
    this.subscription.add(this._success.subscribe((message) => this.successMessage = message));
    this.subscription.add(this._success.pipe(
      debounceTime(2500)
    ).subscribe(() => this.successMessage = null));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public changeSuccessMessage() {
    this._success.next(`Thanks for your enquiry, I'll get back to you soon`);
  }
}
