define(['models/search'], function(Search) {
  var Router = Backbone.Router.extend({

      routes: {
          "recipes/:term":        "search",
      },

      search: function(term) {
        new Search({
          term: term
        });
      }

  });

  return Router;

});
