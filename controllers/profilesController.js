const cache = require('memory-cache');
const fetch = require('node-fetch');

exports.getUserDetails= async(req, res, next)=>{
    try {
        const username = req.query.username;
        const response = await fetch(`https://api.github.com/users/${username}`);
         // Getting the rate limit remaining from the headers
         const remainingRequests = response.headers;
         const limitsremaining = remainingRequests.get('X-RateLimit-Remaining')
         if(limitsremaining === 0){
             const errorMessage = 'It looks like you reached the rate limit 😥! Try again in 60mins'
             console.log(errorMessage)
             res.status(500).render('error',{
                 errorMessage
             });
             return
         }
        // check if theres user with username
        if(response.status === 404){
            const errorMessage = 'User not found 🤔 ! Please try again'
            res.render('error', {
                errorMessage
            })
            return
        }
       
        const userData = await response.json();
        const joinedAt = new Date(userData.created_at).toDateString();
        // storing the rate limit in cache
        cache.put('rateLimitRemaining', limitsremaining);
        const repositories = await fetch(`https://api.github.com/users/${username}/repos`)
        const repoData = await repositories.json();

        //add it to the request object
        req.userData = userData;
        req.repositories = repoData;
        req.limitsremaining = limitsremaining
        req.joinedAt = joinedAt
        next();
    } catch (error) {
        console.log(error)
    }
}
