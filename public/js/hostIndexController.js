angular.module('cityGuidesApp')
  .controller('HostIndexController', HostIndexController);

HostIndexController.$inject = ['$http'];

function HostIndexController($http){
  var self = this;
  self.puppy = 'hello';
  self.newHost = {};
  self.allHosts = [];
  self.index = index;

  function index(){
    $http
      .get('http://localhost:3000/hosts')
      .then(function(response){
        console.log(response);
        self.allHosts = response.data;
      });
  }
  index();
}