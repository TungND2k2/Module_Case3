const BaseController = require('./base.controller')
const _handle = require("../handle/handle");
const fs = require('fs');
const qs = require('qs');
class UserController extends BaseController {
    async login(req, res) {
        let pathUrl = req.url
        if (req.method === 'GET' ) {
            let cookie = req.headers.cookie;
            let sessionID = qs.parse(cookie,  { delimiter: /[;,]/ }).uId
            let dataFormLogin = await _handle.getTemplate('./view/User_Accound/login.html');
            fs.readFile("sessions/" + sessionID + ".txt", (err, data) => {
                    if (err) {
                        res.writeHead(200, {'Content-type': "text/html"});
                        res.write(dataFormLogin);
                        return res.end();
                    }
                    res.writeHead(301, {Location: '/home'})
                    return res.end();

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
                    res.setHeader('Set-Cookie',"uId=" + JSON.stringify(nameFile));
                    res.writeHead(301, {Location: '/home'});
                    res.end();
                }
            })
        }
    }
    async logout(req, res) {

        let cookie = req.headers.cookie;
        let sessionID = qs.parse(cookie,  { delimiter: /[;,]/ }).uId
        let dataFormLogin = await _handle.getTemplate('./view/HomePage.html');
        fs.unlink("sessions/" + sessionID + ".txt", (err) => {
            if (err) {
                res.writeHead(200, {'Content-type': "text/html"});
                res.write(dataFormLogin);
                return res.end();
            }
            res.writeHead(301, {Location: '/login'});
            return res.end();

        })
    }
    async register(req, res){
        let urlPath=req.method
        if(urlPath==='GET'){
            let dataRegister= await _handle.getTemplate('./view/User_Accound/register.html')
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataRegister);
            res.end();
        }else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataLogin = qs.parse(data);
                let name=dataLogin.name;
                let password=dataLogin.password;
                let repeatPassword=dataLogin.repeatPassword;
                if(repeatPassword===password && password.length >6){
                    let sql = `Insert into account(user_name,password) value ('${name}', '${password}')`;
                    let result = await this.querySQL(sql);
                    res.writeHead(301, {Location: '/login'})
                    res.end();
                }else {
                    res.writeHead(301, {Location: '/register'})
                    res.end();
                }


            })
        }

    }
    async forgot(req, res){
        let urlPath=req.method
        if(urlPath==='GET'){
            let dataRegister= await _handle.getTemplate('./view/User_Accound/forgot_password.html')
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataRegister);
            res.end();
        }else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataLogin = qs.parse(data);
                let name = dataLogin.name;
                let password = dataLogin.password;
                let repeatPassword = dataLogin.repeatPassword;
                if (repeatPassword === password && password.length > 6) {
                    let sql = `update  account set password='${password}' where user_name='${name}'  `;
                    let result = await this.querySQL(sql);
                    res.writeHead(301, {Location: '/login'})
                    res.end();
                } else {
                    res.writeHead(301, {Location: '/register'})
                    res.end();
                }
            })
        }

    }
}

module.exports = UserController;
