const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
// Handle the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = event;
  // Show the install button
  butInstall.style.display = 'block';
  console.log('beforeinstallprompt event was fired');
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  // Clear the deferredPrompt so it can only be used once.
  deferredPrompt = null;
  // Hide the install button after install is initiated
  butInstall.style.display = 'none';
});

// Handle the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed', event);
  // Optionally, hide the install button if the app is installed
  butInstall.style.display = 'none';
});
