import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgOpenflowAuthService } from '@openiap/ng-openflow-auth';
import { NoderedUtil, QueueMessage, WebSocketClient } from '@openiap/openflow-api';

@Component({
  selector: 'app-rpaworkflow',
  templateUrl: './rpaworkflow.component.html',
  styleUrls: ['./rpaworkflow.component.css']
})
export class RPAWorkflowComponent implements OnInit {
  constructor(
    public openflowAuthService: NgOpenflowAuthService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(
      (params) => {
        if (!NoderedUtil.IsNullEmpty(params['id'])) this.id = params['id'];
      });
  }
  ngOnInit(): void {
    this.openflowAuthService.onSignedin(async user => {
      this.queuename = await NoderedUtil.RegisterQueue(WebSocketClient.instance, "", async (data: QueueMessage, ack: any) => {
        ack();
        if (data.data.command == undefined && data.data.data != null) data.data = data.data.data;
        this.messages += data.data.command + "\n";
        if (data.data.command == "invokecompleted") {
          this.arguments = data.data.data;
        }
        if (data.data.command == "invokefailed") {
          if (data.data && data.data.data && data.data.data.Message) {
            this.errormessage = data.data.data.Message;
          } else {
            this.errormessage = JSON.stringify(data.data);
          }

        }

      });
      console.log("Registered queue: " + this.queuename);
      await this.loaddata();
      this.users = await NoderedUtil.Query("users", { $or: [{ _type: "user" }, { _type: "role", rparole: true }] }, null, null, 100, 0, null as any);
      this.users.forEach(user => {
        if (user._id == this.entity._createdbyid || user._id == this.entity._createdbyid) {
          this.user = user;
        }
      });
    });
  }
  public queuename: string = "";
  public entity: any = null;
  public users: any[] = [];
  public id: string = "";
  public user: any = null;
  public arguments: any = {};
  public messages: string = "";
  public errormessage: string = "";
  public timeout: number = 1500;
  async loaddata() {
    try {
      if (!this.openflowAuthService.isSignedIn) { console.log("Not connected/signed in"); return; }
      const basequery: any = { "_id": this.id };
      const baseprojection: any = { _type: 1, type: 1, name: 1, _created: 1, _createdby: 1, _createdbyid: 1, _modified: 1, projectandname: 1, Parameters: 1 };
      const arr = await NoderedUtil.Query("openrpa", basequery, baseprojection, null, 1, 0, null as any);
      if (arr.length == 1) this.entity = arr[0];
    } catch (error) {
      console.error(error);
    }
  }
  async onSubmit() {
    try {
      this.errormessage = "";
      const rpacommand = {
          command: "invoke",
          workflowid: this.entity._id,
          data: this.arguments
      }
      if (this.arguments === null || this.arguments === undefined) { this.arguments = {}; }
      const result: any = await NoderedUtil.QueueMessage(WebSocketClient.instance, this.user._id, this.queuename, rpacommand, null as any, parseInt(this.timeout as any));
      try {
          // result = JSON.parse(result);
      } catch (error) {
      }
  } catch (error) {
      this.errormessage = JSON.stringify(error);
  }

  }
}
