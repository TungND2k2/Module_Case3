const _handle = require("../handle/handle");
const connection = require("../model/DBconect");
const BaseController = require("./base.controller");
const url = require("url");
const qs = require("qs");

class AdminController extends BaseController {
    async showUser(req, res) {
        const sql = 'SELECT * FROM account';
        let orders = await this.querySQL(sql);

        let html = "";

        orders.forEach((user, index) => {
            html += "<tr>";

            html += `<td>${user.ID_acc}</td>`;
            html += `<td>${user.user_name}</td>`;
            html += `<td>${user.password}</td>`;
            html += `<td> <a href="/delete/user?id=${user.ID_acc}" onclick="return confirm('Are you sure ?')" <button class="btn btn-danger">Delete</button></a> </td>`;

            html += "</tr>";
        })

        let data = await _handle.getTemplate('./view/showUser.html')
        data = data.replace('{list-user}', html)
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data);
        res.end();
    }
     async deleteUser(req,res){

             let parseUrl = url.parse(req.url, true);
             let path = parseUrl.query;
             let index = qs.parse(path);
         console.log(index)
             let id=+index.id;
             const sql = `delete from account where ID_acc = ${id}`;
             await this.querySQL(sql);
             res.writeHead(301,{Location:'/show/user'});
             res.end();

         }


}

module.exports=AdminController