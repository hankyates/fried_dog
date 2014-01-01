require.config({
  //baseUrl: 'js',
  //paths: {
  //}
});

$(document).ready(function (){
  require(['app'], function(app) {
    app.run();
  });
});
