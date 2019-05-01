function contactsIframeHandler() {
    let iframe = document.querySelector('#map iframe');
    if(navigator.onLine) {
        iframe.style.display = 'block';
    } else {
        iframe.style.display = 'none';
    }
    window.addEventListener('online',function() {
        if(navigator.onLine) {
            iframe.style.display = 'block';
        } else {
            iframe.style.display = 'none';
        }
    });
    window.addEventListener('offline',function() {
        if(!navigator.onLine) {
            iframe.style.display = 'none';
        }
    });    
}

export default contactsIframeHandler;