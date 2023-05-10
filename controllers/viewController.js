const catcAsync = require('../utils/catchAsync')
const cache = require('memory-cache');

exports.getHome= catcAsync( async(req,res)=>{
        res.status(200).render('overview')
}
)
exports.getProfile= async(req,res)=>{
    try {
        console.log(req)
        const userData = req.userData;
        const repositories = req.repositories;
        const limitsremaining = req.limitsremaining
        const joinedAt = req.joinedAt

        // Rendering 
        res.status(200).render('profile', {
            title: 'profile',
            user: userData,
            repos: repositories,
            requestlimit: limitsremaining,
            joinedAt: joinedAt,
        });
    } catch (error) {
        console.log(error)
        const errorMessage = 'It looks like there is a problem on our end 😥! Try again later'
        res.status(500).render('error',{
            errorMessage
        });
    }
}