import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { faPortrait, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent {
    private readonly editor = inject(EditorService);

    spotlightRef = viewChild<ElementRef<HTMLElement>>('SpotlightRef');
    upcomingRef = viewChild<ElementRef<HTMLElement>>('UpcomingRef');
    biographyRef = viewChild<ElementRef<HTMLElement>>('BiographyRef');

    protected readonly faRecordVinyl = faRecordVinyl;
    protected readonly faPortrait = faPortrait;
    
    protected readonly arrowDisabled = signal(false);
    protected readonly spotlightTriggered = signal(false);
    protected readonly upcomingTriggered = signal(false);
    protected readonly biographyTriggered = signal(false);

    @HostListener('window:scroll')
    onScrollEvent(): void {
        const _spotlightRef = this.spotlightRef();
        if (_spotlightRef && this.scrollOffset(_spotlightRef)) {
            this.spotlightTriggered.set(true);
            this.arrowDisabled.set(true);
        }

        const _upcomingRef = this.upcomingRef();
        if (_upcomingRef && this.scrollOffset(_upcomingRef)) {
            this.upcomingTriggered.set(true);
        }

        const _biographyRef = this.biographyRef();
        if (_biographyRef && this.scrollOffset(_biographyRef)) {
            this.biographyTriggered.set(true);
        }
    }

    async openSongEditor() {
        const { SongComponent } = await import("../../../admin/components/song/song.component");
        this.editor.open(SongComponent);
    }

    async openBiographyEditor() {
        const { BiographyComponent } = await import("../../../admin/components/biography/biography.component");
        this.editor.open(BiographyComponent);
    }

    private scrollOffset(elRef: ElementRef<HTMLElement>): boolean {
        return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35);
    }
}
