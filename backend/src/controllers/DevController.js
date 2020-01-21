const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
            //esperará a resposta que virá da API
        
            const {name = login, avatar_url, bio} = apiRes.data
        
            const techsArray =  parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
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
    },

    async update(request, response){
        const {github_username, longitude, latitude, name, techs} = request.body;

        await Dev.findOneAndUpdate({ github_username }, 
            { name: name, techs: parseStringAsArray(techs), location: { type: 'Point', coordinates: [longitude, latitude] }}, 
            { useFindAndModify: false }
        );

        return response.json({message: 'Atualizado com sucesso!'});
    }
}