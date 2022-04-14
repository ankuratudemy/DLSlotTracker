
const axios = require('axios').default;
const {sendTextEmail} = require('../../emails/sendMail');
module.exports.getSlots = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try{
    var config = {
      method: 'get',
      url: 'https://www.services.gov.on.ca/slfr/rs/appointment/availableSlots/12043/137/1/E/en',
      headers: {
        "accept": "application/json; charset=UTF-8",
        "accept-language": "en-US,en;q=0.9",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"100\", \"Google Chrome\";v=\"100\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "_ga=GA1.3.770686403.1649351596; _gid=GA1.3.212903330.1649898255; JSESSIONID=0000OHIj3vRxBT8shLNMpJzcTJl:1bqbgrmpu",
        "Referer": "https://www.services.gov.on.ca/sf/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      body: null,
    };
    const res = await axios(config);
    console.log(res.data)
    console.log(JSON.stringify(res.data));
  const subject = "DL Slots cron";
  const message = `Found Slots : ${JSON.stringify(res.data)}`;
  const emailresponse = await sendTextEmail("ankurgupta325@gmail.com",subject,message);

  // send back success failure message 
  console.log(emailresponse)
  }
  catch(error){
    console.log(error);
  }

}