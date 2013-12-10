define(['config'], function(config) {
  var Search = Backbone.Model.extend({
    initialize: function(options) {
      var searchUrl = config.api.url + ':' + config.api.port + '/recipes/' + options.term;
      $.getJSON(searchUrl, function(data) {
        console.log(data);
      });
    }
  });

  return Search;
});
