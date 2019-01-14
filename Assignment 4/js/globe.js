 //variables sphere
 var radius = 1.5;
 var segments = 32;

 // lat, lon
 var coordinates_countries = {
   Belgium: [50.763677, 4.314856],
   France: [46.227638, 2.213749],
   UnitedStates: [37.090240, -95.712891],
   Spain: [40.463669, 40.463669],
   China: [35.861660, 104.195396],
   Italy: [41.871941, 12.567380],
   UnitedKingdom: [55.378052, -3.435973],
   Germany: [51.165691, 10.451526],
   Mexico: [23.634501, -102.552788],
   Thailand: [15.870032, 100.992538],
   Turkey: [38.963745, 35.243320],
   Austria: [47.516232, 14.550072],
   Malaysia: [4.210484, 101.975769],
   HongKong: [22.396427, 114.109497],
   Greece: [39.074207, 21.824312],
   Russia: [61.524010, 105.318756]
 }

 var scene = new THREE.Scene();
 var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 var renderer = new THREE.WebGLRenderer();
 renderer.setSize(850, 500);
 document.body.appendChild(renderer.domElement);

 // object to draw data on
 var planet = new THREE.Object3D();

 //var geometry = new THREE.BoxGeometry(1, 1, 1);
 var sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);

 //var material = new THREE.MeshPhongMaterial();
 var texture = new THREE.TextureLoader().load('earthmap.jpg');
 var material = new THREE.MeshBasicMaterial({
   map: texture
 });

 var sphere = new THREE.Mesh(sphereGeometry, material);

 // rotate sphere because then fit countries silhouttes with the texture map
 sphere.rotateX(THREE.Math.degToRad(-270));

 // add sphere with texture map to scene
 scene.add(sphere);

 // get country data from JSON and draw these silhouettes on the planet
 $.getJSON("data/countries.json", function (data) {
   drawThreeGeo(data, radius, 'sphere', {
     color: 0xffffff
   }, planet)
 });



 scene.add(planet);

 camera.position.z = 5;

 //Enable controls
 var controls = new THREE.TrackballControls(camera);

 // function to render scene
 var animate = function () {

   // update controls
   controls.update();
   // update scene
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
 };

 // function to update scene
 animate();

 // function that calculate x, y & z positions on sphere from latitudes and longitudes
 // then draw curve and add these to the scene
 function getCoordinatesCurve(lat1, lon1, lat2, lon2, color) {

   // calculate xyz vector from first coordinate
   var v0x = latLongToVector3(lat1, lon1, radius, 0).x;
   var v0y = latLongToVector3(lat1, lon1, radius, 0).y;
   var v0z = latLongToVector3(lat1, lon1, radius, 0).z;

   // calculate xyz vector from second coordinate
   var v2x = latLongToVector3(lat2, lon2, radius, 0).x;
   var v2y = latLongToVector3(lat2, lon2, radius, 0).y;
   var v2z = latLongToVector3(lat2, lon2, radius, 0).z;

   // calculate midpoint between first and second coordinate
   var midPointX = (v0x + v2x) / 2;
   var midPointY = (v0y + v2y) / 2;
   var midPointZ = (v0z + v2z) / 2;

   // calculate the distance beween the two coordinates
   var distance = Math.sqrt(Math.pow(v2x - v0x, 2) + Math.pow(v2y - v0y, 2) + Math.pow(v2z - v0z, 2));

   // calculate multipleVal to get the vector length (distance twice length)
   var multipleVal = Math.pow(distance, 2) / ((Math.pow(midPointX, 2)) + (Math.pow(midPointY, 2)) + (Math.pow(midPointZ, 2)));

   // apply the multipleVal to get v1(x, y, z)
   var v1x = midPointX + multipleVal * midPointX;
   var v1y = midPointY + multipleVal * midPointY;
   var v1z = midPointZ + multipleVal * midPointZ;

   // return 3 vectors
   //return [v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z];

   // create quadraticBezierCurve3
   var curve = new THREE.QuadraticBezierCurve3(
     new THREE.Vector3(v0x, v0y, v0z),
     new THREE.Vector3(v1x, v1y, v1z),
     new THREE.Vector3(v2x, v2y, v2z)
   );

   // create points, geometry and material for the curve
   var points = curve.getPoints(50);
   var geometryCurve = new THREE.BufferGeometry().setFromPoints(points);
   var materialCurve = new THREE.LineBasicMaterial({
     color: color
   });

   // create curveObject, rotate it and add it to the scene
   var curveObject = new THREE.Line(geometryCurve, materialCurve);
   curveObject.rotateX(THREE.Math.degToRad(-270));
   scene.add(curveObject);
 }


 // draw the curve for every country
 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.UnitedKingdom[0], coordinates_countries.UnitedKingdom[1], 0xDAF7A6);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Thailand[0], coordinates_countries.Thailand[1], 0xFFC300);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Turkey[0], coordinates_countries.Turkey[1], 0xbfbc2d);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Austria[0], coordinates_countries.Austria[1], 0xC70039);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.UnitedStates[0], coordinates_countries.UnitedStates[1], 0x3338FF);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.China[0], coordinates_countries.China[1], 0xFF33EE);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.HongKong[0], coordinates_countries.HongKong[1], 0x33FFC5);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Malaysia[0], coordinates_countries.Malaysia[1], 0x1A642B); //

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Mexico[0], coordinates_countries.Mexico[1], 0xFF5D33);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Germany[0], coordinates_countries.Germany[1], 0xB433FF);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Greece[0], coordinates_countries.Greece[1], 0xffdd87);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Russia[0], coordinates_countries.Russia[1], 0x98FF33);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.France[0], coordinates_countries.France[1], 0x33B3FF);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Italy[0], coordinates_countries.Italy[1], 0x638599);

 getCoordinatesCurve(coordinates_countries.Belgium[0], coordinates_countries.Belgium[1], coordinates_countries.Spain[0], coordinates_countries.Spain[1], 0x782E8C);


 // convert the positions from a lat, lon to a position on a sphere (x,y,z)
 function latLongToVector3(lat, lon, radius, heigth) {
   var phi = (lat) * Math.PI / 180;
   var theta = (lon - 180) * Math.PI / 180;

   var x = -(radius + heigth) * Math.cos(phi) * Math.cos(theta);
   var y = (radius + heigth) * Math.sin(phi);
   var z = (radius + heigth) * Math.cos(phi) * Math.sin(theta);

   return new THREE.Vector3(x, y, z);
 }