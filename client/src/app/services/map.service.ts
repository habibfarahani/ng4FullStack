import { Injectable } from '@angular/core';
import { Marker } from '../models/marker';

@Injectable()
export class MapService {

  constructor() {
    this.load();
   }
   
   
  load(){
    if(localStorage.getItem('markers') === null ||
        localStorage.getItem('markers') === undefined){

          console.log('No markers found ... creating ...');
          var markers = [
            {
              name: 'The First Company',
              lat: 42.825588,
              lng: -72.018029,
              draggable: true
            },
            {
              name: 'The Second Company',
              lat: 42.825588,
              lng: -78.018029,
              draggable: true
            },
            {
              name: 'The Third Company',
              lat: 42.825588,
              lng: -73.018029,
              draggable: true
            },
          ];

          localStorage.setItem('markers', JSON.stringify(markers));

    }else{
      console.log('Loading markers....');
    }
  }

  getMarkers(){

    return JSON.parse(localStorage.getItem('markers'));

  }

  addMarker(marker:Marker){
    // Fetch a marker from
    var markers = JSON.parse(localStorage.getItem('markers'));

    markers.push(marker);

    localStorage.setItem('markers', JSON.stringify(markers));

  }

  updateMarker(marker:Marker, newLat:number, newLng:number){
    // Fetch a marker from
    var markers = JSON.parse(localStorage.getItem('markers'));

    for(var i=0; i<markers.length; i++){
      if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
        markers[i].lat = newLat;
        markers[i].lng = newLng;
      }
    }

    localStorage.setItem('markers', JSON.stringify(markers));
  }


  removeMarker(marker:Marker){
     // Fetch a marker from
     var markers = JSON.parse(localStorage.getItem('markers'));
     
         for(var i=0; i<markers.length; i++){
           if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
             markers.splice(i, 1);
           }
         }
     
         localStorage.setItem('markers', JSON.stringify(markers));
  }

}
