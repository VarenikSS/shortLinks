import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LinksComponent } from './links/links.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLinkComponent } from './add-link/add-link.component';
const appRoutes: Routes = [
  {
    path: 'links',
    component: LinksComponent
  },
  {
    path: 'add-link',
    component: AddLinkComponent
  },
  { path: '**',
    redirectTo: '/links',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    AddLinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
