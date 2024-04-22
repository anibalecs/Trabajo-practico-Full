const verifyAdmin = async (req, res, next) => {
    const user = req.user;
    if(user.roles != 'admin') {
        res.status(401).send("No autorizado")
    } else{
         next();
    }
} 

module.exports = {verifyAdmin}