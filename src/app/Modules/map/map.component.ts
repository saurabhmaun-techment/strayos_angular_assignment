import { Component, Input, OnInit } from '@angular/core';

import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Icon, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';

@Component({
  selector: 'app-map',
  inputs: ['LatLong'],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input('LatLong') latLong: string;
  reverseLatLong: string[] = [];
  mapObject: Map;
  markerFeature : Feature;
  markerStyle: Style;
  vectorLayer: VectorLayer;

  constructor() {  }

  ngOnInit(): void {
    this.reverseLatLong = this.latLong.trim().split(",").reverse();
    
    this.markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: './assets/marker.png',
      }),
    });

    this.markerFeature = new Feature({
      geometry: new Point(fromLonLat([parseFloat(this.reverseLatLong[0].trim()), parseFloat(this.reverseLatLong[1].trim())])),
      name: 'My Home'
    });

    this.markerFeature.setStyle(this.markerStyle);
    
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [ this.markerFeature ],
      }),
    });

    this.mapObject = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
        this.vectorLayer
      ],
      view: new View({
        center: fromLonLat([parseFloat(this.reverseLatLong[0].trim()), parseFloat(this.reverseLatLong[1].trim())]),
        zoom: 10
      })
    });
  }
}