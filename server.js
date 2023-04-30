const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')


// app.get('/users/:username', async(req,res)=>{
//     try{
//         const username = req.params.username;
//         const response = await fetch(`https://api.github.com/users/${username}`)
//         const user = await response.json();
//        res.status(200).json({
//         status: 'Success',
//         user
//        })
//     }catch(err){
//         console.log(err)
//     }
// })

const port = process.env.port || 3000
const server = app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})