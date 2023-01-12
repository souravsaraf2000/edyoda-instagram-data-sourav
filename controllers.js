const axios = require('axios')

let allUsers = []

exports.handleCnt = (req,res,next,id) => {
    const limit = 10;
    const skip = (id*10)-10;
    req.limit = limit
    req.skip = skip;
    next();
}

exports.getPost = async (req,res) => {
    await axios.get(`https://dummyjson.com/posts?limit=${req.limit}&skip=${req.skip}`)
    .then(response=>{
        let posts = response.data.posts.map(item=>{
            let user = allUsers.filter((u)=> u.id===item.userId)[0]
            return {...item,'postPic':`https://picsum.photos/id/${item.userId}/600/350`, 'user': user}
        })
        return res.status(200).json(posts)
    })
    .catch(err=>{
        return res.status(400).json({
            'error' : 'Unable to get data'
        })
    })
}

exports.getUsers = async (req,res) => {
    await axios.get('https://dummyjson.com/users?limit=100')
    .then(response => {
        let users = response.data.users.map((item)=>{
            let user = {
                "id" : item.id,
                "name" : item.firstName + " " + item.lastName,
                "photo" : item.image
            }
            item = undefined
            return user
        })
        allUsers = users;
        return res.status(200).json(users)
    })
    .catch((err)=>{
        return res.status(400).json({
            'error' : 'Unable to fetch user data'
        })
    })
}