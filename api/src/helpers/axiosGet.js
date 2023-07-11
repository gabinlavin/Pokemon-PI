const axios = require("axios")

const axiosGet = async (URL, parameter = undefined) => {
    if (!parameter) {
        const infoApi = await axios.get(URL, {
        })
        return infoApi.data.results;
    }
    const infoApi = await axios.get(URL.concat(parameter), {
    });
    return infoApi;
}
module.exports = axiosGet;