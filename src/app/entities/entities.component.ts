import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgOpenflowAuthService } from '@openiap/ng-openflow-auth';
import { NoderedUtil, WebSocketClient } from '@openiap/openflow-api';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {
  constructor(
    public openflowAuthService: NgOpenflowAuthService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(
      (params) => {
        if (!NoderedUtil.IsNullEmpty(params['collection'])) this.collection = params['collection'];
      });
  }
  public collection: string = "entities";
  public collections: string[] = ["users", "entities"];
  public entities: any[] = [];
  public index: number = 0;
  public loadBy: number = 100;
  public disabled: boolean = true;
  ngOnInit(): void {
    this.route.params
    this.openflowAuthService.onSignedin(async user => {
      this.loaddata();
    });
  }
  async loaddata(reset: boolean = false) {
    if (reset) this.index = 0;
    try {
      this.disabled = true;
      if (!this.openflowAuthService.isSignedIn) { console.log("Not connected/signed in"); return; }
      const basequery: any = {};
      const baseprojection: any = { _type: 1, type: 1, name: 1, _created: 1, _createdby: 1, _modified: 1, projectandname: 1 };
      this.entities = await NoderedUtil.Query({ collectionname: this.collection, query: basequery, projection: baseprojection, top: this.loadBy, skip: this.index });
      this.index = this.loadBy;
      this.disabled = false;
    } catch (error) {
      console.error(error);
    }
  }
  onScrollEnd() {
    this.loaddata();
  }
}
