define(['models/search',], function(Search) {
  var SearchView = Backbone.View.extend({
    model: Search,
    events: {
        'click .search-go': 'open',
        'keyup .search-term': 'processKey'
    },

    open: function() {
      var searchTerm = this.$el.find('.search-term').val();
      new Search({term: searchTerm});
    },

    processKey: function(e) {
      if(e.which === 13) // enter key
        this.open();
    }

  });

  return SearchView;

});
