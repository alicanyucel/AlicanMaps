import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Step } from '../step';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()

export class MapQuestService {
      API_KEY =:8sm0Wj5hBzry0HxOhCJ2fyilcch54hE6;
      url= 'http://open.mapquestapi.com/directions/v2/route';
  constructor(private http: HttpClient) { }

  //methods are just functions attached to objects
  getDirections(start: string, end: string): Observable<{steps:Step[], time: number, distance: number}> {
  	return this.http.get(this.url, {params:{key: this.API_KEY, from: start, to: end}})
  	.map(res => {
  			let json = res as {route:{distance: number, time: number, 
  				legs: Array<{maneuvers: Array<{iconUrl: string, narrative: string, mapUrl: string, distance: number}>}>}}
  			let distance = json.route.distance
  			let time = json.route.time
  			let steps = json.route.legs[0].maneuvers.map(step => {
  				return {
  					imgUrl: step.iconUrl, 
  					text: step.narrative,
  					stepUrl: step.mapUrl,
  					distance: step.distance
  				}
  			})
  			return {distance, time, steps}
  		})
  }
}
