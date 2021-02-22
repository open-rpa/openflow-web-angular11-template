import { Component } from '@angular/core';
import { NgOpenflowAuthService } from '@openiap/ng-openflow-auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'openflow-web-angular11-template';
  constructor(
    public openflowAuthService: NgOpenflowAuthService
  ) { 
  }
}
