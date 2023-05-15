const { expressjwt: jwt } = require('express-jwt')

function authJwt() {
    const secret = process.env.secret
    const api = process.env.API_URL
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/book(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/user/login`,
            `${api}/user/register`,
        ],
    })
}

async function isRevoked(req, token) {
    if (token.payload.isAdmin == false) {
        return true
    }
    return false
}

module.exports = authJwt
