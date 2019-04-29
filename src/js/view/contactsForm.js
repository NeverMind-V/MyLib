function contactMenuHandler() {
    let form = document.getElementById('feedback-form');
    let input = document.querySelectorAll('.js-contact-input[required]');
    let error = {
        userName: {
            message:'Имя должно быть больше двух символов.',
            regexp: /.{3,}/
        },
        userPhone: {
            message: 'Неправильный ввод номера телефона.',
            regexp: /[0-9]{7,}/
        },
        userEmail: {
            message: 'Почта введена некорректно.',
            regexp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        userMessage: {
            message: 'Сообщение должно быть больше 10 символов.',
            regexp: /.{10,}/
        },
        errorState: 0,
        validation: function(item) {
            if(!error[item.name].regexp.test(item.value)) {
                item.classList.add('warning');
                item.nextElementSibling.classList.add('active');
                item.nextElementSibling.innerHTML = error[item.name].message;
                return;                       
            } else {
                item.classList.remove('warning');
                item.nextElementSibling.innerHTML = '';
                item.nextElementSibling.classList.remove('active');
                error.errorState++;
            }
        }
    };
    if(window.location.href.indexOf('contacts.html') === -1) return;
    form.addEventListener('submit',function(e) {
        e.preventDefault();
        error.errorState = 0;
         input.forEach(item => {
            error.validation(item);            
        });
        if(error.errorState == input.length) {
            form.submit();
        }    
    });
}

export default contactMenuHandler;