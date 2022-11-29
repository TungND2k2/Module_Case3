const _handle = require("../handle/handle");
const connection = require("../model/DBconect");
const BaseController = require("./base.controller");

class OrderController extends BaseController {
    async index(req, res) {
        const sql = 'SELECT * FROM products LIMIT 10';
        let orders = await this.querySQL(sql);

        let html = "";

        orders.forEach((order, index) => {
            html += "<tr>";
            html += `<td>${index + 1}</td>`;
            html += `<td>${order.name_product}</td>`;
            html += `<td>${order.price_product}</td>`;
            html += `<td>${order.quantity}</td>`;
            html += `<td>${order.type_product}</td>`;
            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/HomePage.html')
        data = data.replace('{list-user}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
}
module.exports=OrderController