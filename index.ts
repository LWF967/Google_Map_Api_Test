/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

// Initialize and add the map
let map;
async function initMap(): Promise<void> {
  // The location of Uluru
  const positionStart = { lat: -30.344, lng: 131.031 };
  const positionEnd = { lat: -22.344, lng: 121.031 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  // 构建高级自定义svg插图引入脚本
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;


  // icon map Arr

  const iconBase = "https://maps.google.com/mapfiles/kml/shapes/";
  const icons = {
    parking: {
      name: "Parking",
      icon: iconBase + "parking_lot_maps.png",
    },
    info: {
      name: "customerIcon",
      icon: "https://res.17track.net/global-v2/imgs/logo/svg/full_owt_296x48.svg?v=3c2ed98eac",
    },
  };


  // The map, centered at Uluru
  map = new Map(
    document.getElementById('map') as HTMLElement,
    {
      zoom: 4,
      center: positionStart,
      mapId: 'DEMO_MAP_ID',
      // mapId: 'fb5f91a54c943c4b',
      // 控制地图样式设置
      styles: [
        {
          "featureType": "all",
          "stylers": [
            { "color": "#C0C0C0" }
          ]
        },{
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            { "color": "#CCFFFF" }
          ]
        },{
          "featureType": "landscape",
          "elementType": "labels",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ],
      // 控制地图选项的位置
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      },
    }
  );
  

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: positionStart,
    title: 'Uluru',
  });
  // customer icon
  const markerCustomer = new google.maps.Marker({
      position: positionEnd,
      icon: "//res.17track.net/global-v2/imgs/logo/svg/full_owt_296x48.svg?v=3c2ed98eac",
      map: map,
    });



  const legend = document.getElementById("legend");

   for (const key in icons) {
    const type = icons[key];
    const name = type.name;
    const icon = type.icon;
    const div = document.createElement("div");

    div.className = 'customerBox'     
    div.innerHTML = '<img src="' + icon + '"> ' + '<div class="desc">' + name + '</div>';
    legend.appendChild(div);
  }

  // 这个位置放至我们设置的提示框
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(legend);

  // 用于画线
  const flightPlanCoordinates = [
     { lat: -30.344, lng: 131.031 },
    { lat: -22.344, lng: 121.031 }
  ];
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);

}

initMap();

export { };
