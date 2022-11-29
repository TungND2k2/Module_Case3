const http = require('http');
const PORT = 8000;
const url = require('url');
const server=http.createServer((req, res)=>{
    let urlPath = url.parse(req.url);


})
server.listen(PORT, 'localhost', () => {
    console.log('Server running on port ' + PORT)
})