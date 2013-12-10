define([], function() {
  var SearchView = Backbone.View.extend({
    tagName: 'div',
    className: 'search',
    events: {
        'click': 'open'
    },

    open: function() {
      console.log(this);
    }

  });

  return SearchView;

});
