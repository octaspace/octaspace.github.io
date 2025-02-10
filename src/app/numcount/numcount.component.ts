import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-numcount',
  templateUrl: './numcount.component.html',
  styleUrls: ['./numcount.component.css']
})
export class NumcountComponent implements OnInit, OnChanges {

  @Input() network: any;  
  framesTotal: number = 0;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['network'] && this.network?.render?.frames_total !== undefined) {
      this.framesTotal = this.network.render.frames_total;
    }
  }
}
