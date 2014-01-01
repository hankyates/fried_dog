define(['models/recipe'], function(Recipe) {
  var RecipeView = Backbone.View.extend({

    model: Recipe,

    initialize: function() {
      this.render();
    },

    render: function() {
      var template = _.template($('#recipe_template').html(), this.model.toJSON());
      this.$el.html(template);
      return this;
    }

  });

  return RecipeView;

});
