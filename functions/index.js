const functions = require('firebase-functions');
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);
exports.pushnotification = functions.database.ref('/notification/{uid}/{nid}').onWrite((event, context) => {
    console.log("EVENT", event.after.val());
    // const { id } = event.params;
    // const notification = event.data.val();
    console.log("params", context.params);
    const { uid, nid } = context.params;
    const payload = {
        data: { nid },
        notification: {
            title: `${event.after.val().title}`,
            body: `${event.after.val().message}`,
            sound: 'default',
        }
    }

    return admin.messaging().sendToTopic(`/topics/${uid}`, payload)
    // return;
})
