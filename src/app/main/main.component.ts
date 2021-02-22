import { Component, OnInit } from '@angular/core';
import { NgOpenflowAuthService } from '@openiap/ng-openflow-auth';
import { NoderedUtil } from '@openiap/openflow-api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(
    public openflowAuthService: NgOpenflowAuthService    
  ) { }
  public entities: any[] = [];
  public showcompleted:boolean = false;
  ngOnInit(): void {
    this.openflowAuthService.onSignedin(async user => {
      this.loaddata();
    });
  }
  async loaddata() {
    try {
      if (!this.openflowAuthService.isSignedIn) { console.log("Not connected/signed in"); return; }
      const user = this.openflowAuthService.user;
      const ors: any[] = [];
      ors.push({ targetid: user._id });
      user.roles.forEach(role => {
          ors.push({ targetid: role._id });
      });
      const basequery:any = { $or: ors };
      if(!this.showcompleted) {
        basequery["$and"] = [{ state: { $ne: "completed" } }, { state: { $ne: "failed" } }];
        basequery.form = { $exists: true };
      }
      this.entities = await NoderedUtil.Query("workflow_instances", basequery, null, null, 100, 0, null as any);
    } catch (error) {
      console.error(error);
    }
  }
}
