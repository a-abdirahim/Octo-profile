const request = require('request')
const requestPromise = require('request-promise')

exports.getHome= async(req,res)=>{
    try {
        
        res.status(200).render('overview',{ })
    } catch (error) {
        
    }
}
exports.getProfile= async(req,res)=>{
    try {
        const username = req.params.username;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();
        console.log(username)
        res.status(200).render('profile', {
            title: 'profile',
            user: userData 
        });
    } catch (error) {
        console.log(error)
    }
}