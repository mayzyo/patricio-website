import { Component, ChangeDetectionStrategy, TemplateRef, signal, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { interval } from 'rxjs';
import { scan, share } from 'rxjs/operators';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    protected readonly animState$ = interval(20000).pipe(
        scan(acc => !acc, false),
        share()
    );

    protected currentUrl = signal('');

    constructor(private location: Location, private offcanvasService: NgbOffcanvas) { }

    ngOnInit(): void {
        this.location.onUrlChange(res => {
            this.currentUrl.set(res);
            this.offcanvasService.dismiss();
        });
    }

    open(content: TemplateRef<unknown>) {
		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' });
	}
}
