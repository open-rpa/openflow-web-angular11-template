import { Component, OnInit } from '@angular/core';
import { NgOpenflowAuthService } from '@openiap/ng-openflow-auth';
import { NoderedUtil } from '@openiap/openflow-api';

@Component({
  selector: 'app-rpaworkflows',
  templateUrl: './rpaworkflows.component.html',
  styleUrls: ['./rpaworkflows.component.css']
})
export class RPAWorkflowsComponent implements OnInit {
  constructor(
    public openflowAuthService: NgOpenflowAuthService
  ) { }
  ngOnInit(): void {
    this.openflowAuthService.onSignedin(async user => {
      this.loaddata();
    });
  }
  public entities: any[] = [];
  async loaddata() {
    try {
      if (!this.openflowAuthService.isSignedIn) { console.log("Not connected/signed in"); return; }
      const basequery:any = { "_type": "workflow" };
      const baseprojection: any = {_type: 1, type: 1, name: 1, _created: 1, _createdby: 1, _modified: 1, projectandname: 1};
      this.entities = await NoderedUtil.Query({ collectionname: "openrpa", query: basequery, projection: baseprojection, orderby: { _modified: -1 } });
    } catch (error) {
      console.error(error);
    }
  }
}
