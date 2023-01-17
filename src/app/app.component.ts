import { Component, OnInit } from '@angular/core';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'octaspace';

  network: any;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.network = this.networkService.getNetwork().subscribe(resp => {
      this.network = resp;
    });
  }

}
