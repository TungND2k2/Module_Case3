const getCookies = function (request) {
    const cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function (cookie) {
        const parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
};


const getUserObj = function (request) {
    const cookies = getCookies(request)
    try {
        return JSON.parse(cookies.user).user
    } catch (e) {
        return null
    }

}
module.exports = {getCookies, getUserObj}