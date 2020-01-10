import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Email, Sender, Purpose } from '../../models/Email';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

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
  submitting = false;
  model: Email = {
    message: '',
    sender: '',
    senderType: null,
    purpose: null
  };

  constructor(private contacts: ContactService) { }

  ngOnInit() {
    this.subscription.add(this._success.subscribe((message) => this.successMessage = message));
    this.subscription.add(this._success.pipe(
      debounceTime(2000)
    ).subscribe(() => this.successMessage = null));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {

    this.attemptedSubmit = true;

    if(this.form.valid && !this.submitting) {
      this._success.next(`message sending...`);

      this.submitting = true;
      this.contacts.sendEmail(this.model).subscribe(res => {
        this._success.next(`${res}, thanks for your enquiry!`);
        this.form.reset();
        this.submitting = false;
        this.attemptedSubmit = false;
      });
    }
  }
}
