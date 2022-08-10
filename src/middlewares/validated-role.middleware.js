const verifyAdminRole = (req, res, next) => {
    const usuario = req.user
    if (usuario.role === '5f5b708a0c56761a0246fda7') return next()
    return res.status(401).json({
        ok: false,
        msg: 'El usuario no es Administrador'
    })
}

module.exports = verifyAdminRole;