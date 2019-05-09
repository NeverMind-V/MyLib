function contactsIframeHandler() {
  if (window.location.href.indexOf('contacts.html') === -1) return;
  const iframe = document.querySelector('#map iframe');
  if (navigator.onLine) {
    iframe.style.display = 'block';
  } else {
    iframe.style.display = 'none';
  }
  window.addEventListener('online', () => {
    if (navigator.onLine) {
      iframe.style.display = 'block';
    } else {
      iframe.style.display = 'none';
    }
  });
  window.addEventListener('offline', () => {
    if (!navigator.onLine) {
      iframe.style.display = 'none';
    }
  });
}

export default contactsIframeHandler;
