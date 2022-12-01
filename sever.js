const http = require('http');
const PORT = 8000;
const url = require('url');



const OrderController = require("./controller/UserPage.controller");
const orderController=new OrderController()

const adminController = require('./controller/Admin.Home.controller')
const UserController = require("./controller/User.controller");
const user_Controller = new UserController()


const AdminController = new adminController()


const adminProductController = require('./controller/Admin.product.controller');
const  AdminProductController = new adminProductController()

const server = http.createServer((req, res) => {

    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case '/login':
            user_Controller.login(req, res);
            break;
        case '/register':
            user_Controller.register(req, res);
            break;
        case '/recovery':
            user_Controller.forgot(req, res);
            break;
        case '/show/users':
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
        default :
            res.end();
    }


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})