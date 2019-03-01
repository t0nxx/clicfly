const admin = require('firebase-admin');

const serviceAccount = require('./service.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://noti-app-d778e.firebaseio.com"
});

const registrationToken = 'dQ6adPAF91A:APA91bHlF_0MMfQ_OvY41LAPPe4V1HuSYoRNWaDI2V2ABCzjRQluhCPCYK7O0n6vXWjzVvY8ZIKPmrDJTGZb3XHAYYhIQpqIVekdiAhsnG3Bic9AXn9d7bCoozQ-r3_nqtCp8GYW1IfN';
const registrationTokens = ['eoer7SZOIdk:APA91bGewpzrpNrx4or-OmtdkzvqBowVVxfxpdRoh6TFqKM4V_Q_xwsdt6ZZdLiVQmxdVeG6pjtgLKEKyPMwJQQ66Sh6TKFUkNCQzVHL9GL0XPilsrr6fx3_ArB1KTn3csdSHYSZBjzb','e7wGzEpst4Y:APA91bH5JUHB5jPY-kBlb3TfNpMQlf0DTY_CUhSlCqfZlTZNzvlrT-Y0PVJPm7Tq6uw8uATqrHHfQlHMrjk8u6A2c3n9xUO7rOILGMroptZtbGH6tAVHyb74_aIkyMtmQjpr7BnOxqyd','cC-qvPaoO-0:APA91bFYYEDC_UtPb1fTpAjuIR78EncvtnJEEvwlyBoQx86P3E0UjXUwdOb8Mdqvj_grF9Hg_Kq700O-5WAqvKu-3dody0OyJ-jElDd4NF5BzdXLjvLDbTOerXmVllngr2xD5E27yqLy'];

const message = {
  data: {
   title : 'New Offer',
   msg : 'Hi ya sa7b :3'
  },
  //topic: 'test'
  token: registrationToken
};

function subscribeTopic (registrationTokens){
  admin.messaging().subscribeToTopic(registrationTokens, 'test')
  .then(function(response) {
    console.log('Successfully subscribed to topic:', response);
  })
  .catch(function(error) {
    console.log('Error subscribing to topic:', error);
  });
}


function sendNotification (){
  admin.messaging().send(message)
 .then((response) => {
 console.log('Successfully sent message:', response);
 })
.catch((error) => {
 console.log('Error sending message:', error);
});
}
subscribeTopic (registrationTokens);

sendNotification();
