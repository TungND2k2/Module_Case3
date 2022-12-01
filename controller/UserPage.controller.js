const _handle = require("../handle/handle");
const connection = require("../model/DBconect");
const BaseController = require("./base.controller");
const qs = require("qs");
const {getCookies, getUserObj} = require("../utils");
const url = require("url");


class OrderController extends BaseController {
    async mainPage(req, res) {
        const user = JSON.parse(getCookies(req).user)
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
            html += `<td><a href="add?id=${order.ID_product}"><button class="btn btn-danger">Add</button></a></td>`
            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/User_Page/HomePage.html')
        data = data.replace('{list-user}', html)
        data = data.replace('{username}', `<div>${getUserObj(req)?.username}</div>`)
        data = data.replace('{userId}', `<div>${user.user.userId}</div>`)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }

    async searchData(req, res) {
        let data = ""
        req.on('data', chunk => {
            data += chunk
        })
        req.on('end', async () => {

            let dataLogin = qs.parse(data);
            let name = dataLogin.search;
            let sql = `select * from products where type_product='${name}' or name_product='${name}'`;
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
            let dataSearch = await _handle.getTemplate('./view/User_Page/Search.html')
            dataSearch = dataSearch.replace('{list-user}', html)
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(dataSearch);
            res.end();

        })

    }
    async InfoUser(req,res){
        let id = getUserObj(req)?.userId
        const sql = `SELECT * FROM account where ID_acc =${id} `;
        let user = await this.querySQL(sql);

        let html = "";

        user.forEach((user, index) => {
            html += "<tr>";

            html += `<td>${user.ID_acc}</td>`;
            html += `<td>${user.user_name}</td>`;
            html += `<td>${user.password}</td>`;
            html += `<td>${user.email}</td>`;
            html += `<td>${user.phone}</td>`;
            html += `<td> <a href="edit/user?id=${user.ID_acc}"  <button class="btn btn-danger">Edit</button></a> </td>`;

            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/User_Page/infouser.html')
        data = data.replace('{info-user}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
    async editUser(req, res) {
        let parseUrl = url.parse(req.url, true);
        let path = parseUrl.query;
        let index = qs.parse(path);
        console.log(index)
        let id = +index.id;
        let urlPath = req.method
        if (urlPath === 'GET') {
           let sqluser = `select * from account where ID_acc = ${id}`
            let user = await this.querySQL(sqluser);
            console.log(user)

            let dataEdit = await _handle.getTemplate('./view/User_Page/EditUser.html')
            dataEdit = dataEdit.replace('{input-name}', ` <input  value="${user[0].user_name}" type="text" class="form-control" placeholder="User Name" name="UserName" >`);
            dataEdit = dataEdit. replace('{input-password}',`<input  value="${user[0].password}" type="text" class="form-control" placeholder="Password" name="Password" >`);
            dataEdit = dataEdit.replace('{input-email}',`<input  value="${user[0].email}" type="text" class="form-control" placeholder="email" name="email" >`);
            dataEdit = dataEdit.replace('{input-phone}',`<input  value="${user[0].phone}" type="text" class="form-control" placeholder="Phone" name="Phone" >`)

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
                let name = dataInfo.UserName;
                let password = dataInfo.Password;
                let email = dataInfo.email;
                let phone = dataInfo.Phone;
                let sql = `update account set user_name = '${name}', password = '${password}',email = '${email}', phone = '${phone}'  where ID_acc = ${id} `;
                let result = await this.querySQL(sql);

                res.writeHead(301, {Location: '/info'})
                res.end();
            })
        }
    }

}

module.exports = OrderController