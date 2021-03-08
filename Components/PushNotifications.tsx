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
async function testPush() {
  await fetch("/push", {
    method: "POST",
    body: JSON.stringify({}),
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
  React.useEffect(() => {
    serviceWorkerInstall()
  }, [])
  return (
    <div>
      <button onClick={enablePush}>Subscribe to push notifications</button>
      <button onClick={testPush}>test to push notifications</button>
    </div>
  );
};

export default Notifications;
