const http = require('http');
const PORT = 8000;
const url = require('url');

const OrderController = require("./controller/home.controller");
<<<<<<< HEAD
const orderController = new OrderController()
const adminController = require('./controller/Admin.Home')
=======

const orderController=new OrderController()
const adminController = require('./controller/Admin.Home.controller')


const adminController = require('./controller/Admin.Home')

>>>>>>> 2005d607fd7a548a9df93a5930e87fe1d0fe9bc9
const userController = new adminController()
const LoginController = require("./controller/login.controller");
const loginController = new LoginController()
const RegisterController = require("./controller/register.controller");
const ForgotController = require("./controller/forgot.controller");
const registerController = new RegisterController();
const forgotController = new ForgotController();
<<<<<<< HEAD
const SearchController= require('./controller/search.controller');
const searchController = new SearchController();
const server = http.createServer((req, res) => {
=======

const adminProductController = require('./controller/Admin.product.controller');
const  AdminProductController = new adminProductController()

const server=http.createServer((req, res)=>{

const SearchController= require('./controller/search.controller');
const searchController = new SearchController();
const server = http.createServer((req, res) => {

>>>>>>> 2005d607fd7a548a9df93a5930e87fe1d0fe9bc9
    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case '/login':
            loginController.login(req, res);
            break;
        case '/register':
            registerController.register(req, res);
            break;
        case '/forgot':
            forgotController.forgot(req, res);
            break;
        case '/admin':
            userController.index(req, res);
            break;
        case '/delete':
            console.log(1)
            userController.deleteUser(req, res);
            break;
        case '/search':
            searchController.index(req, res)
            break;
        case '/home':
            orderController.index(req, res);
            break;
<<<<<<< HEAD
=======

        case'/product':
            AdminProductController.index(req,res);
            break;
        case'/deleteproduct':
            AdminProductController.deleteproduct(req,res);
            break;
        case'/add':
           AdminProductController.addProduct(req,res);
            break;
        case'/edit':
            AdminProductController.editProduct(req,res);
            break;





>>>>>>> 2005d607fd7a548a9df93a5930e87fe1d0fe9bc9
    }


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})