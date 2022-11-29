const _handle = require("../handle/handle");

class HomeController {
    async showHomePage(req, res) {
        let data = await _handle.getTemplate('./views/index.html');
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
}

module.exports = HomeController;