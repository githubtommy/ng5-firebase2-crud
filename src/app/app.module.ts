import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { DetailComponent } from './detail/detail.component';
import { LoggingService } from './shared/logging.service'
import { InventoryService } from './shared/inventory.service'
import { RatingModule } from 'ngx-rating';
import { StaticDataService } from './shared/static-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MasterComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    AppRoutingModule,
    RatingModule
  ],
  providers: [
    LoggingService, 
    InventoryService, 
    StaticDataService
    ],
  bootstrap: [AppComponent]
})

export class AppModule { }
