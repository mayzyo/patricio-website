import { Component } from '@angular/core';
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { Observable, of } from 'rxjs';
import { generateAudio, generateSong } from '../../../../test/generators/song';
import { Song } from '../../../models/song';
import { ActivatedRoute } from '@angular/router';
import { generateBlog } from '../../../../test/generators/blog';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrl: './blog.component.scss'
})
export class BlogComponent {
    protected readonly faSoundcloud = faSoundcloud;

    protected readonly song$ = of(generateSong());
    protected readonly blog$ = of(generateBlog());

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        const blogId = this.route.snapshot.paramMap.get('id');
        const songId = this.route.snapshot.queryParamMap.get('song');
        console.log('blogId', blogId)
        console.log('songId', songId)
    }

    redirect(song: Song): void {

    }

    protected buildImage(thumbnail?: string, coverId?: string): Observable<any> {
        return of(thumbnail);
    }

    protected buildAudio(audioId: string): Observable<any> {
        return of(generateAudio());
    }
}
