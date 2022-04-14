import fetch from 'node-fetch';
const res = await fetch("https://www.services.gov.on.ca/slfr/rs/appointment/availableSlots/12043/137/1/E/en", {
    "headers": {
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
    "body": null,
    "method": "GET"
  });

console.log(await res.text());



