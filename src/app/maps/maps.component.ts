import { Component, OnInit } from '@angular/core';
import { Step } from '../step';
import { MapQuestService } from '../services/mapquest.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

 start = 'Ankara';
 end = 'istanbul';

  directions$:Observable<{ steps: Step[]; time: number; distance: number; }> | undefined
  constructor(private _mapquestService: MapQuestService) { }

  search() {
    this.directions$ = this._mapquestService.getDirections(this.start, this.end)
  }

  ngOnInit() {
    this.search()
  }

}