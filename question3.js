const axios = require("axios");
const cheerio = require("cheerio");

async function main() {
    const url = "https://codequiz.azurewebsites.net"
    const result = await axios.get(url, {
        headers: {
            Cookie: "hasCookie=true;"
        }
    })
    const $ = cheerio.load(result.data)
    const rows = $('tr')
    let data = {}
    for (let row = 0; row < rows.length; row++) {
        let tds = rows[row].children
        let temp = []
        for (let td = 0; td < tds.length; td++) {
            if (!tds[td].children) continue
            temp.push(tds[td].children[0].data)
        }
        data[temp.shift().replace(/\s$/, "")] = temp
    }
    console.log(data);
    console.log(data[process.argv[2]][0])
}

main()