const BaseController = require('./base.controller')
const _handle = require("../handle/handle");
const fs = require('fs');
const qs = require('qs');
const OrderController = require("./home.controller");
const orderController = new OrderController()

class LoginController extends BaseController {
    async login(req, res) {
        let pathUrl = req.url
        if (req.method === 'GET' && pathUrl === '/') {
            let cookie = req.headers.cookie;
            let sessionID = qs.parse(cookie).uId;
            let dataFormLogin = await _handle.getTemplate('./view/login.html');
            fs.readFile("sessions/" + sessionID + ".txt", (err, data) => {
                if (err) {
                    res.writeHead(200, {'Content-type': "text/html"});
                    res.write(dataFormLogin);
                    return res.end();
                }
                orderController.index(req, res)

            })
        } else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataLogin = qs.parse(data);
                let sql = `SELECT COUNT(ID_acc) as totalUser FROM account WHERE user_name = "${dataLogin.username}" AND password = "${dataLogin.password}"`;
                let result = await this.querySQL(sql);
                if (result[0].totalUser === 0) {
                    res.writeHead(301, {Location: '/login'})
                    res.end();
                } else {
                    let data = {
                        user: {
                            username: dataLogin.username,
                            password: dataLogin.password,
                        },
                        expires: Date.now() + 60 * 1000 * 2
                    }

                    let nameFile = Date.now();

                    let session = JSON.stringify(data);
                    let writeFile = await _handle.writeFile(nameFile, session);
                    res.setHeader('Set-Cookie', "uId=" + JSON.stringify(nameFile));
                    res.writeHead(301, {Location: '/home'});
                    res.end();
                }
            })
        }
    }
}

module.exports = LoginController;
