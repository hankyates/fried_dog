define(['views/recipe'], function(RecipeView) {
  var RecipeListView = Backbone.View.extend({

    initialize: function(options) {
      var self = this;
      this._recipeViews = [];

      this.collection.each(function(recipe) {
        self._recipeViews.push(new RecipeView({
          model : recipe
        }));
      });
      this.render();
    },

    render: function() {
      var self = this;
      $(this.el).empty();
      _.each(this._recipeViews, function(view) {
        self.$el.append(view.render().el);
      });
    }

  });

  return RecipeListView;

});
