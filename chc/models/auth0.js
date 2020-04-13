
const axios = require('axios');
const queries = require('../db/dbfunction')
var request = require("request");
const userinfoUrl= process.env.AUTH0_USERINFO_URL
const apiUrl = process.env.AUTH0_URL
const AUTH0_TOKEN_URL= process.env.AUTH0_TOKEN_URL
const BODY = process.env.BODY

class UserInfo {
    async getUserInfo(token) {
        let headers = { authorization: token }
        const options = { url: apiUrl, method: "get", headers };
        const data = await axios(options);
        return data;
    }

    async getOrgid(data) {
        var id = data.sub;
        const opti = {
            method: 'POST',
            url: `${AUTH0_TOKEN_URL}`,
            headers: { 'content-type': 'application/json' },
            body: BODY
        };
        request(opti, async function (error, response, body) {
            let data = JSON.parse(response.body);
            const tok = data.access_token;

            var header = {
                'Authorization': `Bearer ${tok}`,
            };

            var option = {
                method: 'GET',
                url: `${userinfoUrl}/${id}?fields=email%2Cusername%2Cuser_metadata&include_fields=true`,
                headers: header
            };
            const result = await axios(option);
            console.log(result.data);
            const info = result.data;

            const org = info['user_metadata']['org_id']

            const Users = new queries();
            Users.userInfo(info.username, info.email, org);


            return info;
        })
    };

}



module.exports = UserInfo;

















