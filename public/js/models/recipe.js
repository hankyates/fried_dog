define([], function() {
  var Recipe = Backbone.Model.extend({
    initialize: function(recipe) {
      this.set({
        name: recipe.recipeName,
        imageUrl: recipe.smallImageUrls[0]
      });
    }
  });

  return Recipe;
});
