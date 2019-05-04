function galleryDialogHandler() {
    let url = window.location.href;
    let dialog = document.querySelector('.js-gallery-dialog');
    let next = document.querySelector('.js-gallery-next');
    let prev = document.querySelector('.js-gallery-prev');
    let controls = [prev, next]; 
    let target;
    if(url.indexOf('gallery.html') === -1) return;
    document.addEventListener('click',function(e) {
        if(e.target.parentElement.classList.contains('js-gallery-item')) {
            let src = e.target.src;
            target = e.target.parentElement;
            next.style.display = 'block';
            prev.style.display = 'block';
            if(!target.nextElementSibling) {
                next.style.display = 'none';
            } else if(!target.previousElementSibling) {
                prev.style.display = 'none';
            } else {
                next.style.display = 'block';
                prev.style.display = 'block';
            }
            dialog.querySelector('.gallery__dialog-thumb').src = src;
            dialog.querySelector('.gallery__dialog').classList.add('zoomIn');
            document.querySelector('body').classList.add('modal');
            dialog.classList.add('active');
        } else if(e.target.classList.contains('js-gallery-dialog') || e.target.classList.contains('js-gallery-close')) {
            dialog.querySelector('.gallery__dialog').classList.remove('zoomIn');
            dialog.querySelector('.gallery__dialog').classList.add('zoomOut');
            setTimeout(function() {
                dialog.querySelector('.gallery__dialog').classList.remove('zoomOut');
                dialog.classList.remove('active');
                document.querySelector('body').classList.remove('modal');
            },400);
        }
    });
    controls.forEach(item => {
        item.addEventListener('click',function() {
            let direction = this === next ? 'nextElementSibling' : 'previousElementSibling';            
            let src = target[direction].firstChild.src;
            dialog.querySelector('.gallery__dialog-thumb').src = src;
            target = target[direction];
            if(!target[direction]) {
                this.style.display = 'none';
                return;
            } else {
                next.style.display = 'block';
                prev.style.display = 'block';
            }
        });
    });
}

export default galleryDialogHandler;