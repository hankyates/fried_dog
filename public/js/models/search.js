define(['config', 'views/recipeList',  'models/recipeList'], function(config, RecipeListView, RecipeList) {
  var Search = Backbone.Model.extend({
    initialize: function(options) {
      var searchUrl = config.api.url + ':' + config.api.port + '/recipes/' + options.term;
      $.getJSON(searchUrl, function(response) {
        var RecipeCollection = new RecipeList(response.matches);
        new RecipeListView({
          el: '#recipe-list',
          collection: RecipeCollection
        });
      });
    }
  });

  return Search;
});
