import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
//import { MapServer } from '../../../assets/js/map-server';
// import { Marker} from '../../models/marker';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string;
  lat: number;
  lng: number;
  zoom: number;

  markerName:string;  
  markerLat:string;
  markerLng:string;  
  markerDraggable:string;
  geoJsonObj: {};//object;
  
  

  markers: Marker[];

  constructor(private mapSerive:MapService) { 
    this.title = 'Habib Mapit Program';
    this.lat = 51.673858;
    this.lng = 7.815982;
    this.zoom = 5;
    //

    this.markers = mapSerive.getMarkers();

    console.log(this.markers);
  }

  ngOnInit() {
    console.log("MAP COMPONENT INIT")
  }

  clickedMarker(marker:Marker, index:number){
    console.log('Clicked Marker:' + marker.name + ' at index: '+index);
  }
  
  mapClicked($event:any){
    var newMarker ={
      name: 'Untitled',
      lat:$event.coords.lat,
      lng: $event.coords.lng,
      draggable:true
    }
    console.log('Map clicked '+ newMarker);
    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;
    
    this.markers.push(newMarker);
  }


  markerDragEnd(marker:any, $event:any){
    console.log('dragEnd', marker, $event);

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    this.markerLat = $event.coords.lat;
    this.markerLng = $event.coords.lng;

//    this.mapStorageSerive.updateMarker(updMarker, $event.coords.lat, $event.coords.lng);

  }



  addMarker(){
    var isDraggable:boolean;

    console.log('adding marker');
    if(this.markerDraggable == 'yes'){
      isDraggable = true;
    }else{
      isDraggable = false;
    }


    var newMarker = {
      name:this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }
  console.log(this.markerLat);
    console.log(newMarker);
    this.markers.push(newMarker);
    this.mapSerive.addMarker(newMarker);
  }

  removeMarker(marker:Marker){

    for(var i=0; i<this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i, 1);

      }
    }
    this.mapSerive.removeMarker(marker);
  }

}

interface Marker{
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;

}