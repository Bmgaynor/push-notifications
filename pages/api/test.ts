import webPush from 'web-push'
import { subscriptions } from './push'
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title = 'test notification', body = 'test body' } = req.body;
    const payload = JSON.stringify({
      title,
      body
    });
    
    subscriptions.forEach(sub => {
      webPush
      .sendNotification(sub, payload)
      .catch((error) => console.error(error));
    })
    res.status(201).json({
      subscriptions
    });
  } else {
    // Handle any other HTTP method
  }
}
