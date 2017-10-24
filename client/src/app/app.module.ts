import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// For maps
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './components/map/map.component';
import { MapService } from './services/map.service';
import { ChartsComponent } from './components/charts/charts.component';

// For charts
import { ChartsModule } from 'ng2-charts';



//Socket io
import {HttpModule } from '@angular/http';
import { SocketService } from './services/socket.service';
import { DataService } from './services/data.service';

import { AboutComponent } from './components/about/about.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './components/dashboard/dashboard.component';


// materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatChipsModule, MatTabsModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSelectModule} from '@angular/material';
import {MatButtonModule, MatCheckboxModule, MatRadioModule, MatListModule, MatInputModule, MatFormFieldModule, MatOptionModule} from '@angular/material';


import { IpconfigComponent } from './components/dashboard/ipconfig/ipconfig.component';
import { RoutingComponent } from './components/dashboard/routing/routing.component';
import { LogsComponent } from './components/dashboard/logs/logs.component';
import { PortMapComponent } from './components/dashboard/port-map/port-map.component';


const appRoutes: Routes = [
//  {path:'', component:DashboardComponent/*, canActivate:[AuthGuard]*/},
  {path:'profile', component:AboutComponent /*, canActivate:[RegisterGuard]*/},
  {path:'charts', component:ChartsComponent /*, canActivate:[RegisterGuard]*/},
  {path:'dash', component:DashboardComponent /*, canActivate:[RegisterGuard]*/},
  //   {path:'register', component:RegisterComponent, canActivate:[RegisterGuard]},
//   {path:'login', component:LoginComponent},
//   {path:'add-client', component:AddClientComponent, canActivate:[AuthGuard]},
//   {path:'client/:id', component:ClientdetailsComponent, canActivate:[AuthGuard]},
//   {path:'edit-client/:id', component:EditClientComponent, canActivate:[AuthGuard]},
//   {path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
    {path: 'map', component: MapComponent},
//    {path:"git", component:GitprofileComponent},
//    {path:"profile", component:ProfileComponent}
    ];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    ChartsComponent,
    AboutComponent,
    DashboardComponent,
    IpconfigComponent,
    RoutingComponent,
    LogsComponent,
    PortMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    ChartsModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatChipsModule,
    MatTabsModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCj1WumZeRuXwzp0bjL0zjR3GG1FxFiH68'
    }),

  ],
  providers: [
    MapService,
    SocketService,
    DataService
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
