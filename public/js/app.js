define(['router', 'views/search'], function(Router, SearchView) {
  return {
    run: function() {
      new Router();
      Backbone.history.start();
      new SearchView({
        el: '.search'
      });
    }
  }
});
