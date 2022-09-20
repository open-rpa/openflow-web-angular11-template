import { Component, OnInit } from '@angular/core';
import { NgOpenflowAuthService } from '@openiap/ng-openflow-auth';
import { NoderedUtil } from '@openiap/openflow-api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(
    public openflowAuthService: NgOpenflowAuthService
  ) { }
  public entities: any[] = [];
  ngOnInit(): void {
    this.openflowAuthService.onSignedin(async user => {
      try {
        // Get list of all users in openflow
        this.entities = await NoderedUtil.Query({ collectionname: "users", query: { "_type": "user" } });
      } catch (error) {
        console.error(error);
      }
    });
  }

}
