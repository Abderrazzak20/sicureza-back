import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AideComponent } from './aide/aide.component';
import { AccessComponent } from './access/access.component';
import { RegistartionPageComponent } from './registartion-page/registartion-page.component';
import { AutenticazioneService } from './autenticazione.service';

const routes: Routes = [
  {path:"", component:HomeComponent,canActivate:[AutenticazioneService]},
  {path:"about", component: AboutComponent,canActivate:[AutenticazioneService]},
  {path:"help",component:AideComponent,canActivate:[AutenticazioneService]},
  {path:"login", component:AccessComponent},
  {path:'sign', component:RegistartionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
