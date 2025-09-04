import jwt from 'jsonwebtoken'

const createToken = (req,res,userID) =>{
    const token = jwt.sign({userID},process.env.JWT_TOKEN,{expiresIn:'30d'})

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== 'development',
        sameSite:'none',
        maxAge:30*24*60*60*1000

    })

}
    
export default createToken;
