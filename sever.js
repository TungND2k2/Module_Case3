const http = require('http');
const PORT = 8000;
const url = require('url');

const OrderController = require("./controller/home.controller");

const orderController = new OrderController()

const adminController = require('./controller/Admin.Home.controller')

const AdminController = new adminController()
const LoginController = require("./controller/login.controller");
const loginController = new LoginController()
const RegisterController = require("./controller/register.controller");
const ForgotController = require("./controller/forgot.controller");
const registerController = new RegisterController();
const forgotController = new ForgotController();

const adminProductController = require('./controller/Admin.product.controller');
const  AdminProductController = new adminProductController()
const SearchController= require('./controller/search.controller');
const searchController = new SearchController();
const server = http.createServer((req, res) => {
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
        case '/show/user':
            AdminController.showUser(req, res);
            break;
        case '/delete/user':
            console.log(1)
            AdminController.deleteUser(req, res);
            break;
        case '/search':
            searchController.index(req, res)
            break;
        case '/home':
            orderController.index(req, res);
            break;


        case'/product':
            AdminProductController.showProduct(req,res);
            break;
        case'/delete/product':
            AdminProductController.deleteproduct(req,res);
            break;
        case'/add':
           AdminProductController.addProduct(req,res);
            break;
        case'/edit':
            AdminProductController.editProduct(req,res);
            break;

    }


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})