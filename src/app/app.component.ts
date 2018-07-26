import { Component, OnInit } from '@angular/core';
import { LoggingService } from './shared/logging.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  title = 'Angular5 Inventory App';

  ngOnInit() {
  	this.logTest("info", "AppComponents has loaded");
  }

  public logTest(type: string, message: string) {
  	this.loggingService[type](message);
  }

  constructor(private loggingService: LoggingService) { }
}
