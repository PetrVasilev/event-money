const jwt = require('jsonwebtoken')

const checkRole = async (authorization, role, required) => {
    if (!authorization) {
        throw new Error('Not access')
    }

    const verify = await jwt.verify(
        authorization,
        process.env[`${role.toUpperCase()}_ACCESS_TOKEN_SECRET`],
        (err, decoded) => {
            if (err) {
                if (required) {
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
