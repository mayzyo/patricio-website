import { ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { faPortrait, faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { EditorService } from '../../../admin/services/editor.service';

@Component({
    selector: 'app-home',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    @ViewChild('SpotlightRef', { static: true }) spotlightRef?: ElementRef<HTMLElement>;
    @ViewChild('UpcomingRef', { static: true }) upcomingRef?: ElementRef<HTMLElement>;
    @ViewChild('BiographyRef', { static: true }) biographyRef?: ElementRef<HTMLElement>;
    
    protected readonly faRecordVinyl = faRecordVinyl;
    protected readonly faPortrait = faPortrait;
    
    protected readonly arrowDisabled = signal(false);
    protected readonly spotlightTriggered = signal(false);
    protected readonly upcomingTriggered = signal(false);
    protected readonly biographyTriggered = signal(false);

    constructor(private editor: EditorService) {}

    @HostListener('window:scroll')
    onScrollEvent(): void {
        if (this.spotlightRef && this.scrollOffset(this.spotlightRef)) {
            this.spotlightTriggered.set(true);
            this.arrowDisabled.set(true);
        }

        if (this.upcomingRef && this.scrollOffset(this.upcomingRef)) {
            this.upcomingTriggered.set(true);
        }

        if (this.biographyRef && this.scrollOffset(this.biographyRef)) {
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
        return window.scrollY >= elRef.nativeElement.offsetTop - (window.innerHeight / 1.35)
    }
}
