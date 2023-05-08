const cache = require('memory-cache');


exports.getHome= async(req,res)=>{
    try {
        const response = await fetch('https://api.github.com/rate_limit');
        const data = await response.json();
        // Extract the remaining requests value from the response
        const remainingRequests = data.resources.core.remaining;
        res.status(200).render('overview',{ requestlimit: remainingRequests })
    } catch (error) {
        console.log(error)
    }
}
exports.getProfile= async(req,res)=>{
    try {
        // Fetch details from api
        const username = req.query.username;
        const response = await fetch(`https://api.github.com/users/${username}`);
        // console.log(response.status)
        if(response.status === 404){
            const errorMessage = 'User not found 🤔 ! Please try again'
            res.render('error', {
                errorMessage
            })
            return;
        }
        // Getting the rate limit remaining from the headers
        const remainingRequests = response.headers;
        const limitsremaining = remainingRequests.get('X-RateLimit-Remaining')
        if(limitsremaining === 0){
            const errorMessage = 'It looks like you reached the rate limit 😥! Try again in 60mins'
            res.status(500).render('error',{
                errorMessage
            });
            return
        }
        // storing the rate limit in cache
        cache.put('rateLimitRemaining', limitsremaining);
        const repositories = await fetch(`https://api.github.com/users/${username}/repos`)
        
        // Storing the responses in variables
        const userData = await response.json();
        const reposData = await repositories.json();
        const joinedAt = new Date(userData.created_at).toDateString();

    // Sort the repositories by stargazers_count in descending order
    // reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
  
    // Get the first 5 repositories in the sorted array
    const topRepos = reposData

        // Rendering 
        res.status(200).render('profile', {
            title: 'profile',
            user: userData,
            repos: topRepos,
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