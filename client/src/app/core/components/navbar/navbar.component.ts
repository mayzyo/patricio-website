import { Component, ChangeDetectionStrategy, TemplateRef, signal, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { interval, scan, share } from 'rxjs';
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

    protected isCollapsed = signal(true);
    protected currentUrl = signal('');

    constructor(private location: Location, private offcanvasService: NgbOffcanvas) { }

    ngOnInit(): void {
        this.location.onUrlChange(res => {
            this.currentUrl.set(res);
            this.isCollapsed.set(true);
        });
    }

    open(content: TemplateRef<unknown>) {
        this.isCollapsed.set(false);

		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' }).result.then(
			(result) => {
                this.isCollapsed.set(true);
				// this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
                this.isCollapsed.set(true);
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
}
