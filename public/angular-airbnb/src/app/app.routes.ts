import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AirbnbComponent } from './airbnb/airbnb.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SearchComponent } from './search/search.component';
import { AirbnbsComponent } from './airbnbs/airbnbs.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "airbnbs", component: AirbnbsComponent },
    { path: "airbnb/:id", component: AirbnbComponent },
    { path: "search", component: SearchComponent },
    { path: "**", component: ErrorPageComponent },

];
