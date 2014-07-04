////////////////////////////////////////////////////
// Socket management
////////////////////////////////////////////////////
//Generic
appTravel.factory('socket', function($rootScope) {
        var socket = io.connect();
        return {
                on: function(eventName, callback) {
                        console.log('[SOCKET]: received : ' + eventName); 
                        socket.on(eventName, function() {
                                var args = arguments;
                                console.log('[SOCKET]: args : ' + JSON.stringify(args)); 
                                $rootScope.$apply(function() {
                                        callback.apply(socket, args);
                                });
                        });
                }
        };
});
appTravel.controller('form' , function($scope) { 
  $scope.search ='';
  $scope.init = function(formdata)
    {
      if (typeof formdata != 'undefined') {
        $scope.search = formdata;
      };
    };
  
  
  });
appTravel.controller('mapData', function($scope, socket, $http){
  $scope.markersProperty = [];
    $scope.init = function(formparam){
      angular.extend($scope, {
        zoomProperty: 2,
        centerProperty: {
                      latitude: 51,
                      longitude: 10
              }
      });
    console.log('Map initialisation - DONE');
    socket.on('coords', function(data) {
              console.log('coords RECEIVED');
              $scope.markersProperty = [];
              google.maps.visualRefresh = true;
              var infoData = 'Test<br/>' + data.lat + ' : ' + data.lng;
              $scope.markersProperty.push({
                        latitude: data.lat,
                        longitude: data.lng,
                        icon: 'images/hotelmarker.png', 
                        infoWindow: infoData 
                      });    
              angular.extend($scope, {
                zoomProperty: 10,  
                refresh: true,
                fit: true
              });
          });
   };
 });