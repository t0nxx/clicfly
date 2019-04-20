const api_key = '9865d400e70784476d638839493deaee-c8e745ec-4aefb90e';
const domain = 'test.1millionofcodes.com';
const api_key2 = 'e3efb00fff61f48e481faf223cdbf13c-2416cf28-14c5b44e';
const domain2 = 'traveloffersnhotels.com';
const mailgun = require('mailgun-js')({apiKey: api_key2, domain: domain2});
 
function sendMail(mail,resetCode){
    const data = {
        from: "TravelOffers no-replay@traveloffersnhotels.com",
        // from: "Toni toni@test.1millionofcodes.com",
        to: `${mail}`,
        subject: 'Reset Password',
        text: `Your code is ${resetCode} 
        code will expires after 5 minutes .`
      };
    mailgun.messages().send(data, function (error, body) {
        if(error) console.log(error);
        console.log(body);
      });
}
//sendMail('hhaker95@gamil.com' , 2566);
exports.sendMail = sendMail ;