const _handle = require("../handle/handle");
const qs = require("qs");
const BaseController = require("./base.controller");

class RegisterController extends BaseController {
    async register(req, res){
        let urlPath=req.method
        if(urlPath==='GET'){
        let dataRegister= await _handle.getTemplate('./view/register.html')
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
                    if(repeatPassword===password){
                        let sql = `Insert into account(user_name,password) value ('${name}', '${password}')`;
                        let result = await this.querySQL(sql);
                        res.writeHead(301, {Location: '/'})
                        res.end();
                    }else {
                        res.writeHead(301, {Location: '/register'})
                        res.end();
                    }


                })
            }

}
}
module.exports=RegisterController