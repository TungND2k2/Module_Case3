const _handle = require("../handle/handle");
const connection = require("../model/DBconect");
const BaseController = require("./base.controller");
const url = require("url");
const qs = require("qs");

class AdminProductController extends BaseController {
    async showProduct(req, res) {
        const sql = 'SELECT * FROM products';
        let products = await this.querySQL(sql);

        let html = "";

        products.forEach((product, index) => {
            html += "<tr>";

            html += `<td>${product.ID_product}</td>`;
            html += `<td>${product.name_product}</td>`;
            html += `<td>${product.price_product}</td>`;
            html += `<td>${product.quantity}</td>`;
            html += `<td>${product.type_product}</td>`;
            html += `<td> <a href="/delete/product?id=${product.ID_product}" onclick="return confirm('Are you sure ?')" <button class="btn btn-danger">Delete</button></a> </td>`;
            html += `<td> <a href="/edit?id=${product.ID_product}"  <button class="btn btn-danger">Edit</button></a> </td>`;

            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/admin/list.product.html')
        data = data.replace('{list-product}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
    async deleteproduct(req,res){
        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        console.log(index)
        let id=+index.id;
        const sql = `delete from products where ID_product = ${id}`;
        await this.querySQL(sql);
        res.writeHead(301,{Location:'/product'});
        res.end();

    }
    async editProduct(req,res) {
        console.log(req)
        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        console.log(index)
        let id = +index.id;
        let urlPath = req.method
        if (urlPath === 'GET') {
            let sqlpro = `select * from products where ID_product = ${id}`
            let product = await this.querySQL(sqlpro);
            let dataEdit = await _handle.getTemplate('./view/admin/editproduct.html')
            dataEdit =dataEdit.replace('{input-name}', `<input type="text" value="${product[0].name_product}" class="form-control" placlassNameder="Name Product" name="name">`);
            dataEdit = dataEdit.replace('{input-price}',`<input  type="text" value="${product[0].price_product}" class="form-control" placeholder="Price Product" name="Price" >`);
            dataEdit =dataEdit.replace('{input-quantity}',`<input  type="text" value="${product[0].quantity}" class="form-control" placeholder="Quantity" name="Quantity" >`);
            dataEdit = dataEdit.replace('{input-type}',`<input  type="text" value="${product[0].type_product}"  class="form-control" placeholder="Type Product" name="Type_Product" >`);
            dataEdit = dataEdit.replace('{input-link-img}',` <input  type="text" value="${product[0].link_img}" class="form-control" placeholder="Type Product" name="Link_img" >`)
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataEdit);
            res.end();
        } else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataInfo = qs.parse(data);
                let name = dataInfo.Productname;
                let price = dataInfo.Price;
                let quantity = dataInfo.Quantity;
                let type = dataInfo.Type_Product;
                let sql = `update products set name_product = '${name}',price_product = ${price},quantity = ${quantity},type_product = '${type}' where ID_product = ${id}`;
                let result = await this.querySQL(sql);

                res.writeHead(301, {Location: '/product'})
                res.end();
            })
        }
    }
    async addProduct(req, res) {
        let urlPath = req.method
        if (urlPath === 'GET') {
            let dataRegister = await _handle.getTemplate('./view/admin/addproduct.html')
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataRegister);
            res.end();
        } else {
            let data = ""
            req.on('data', chunk => {
                data += chunk
            })
            req.on('end', async () => {

                let dataInfo = qs.parse(data);
                let name = dataInfo.Productname;
                let price = dataInfo.Price;
                let quantity = dataInfo.Quantity;
                let type = dataInfo.Type_Product;

                let sql = `Insert into products(name_product,price_product,quantity,type_product) value ('${name}', ${price},${quantity},'${type}')`;
                let result = await this.querySQL(sql);

                res.writeHead(301, {Location: '/product'})
                res.end();
            })
        }
    }




}

module.exports=AdminProductController