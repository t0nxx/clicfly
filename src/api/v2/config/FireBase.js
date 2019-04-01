const admin = require('firebase-admin');

const serviceAccount = require('./service2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://noti-app-d778e.firebaseio.com"
  databaseURL: "https://traveloffers-1553366481148.firebaseio.com"
});

const registrationToken = 'eoer7SZOIdk:APA91bGewpzrpNrx4or-OmtdkzvqBowVVxfxpdRoh6TFqKM4V_Q_xwsdt6ZZdLiVQmxdVeG6pjtgLKEKyPMwJQQ66Sh6TKFUkNCQzVHL9GL0XPilsrr6fx3_ArB1KTn3csdSHYSZBjzb';

const message = {
  data: {
   title : 'New Offer',
   msg : 'Hi ya sa7b :3',
   icon : 'https://image.flaticon.com/icons/svg/1498/1498461.svg'
  },
  topic: 'marketing'
  //token: registrationToken
};

async function subscribeTopic (registrationToken){
  try {
   let response = await admin.messaging().subscribeToTopic(registrationToken, 'marketing');
   if(response.failureCount > 0) throw new error 
  } catch (error) {
    throw new Error ('invalid notification token') ;
  }
  
}

function unSubscribeTopic (registrationToken){
  admin.messaging().unsubscribeFromTopic(registrationToken, 'marketing')
  .then(function(response) {
    console.log('Successfully Unsubscribed to topic:', response);
  })
  .catch(function(error) {
    console.log('Error Unsubscribing to topic:', error);
  });
}


function sendNotification (message){
  admin.messaging().send(message)
 .then((response) => {
 console.log('Successfully sent message:', response);
 })
.catch((error) => {
 console.log('Error sending message:', error);
});
}
//subscribeTopic (registrationToken);

//sendNotification(message);
module.exports = {sendNotification , subscribeTopic , unSubscribeTopic} ;
