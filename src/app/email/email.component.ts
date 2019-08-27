import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Email, Sender, Purpose } from '../models/Email';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, OnDestroy {

  @ViewChild('contactForm', { static:true }) form: NgForm;

  private _success = new Subject<string>();
  private subscription = new Subscription();
  successMessage: string;

  attemptedSubmit = false;
  submitted = false;
  model: Email = {
    message: '',
    sender: '',
    senderType: null,
    purpose: null
  };

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

  onSubmit() {
    this.attemptedSubmit = true;
    console.log(this.form)
    if(this.form.valid) {
      this.changeSuccessMessage();
      this.form.reset();
      this.attemptedSubmit = false;
    }
  }

  private changeSuccessMessage() {
    this._success.next(`Thanks for your enquiry, I'll get back to you soon`);
  }
}
