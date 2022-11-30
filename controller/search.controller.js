const _handle = require("../handle/handle");
const connection = require("../model/DBconect");
const BaseController = require("./base.controller");
const qs = require("qs");


class SearchController extends BaseController {
    async index(req, res) {
        let data = ""
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', async () => {

            let dataLogin = qs.parse(data);
            let name=dataLogin.search;
            let sql= `select * from products where type_product='${name}' or name_product='${name}'`;
            let result = await this.querySQL(sql);

            let html = "";

            result.forEach((products, index) => {
                html += "<tr>";
                html += `<td>${index + 1}</td>`;
                html += `<td>${products.name_product}</td>`;
                html += `<td>${products.price_product}</td>`;
                html += `<td>${products.quantity}</td>`;
                html += `<td>${products.type_product}</td>`;
                html += "</tr>";
            })
            let dataSearch = await _handle.getTemplate('./view/TypeSearch.html')
            dataSearch = dataSearch.replace('{list-user}', html)
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataSearch);
            res.end();

        })

}}
module.exports=SearchController