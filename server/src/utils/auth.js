const jwt = require('jsonwebtoken')

const checkRole = async (authorization, role) => {
    if(role === 'user') {
        return null
    }

    if (!authorization) {
        throw new Error('not access')
    }

    const verify = await jwt.verify(
        authorization,
        process.env[`${role.toUpperCase()}_ACCESS_TOKEN_SECRET`],
        (err, decoded) => {
            if (err) {
                if (require) {
                    if (err.message === 'jwt expired') {
                        throw new Error('access token expired')
                    } else {
                        throw new Error('access token error')
                    }
                } else {
                    return null
                }
            }
            return decoded
        }
    )

    return verify
}

module.exports = {
    checkRole
}
