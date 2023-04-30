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