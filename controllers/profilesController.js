exports.getUserDetails= async(req, res)=>{
    try{
        const username = req.params.username;
        const apiUrl = `https://api.github.com/users/${username}`
        const repoUrl = `https://api.github.com/users/${username}/repos`
        const [userRes, repoRes] = await Promise.all([
            fetch(apiUrl),
            fetch(repoUrl)
        ])
        const user = await userRes.json();
        const repos = await repoRes.json();
        res.status(200).json({
        status: 'Success',
        data: {
            user,
            repos
        }
    })
    }catch(err){
        console.log(err)
    }
}
exports.getTopStarredRepos= async(username) =>{
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
    
        // Sort the repositories by stargazers_count in descending order
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
        // Get the first 5 repositories in the sorted array
        const topRepos = repos.slice(0, 5);
    } catch (error) {
        console.log(error)
    }
 }