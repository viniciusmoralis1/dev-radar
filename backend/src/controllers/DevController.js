const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(req, res){
        const devs = await Dev.find();

        return res.json(devs);
    },

    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
    
        const dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
            //esperará a resposta que virá da API
        
            const {name = login, avatar_url, bio} = apiRes.data
        
            const techsArray =  parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            console.log(location);
        
            dev = await Dev.create({
                github_username, 
                name, 
                avatar_url, 
                bio, 
                techs: techsArray,
                location
            })
        }

        return response.json(dev);
    
    }
}