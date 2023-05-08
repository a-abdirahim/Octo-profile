const request = require('request')
const requestPromise = require('request-promise')
const Chart = require('chart.js');

exports.getHome= async(req,res)=>{
    try {
        
        res.status(200).render('overview',{ })
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
            sreturn
        }
        const repositories = await fetch(`https://api.github.com/users/${username}/repos`)
        
        // Storing the responses in variables
        const userData = await response.json();
        const reposData = await repositories.json();
        

    // Sort the repositories by stargazers_count in descending order
    // reposData.sort((a, b) => b.stargazers_count - a.stargazers_count);
  
    // Get the first 5 repositories in the sorted array
    const topRepos = reposData

        // Rendering 
        res.status(200).render('profile', {
            title: 'profile',
            user: userData,
            repos: topRepos,
            requestlimit: limitsremaining
        });
    } catch (error) {
        console.log(error)
        const errorMessage = 'It looks like there is a problem on our end 😥! Try again later'
        res.status(500).render('error',{
            errorMessage
        });
    }
}