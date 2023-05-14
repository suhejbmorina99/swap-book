const { expressjwt: jwt } = require('express-jwt')

function authJwt() {
    const secret = process.env.secret
    const api = process.env.api
    return jwt({
        secret,
        algorithms: ['HS256'],
    }).unless({
        path: [
            { url: /\/api\/v1\/book(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/user/login`,
            `${api}/user/register`,
        ],
    })
}

module.exports = authJwt
