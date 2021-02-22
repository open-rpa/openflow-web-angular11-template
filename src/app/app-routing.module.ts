import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitiesComponent } from './entities/entities.component';
import { MainComponent } from './main/main.component';
import { RPAWorkflowsComponent } from './rpaworkflows/rpaworkflows.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'Entities', component: EntitiesComponent },
  { path: 'Entities/:collection', component: EntitiesComponent },
  { path: 'Users', component: UsersComponent },
  { path: 'RPAWorkflows', component: RPAWorkflowsComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
