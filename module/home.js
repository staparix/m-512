exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, replay) {
            return replay.view('views/home',{
                title:'Home'
            });
        }
    });
    next();
};

exports.register.attributes = {
    name: 'home'
};