var Hapi = require('hapi');
var server = new Hapi.Server();

var routes = require('./routes.js');
var plugins = [
  'inert',
  'vision'
].map(require);

server.connection({ port: process.env.PORT || 9000 });
server.register(plugins, function (err) {
  if (err) throw err;
  server.route(routes);
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: './public/views',
    path: '.',
    layout: 'default',
    layoutPath: 'layout',
    partialsPath: 'partials'
  });
});

module.exports = server;
