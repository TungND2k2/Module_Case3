const http = require('http');
const PORT = 8000;
const url = require('url');
const LoginController = require("./controller/login.controller");
const loginController=new LoginController()
const RegisterController =require("./controller/register.controller");
const ForgotController =require("./controller/forgot.controller");
const registerController = new RegisterController();
const forgotController = new ForgotController();
const server=http.createServer((req, res)=>{
    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case '/':
                loginController.login(req, res);
            break;
        case '/register':
            registerController.register(req, res);
            break;
        case '/forgot':
            forgotController.forgot(req, res);
            break;
    }


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})