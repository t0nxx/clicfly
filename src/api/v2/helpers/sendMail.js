const api_key = '9865d400e70784476d638839493deaee-c8e745ec-4aefb90e';
const domain = 'test.1millionofcodes.com';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
function sendMail(mail,resetCode){
    const data = {
        from: "Toni toni@test.1millionofcodes.com",
        to: `${mail}`,
        subject: 'Test Reset Password',
        text: `test mail reset Password . your code is ${resetCode}`
      };
    mailgun.messages().send(data, function (error, body) {
        if(error) console.log(error);
        console.log(body);
      });
}
//sendMail('abdelrahman.ui@gmail.com');
exports.sendMail = sendMail ;