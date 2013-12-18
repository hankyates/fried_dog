define(['models/recipe', 'views/recipeList'], function(Recipe, RecipeListView) {
  var RecipeList = Backbone.Collection.extend({
    model: Recipe,
  });

  return RecipeList;

});
