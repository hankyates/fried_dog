var app = angular.module('friedDog', []);

app.controller('recipelist',function recipelist($scope) {
  $scope.recipes = /*$http.get('/recipes');*/
  [
    {'name':'Fried Dog','ingredients':[
      {'quantity':2,'unit':'cup','name':'flour'},
      {'quantity':2.5,'unit':'tbsp','name':'vanilla'},
      {'quantity':1,'unit':'','name':'dog'}]
    },
    {'name':'Baked Dog','ingredients':[
      {'quantity':2,'unit':'cup','name':'rasin'},
      {'quantity':2,'unit':'gallon','name':'Soy sauce'},
      {'quantity':1,'unit':'','name':'dog'}]
    }
    ];
});
