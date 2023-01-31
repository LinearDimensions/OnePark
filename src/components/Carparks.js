import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

import { Contact } from "./Contact";
// from https://github.com/shahibuzzaman/covid19-tracker-reactJS
import './Map.css';
mapboxgl.accessToken =
  'pk.eyJ1Ijoic2hhaGlidXp6YW1hbiIsImEiOiJjazhtMjlsZGMwZTdwM2xvNHYyZWZnaW95In0.wv7TDBBzK5g_Rqwi32PWag';

export const Carparks = () => {
  const mapContainer = useRef(null);

  function loadMap(center, zoom) {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/shahibuzzaman/ck909hv6e00o81ik4qee1l32u',
      center: center,
      zoom: zoom,
      });
      
    map.once('load', function () {
      map.addSource('points',
        {type: 'geojson',data: {
          type: 'FeatureCollection', features:
          [
            {type: 'Feature',geometry: {type: 'Point',coordinates: [103.82160479517192,1.290381690591702],},
             properties: {carParkNo: 'HE1',lng:103.82160479517192,lat:1.290381690591702,address: 'BLK 102/103/104 HENDERSON CRESCENT',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.82149074284125,1.2844161134944834],},
             properties: {carParkNo: 'HE3',lng:103.82149074284125,lat:1.2844161134944834,address: 'BLK 116/117 BUKIT MERAH VIEW',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.82233904219922, 1.2835076392246192],},
             properties: {carParkNo: 'HE4',lng:103.82233904219922,lat:1.2835076392246192,address: 'BLK 121/122 & 127 BUKIT MERAH VIEW',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.79731095143076,1.4457315442224103],},
             properties: {carParkNo: 'W103',lng:103.79731095143076,lat:1.4457315442224103,address: 'BLK 766A WOODLANDS CIRCLE',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.80712705527328,1.4426606253415868],},
             properties: {carParkNo: 'W104',lng:103.80712705527328,lat:1.4426606253415868,address: 'BLK 688 WOODLANDS DR 75',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},
                                       
             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.80933425198465,1.4449997361197968],},
             properties: {carParkNo: 'W105',lng:103.80933425198465,lat:1.4449997361197968,address: 'BLK 689 WOODLANDS DR 75',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.94327415534353,1.350795236166687],},
             properties: {carParkNo: 'T11',lng:103.94327415534353,lat:1.350795236166687,address: 'BLK 149/151 TAMPINES STREET 12',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.94571006575322,1.350995008766851],},
             properties: {carParkNo: 'T12',lng:103.94571006575322,lat:1.350995008766851,address: 'BLK 156/160 TAMPINES STREET 12',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.94593673935314,1.3497605122979959],},
             properties: {carParkNo: 'T13',lng:103.94593673935314,lat:1.3497605122979959,address: 'BLK 161/166 TAMPINES STREET 12',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.73114276393636,1.3457073771125947],},
             properties: {carParkNo: 'J24',lng:103.73114276393636,lat:1.3457073771125947,address: 'BLK 342/346 JURONG EAST STREET 31',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.7312797040588,1.3447386239957964],},
             properties: {carParkNo: 'J25',lng:103.7312797040588,lat:1.3447386239957964,address: 'BLK 347/350 JURONG EAST AVE 1',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.73059717671681,1.3449250021877523],},
             properties: {carParkNo: 'J26',lng:103.73059717671681,lat:1.3449250021877523,address: 'BLK 351/353 JURONG EAST STREET 31',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.86688723712652,1.3536627965167352],},
             properties: {carParkNo: 'SE16',lng:103.86688723712652,lat:1.3536627965167352,address: 'BLK 301/319 SERANGOON AVENUE 2',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.86863962208791,1.3508500416476534],},
             properties: {carParkNo: 'SE17',lng:103.86863962208791,lat:1.3508500416476534,address: 'BLK 321/329 SERANGOON AVENUE 3',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},

             {type: 'Feature',geometry: {type: 'Point',coordinates: [103.87033685564391,1.350234831700611],},
             properties: {carParkNo: 'SE18',lng:103.87033685564391,lat:1.350234831700611,address: 'BLK 330/335 SERANGOON AVENUE 3',predVacancy: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],evCharging: 'yes',nightParking: 'yes'}},
            
          ]
        }
      });

        map.addLayer({
          id: 'circles',
          source: 'points',
          type: 'circle',
          paint: {
            'circle-opacity': 0.75,
            'circle-stroke-width': 0.5,
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              4,
              1000,
              8,
              4000,
              10,
              8000,
              14,
              12000,
              18,
              100000,
              24,
              500000,
              30,
              1000000,
              40,
            ],
            'circle-color': 'red',
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        let lastId = undefined;
        map.on('mousemove', 'circles', (e) => {
          const id = e.features[0].properties.carParkNo;

          if (id !== lastId) {
            lastId = id;

            map.getCanvas().style.cursor = 'pointer';

            const {
              carParkNo,
              lng,
              lat,
              address,
              predVacancy,
              evCharging,
              nightParking
            } = e.features[0].properties;

            const HTML = `
            <div class="middle">
            <hr>
                      <p style="color:black"><b>${carParkNo}</b></p>
                      <p style="font-size:70%;color:black;">${address}</p>
                      <p style="color:black">00:00 ▁▁▂▃▅▉▅▁ 23:59</b></p>
                      <p style="color:black">Facilities: 🔌 | 🌙</p>
                      <hr>
                      </div>
                      `;
            popup.setLngLat([lng,lat]).setHTML(HTML).addTo(map);
          }
        });

        map.on('mouseleave', 'circles', function () {
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
        
        map.on('click', 'circles', function (e) {
          window.$selectedID = e.features[0].properties.carParkNo;
          window.location = 'http://localhost:3000/#report_fault'; // facilitate UX
          popup.remove();
        });
        
      });
    }
  
  useEffect(() => loadMap([103.8198, 1.3521],10.5), []);

    return (
      <section className="skill" id="carparks">
          <div className="container">
              <div className="row">
                  <div className="col-12">
                      <div className="skill-bx wow zoomIn">
                          <h2>Carparks <button className='nearbyButton' onClick={() => loadMap([103.7312,1.3447],16)}>Nearby</button></h2>
                          <div className='mapContainer' >
                            <div ref={mapContainer} className='mapContainer shadow-sm' /></div>
                          </div>
                  </div>
              </div>
          </div>
          <img className="background-image-left" src={colorSharp} alt="Image" />
      </section>
    )
}
/**

export const Carparks = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="carparks">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="skill-bx wow zoomIn">
                        <h2>Carparks</h2>
                        <h3>Map here</h3>
                    </div>
                </div>
            </div>
        </div>
        <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  )
}
 






let lastId;
        map.on('mousemove', 'circles', (e) => {
          const id = e.features[0].properties.id;

          if (id !== lastId) {
            lastId = id;

            map.getCanvas().style.cursor = 'pointer';

            const {
              cases,
              deaths,
              recovered,
              flag,
              todayCases,
              todayDeaths,
            } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            const mortalityRate = ((deaths / cases) * 100).toFixed(2);

            const recoverRate = ((recovered / cases) * 100).toFixed(2);

            const countryFlag = `<img src=${flag}></img>`;

            const HTML = `
            <div class="middle">
            <hr>
                      <p>Cases: <b>${1}</b></p>
                      <p style="color:red;">Deaths: <b>${1}</b></p>
                      <p style="color:green;">Recovered : <b>${1}</b></p>
                      <p>Mortality Rate: <b>${1}%</b></p>
                      <p>Recover Rate: <b>${1}%</b></p>
                      <hr>
                      </div>
                      <div class="middle">
                      <p>New Cases : <b>${1}</b></p>
                      <p>New Death : <b>${1}</b></p>
                      </div>

                      `;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.on('mouseleave', 'circles', function () {
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
 
 */
