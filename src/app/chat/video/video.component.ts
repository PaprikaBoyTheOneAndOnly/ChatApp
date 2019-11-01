import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl, SafeValue} from "@angular/platform-browser";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input()
  private message: string;

  private url: SafeValue;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = this.message.match(regExp);

    if (match[2].includes(" "))
      match[2] = match[2].substr(0, match[2].indexOf(" "));
    if (match && match[2].length == 11) {
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl('//www.youtube.com/embed/' + match[2]);
    }
  }

}
