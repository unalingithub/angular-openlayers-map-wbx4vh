import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Map, View } from 'ol';
import FullScreen from 'ol/control/FullScreen';
import olms from 'ol-mapbox-style';
import { transform } from 'ol/proj';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 9,
    };

    // This API key is for use only in stackblitz.com
    // Get your Geoapify API key on https://www.geoapify.com/get-started-with-maps-api
    // The Geoapify service is free for small projects and the development phase.
    const myAPIKey = '18c85a44a76042788847e2fb74d27386';
    const mapStyle =
      'https://maps.geoapify.com/v1/styles/toner-grey/style.json';

    olms(
      this.mapContainer.nativeElement,
      `${mapStyle}?apiKey=${myAPIKey}`
    ).then((map: Map) => {
      map.setView(
        new View({
          center: transform(
            [initialState.lng, initialState.lat],
            'EPSG:4326',
            'EPSG:3857'
          ),
          zoom: initialState.zoom,
        })
      );

      map.addControl(new FullScreen());
    });
  }
}
