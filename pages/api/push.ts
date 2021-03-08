import webPush from 'web-push'

const subscriptions = []

const publicVapidKey = 'BE4PNmAINfGg8fOrXang43fvNGnGGPEeq__ZhuHE6Pglzdvux0WVBcmr_4jFgSUpSPTp5_AdAyTYVUmQ6AS0jzk';
const privateVapidKey = 'biGlSXM5QX8ONpb5JG1gBusqA1SWnUEzNrZqCd5wEZ0';
webPush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
);

export default function handler(req, res) {
  if (req.method === 'POST') {
    const subscription = req.body;
    subscriptions.push(subscription)
    res.status(201).json({});
  
    const payload = JSON.stringify({
      title: "Push notifications with Service Workers",
    });
  
    webPush
      .sendNotification(subscription, payload)
      .catch((error) => console.error(error));
  } else {
    // Handle any other HTTP method
  }
}


webPush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
);



// app.post("/subscribe", (req, res) => {
//   const subscription = req.body;
//   subscriptions.push(subscription)
//   res.status(201).json({});

//   const payload = JSON.stringify({
//     title: "Push notifications with Service Workers",
//   });

//   webPush
//     .sendNotification(subscription, payload)
//     .catch((error) => console.error(error));
// });


// app.post("/push", () => {
//   const payload = JSON.stringify({
//     title: "Push test",
//     body: "Server pushed to all clients"
//   });
//   subscriptions.forEach(sub => {
//     webPush
//     .sendNotification(sub, payload)
//     .catch((error) => console.error(error));
//   })
// })