import { Component, TemplateRef, signal, OnInit, inject } from '@angular/core';
import { Location } from '@angular/common';
import { interval } from 'rxjs';
import { scan, share } from 'rxjs/operators';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: false
})
export class NavbarComponent implements OnInit {
    private location = inject(Location);
    private offcanvasService = inject(NgbOffcanvas);

    protected readonly animState$ = interval(20000).pipe(
        scan(acc => !acc, false),
        share()
    );

    protected currentUrl = signal('');

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
