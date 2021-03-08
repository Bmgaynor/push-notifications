import React from "react";

const publicVapidKey =
  "BE4PNmAINfGg8fOrXang43fvNGnGGPEeq__ZhuHE6Pglzdvux0WVBcmr_4jFgSUpSPTp5_AdAyTYVUmQ6AS0jzk";
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function enablePush() {
  if ("serviceWorker" in navigator) {
    const reg = await navigator.serviceWorker.ready;

    const subscription = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });

    await fetch("/api/push", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    console.error("Service workers are not supported in this browser");
  }
}
async function testPush(title: string, body: string) {
  await fetch("/api/test", {
    method: "POST",
    body: JSON.stringify({
      title,
      body
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function serviceWorkerInstall () {
  if ('serviceWorker' in navigator) {
    console.log('loading  service worker')
    navigator.serviceWorker
    .register('./sw.js')
  }
}

export const Notifications: React.FC = () => {
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  React.useEffect(() => {
    serviceWorkerInstall()
  }, [])
  return (
    <div>
      <button onClick={enablePush}>Subscribe to push notifications</button>
      <div>
        <h2>Send test notifications to all subscriptions</h2>
        <label htmlFor='title'>title:</label>
        <input id='title' value={title} onChange={e => setTitle(e.target.value)} />

        <label htmlFor='body'>body:</label>
        <input id='body' value={body} onChange={e => setBody(e.target.value)} />
        <button onClick={() => {
          testPush(title, body)
        }}>Send</button>
      </div>
      
    </div>
  );
};

export default Notifications;
