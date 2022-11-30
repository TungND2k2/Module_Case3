const http = require('http');
const PORT = 8000;
const url = require('url');



const OrderController = require("./controller/UserPage.controller");
const orderController=new OrderController()

const adminController = require('./controller/Admin.Home.controller')
const userController = new adminController()
const UserController = require("./controller/User.controller");
const user_Controller = new UserController()


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
            user_Controller.login(req, res);
            break;
        case '/register':
            user_Controller.register(req, res);
            break;
        case '/forgot':
            user_Controller.forgot(req, res);
            break;
        case '/show/user':
            AdminController.showUser(req, res);
            break;

        case '/delete/user':
            console.log(1)
            AdminController.deleteUser(req, res);

            break;
        case '/search':
            orderController.searchData(req, res)
            break;
        case '/home':
            orderController.mainPage(req, res);
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


        case '/logOut':
            user_Controller.logout(req, res);
            break;








    }


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})