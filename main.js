const axios = require('axios')
const cheerio = require('cheerio')
const html = axios
    .get('http://thagnexs.cjkx.net/web/g_detail.jsp?slipno=600013857115')
    .then(result => result.data)

Promise
    .all([html])
    .then(result => {
        /*Bill No*/
        const $ = cheerio.load(result[0])
        const Nobill = $('table').eq(0).text().trim().replace('Bill No. :','').split('(')
        const tacking = Nobill[0].trim()
        const status = Nobill[1].trim().replace(')','')

        /*Basic Info*/
        const Sender = $('table').eq(2).find('tr').eq(1).find('td').eq(0).text().trim()
        const Recipient = $('table').eq(2).find('tr').eq(1).find('td').eq(1).text().trim()
        const Qty = $('table').eq(2).find('tr').eq(1).find('td').eq(2).text().trim()
        const Consignee = $('table').eq(2).find('tr').eq(1).find('td').eq(3).text().trim()

        /*Agent Info & DM Info */
        const Division = $('table').eq(4).find('tr').eq(1).find('td').eq(0).text().trim()
        const AgentName = $('table').eq(4).find('tr').eq(1).find('td').eq(1).text().trim()
        const AgentTel = $('table').eq(4).find('tr').eq(1).find('td').eq(2).text().trim()
        const DM = $('table').eq(4).find('tr').eq(1).find('td').eq(3).text().trim()
        const DMMobile = $('table').eq(4).find('tr').eq(1).find('td').eq(4).text().trim()

        const Division1 = $('table').eq(4).find('tr').eq(2).find('td').eq(0).text().trim()
        const AgentName1 = $('table').eq(4).find('tr').eq(2).find('td').eq(1).text().trim()
        const AgentTel1 = $('table').eq(4).find('tr').eq(2).find('td').eq(2).text().trim()
        const DM1 = $('table').eq(4).find('tr').eq(2).find('td').eq(3).text().trim()
        const DMMobile1 = $('table').eq(4).find('tr').eq(2).find('td').eq(4).text().trim()

        const output = { "tracking_id":tacking,
        "sender": Sender,
        "recipient": Recipient,
        "consignee": Consignee,
        "agent": {
            "pickup": {
                "agent_name": AgentName,
                "agent_tel": AgentTel,
                "dm": DM,
                "dm_phone": DMMobile,
            },
            "delivery": {
                "agent_name": AgentName1,
                "agent_tel": AgentTel1,
                "dm": DM1,
                "dm_phone": DMMobile1,
              }
        },
        }
        console.log(output)
    

 


    


    })