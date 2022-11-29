const BaseController = require('./base.controller')
const _handle = require("../handle/handle");
const fs = require('fs');
const qs = require('qs');
const OrderController = require("./home.controller");
const orderController=new OrderController()
class LoginController extends BaseController{
    async login(req, res){
        let pathUrl=req.url
        console.log(pathUrl)
        if (req.method === 'GET' && pathUrl==='/') {
            let dataForm = await _handle.getTemplate('./view/login.html');
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataForm);
            res.end();
            }

        else {
        let data = ""
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', async () => {

            let dataLogin = qs.parse(data);
            let sql = `SELECT COUNT(ID_acc) as totalUser FROM account WHERE user_name = "${dataLogin.username}" AND password = "${dataLogin.password}"`;
            let result = await this.querySQL(sql);
            if (result[0].totalUser === 0) {
                res.writeHead(301, {Location: '/'})
                res.end();
            }
            else {
                orderController.index(req,res)
            }
        })
    }
}}

module.exports = LoginController;
