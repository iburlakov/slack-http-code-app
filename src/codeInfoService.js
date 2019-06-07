'use strict'

const codes = require('../data/codes.json');

module.exports = (code) => {
   return Promise.resolve(code)
    .then(code => {

        // is 3 digit integer
        if (false == /^\d{3}$/.test(code)) {
            throw `${code} is not integer code`;
        } 

        // is known http code
        let codeInfo = codes.find(el => el.code == code);
        if (!codeInfo) {
            throw `${code} is not a valid HTTP status code, try 200 for instance`;
        }

        // return slack message
        return {
            text: `*${code}* - ${codeInfo.desc}`,
            attachments:
            [
                { text: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${code}` }
            ]
        };
    });
};