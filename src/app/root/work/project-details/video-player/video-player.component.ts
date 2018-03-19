import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'jl-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnChanges {
  @Input() videoLocBase: string;
  @Input() videoPreviewLoc: string;
  videoUrl: string;
  constructor() { }

  ngOnChanges() {
    this.videoUrl = null;
    setTimeout(() => {
      this.videoUrl = this.videoLocBase + this.videoPreviewLoc;
    }, 100);

  }
}
