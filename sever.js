const http = require('http');
const PORT = 8000;
const url = require('url');
const OrderController = require("./controller/home.controller");
const orderController=new OrderController()
const adminController = require('./controller/Admin.Home')
const userController = new adminController()
const server=http.createServer((req, res)=>{
    let urlPath = url.parse(req.url);
    switch (urlPath.pathname) {
        case '/homePage':
            orderController.index(req,res);
            break;
        case '/admin':
            userController.index(req,res);
            break;
        case '/delete':
            console.log(1)
            userController.deleteUser(req,res);
            break;

    }


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})