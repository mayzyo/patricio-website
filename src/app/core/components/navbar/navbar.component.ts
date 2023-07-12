import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    readonly animState$ = interval(20000).pipe(
        scan(acc => !acc, false)
    );

    isCollapsed = true;
    currentUrl: string = '';

    constructor(private location: Location, private offcanvasService: NgbOffcanvas) { }

    ngOnInit() {
        this.location.onUrlChange(res => {
            this.currentUrl = res;
            this.isCollapsed = true;
        });
    }

    open(content: any) {
        this.isCollapsed = false;

		this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title', position: 'end' }).result.then(
			(result) => {
                this.isCollapsed = true;
				// this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
                this.isCollapsed = true;
				// this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
}
