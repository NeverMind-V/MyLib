function addMaterial(input,chosen) {
    let newData = JSON.parse(localStorage.getItem('data'));
    let id = newData[newData.length - 1].id;
    let obj = {};
    obj.id = +id + 1 + '';
    input.forEach( item => {

        if(item.id == 'modalThumbnail') {
            obj.thumbnail = localStorage.getItem('storagePath') + item.files[0].name;
        } else if(item.id == 'modalFile' && !item.disabled) {
            obj.url = localStorage.getItem('storagePath') + item.files[0].name;
        }

        obj.type = (chosen == 'modalText') ? 'file-alt' : chosen == 'modalAudio' ? 'music' : 'video';

        switch (item.name) {
            case 'userName':
                obj.author = item.value;
                break;
            case 'userDescription':
                obj.description = item.value;                
                break;
            case 'userTitle':
                obj.name = item.value;
                break;
        }

    });
    newData.push(obj);
    localStorage.removeItem('data');
    localStorage.setItem('data',JSON.stringify(newData));
}

function addCategoryItem() {
    let url = window.location.href;
    let dialog = document.querySelector('.js-category-add-dialog'); 
    let input;
    let form;   
    let radio = document.querySelectorAll('.js-category-radio');
    let chosenCategory;   
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
        userFile: {
            messageEmpty: 'Файл не выбран.',
            messageFormat: 'Формат файла не поддерживается.',
            modalThumbnail: ['jpg','jpeg','gif','png'],
            modalAudio: ['mp3','ogg','wav'],
            modalVideo: ['mp4','webm','ogg'],
            state: false
        },
        userTitle: {
            message: 'Название должно быть больше двух символов.',
            regexp: /.{3,}/
        },
        userDescription: {
            message: 'Описание должно быть больше 10 символов.',
            regexp: /.{10,}/
        },
        hasError: function(items) {
            let state = false;
            items.forEach(item => {
                if(item.nextElementSibling.classList.contains('active')) {
                    state = true;
                }
            });
            return state;
        },
        validation: function(item) {     
            let errorType = '';

            if(item.name === 'userFile') {
                if(item.disabled) return;
                if(item.files.length == 0) {
                    errorType = 'emptyFileError';                    
                } else {
                    error.userFile[item.id == 'modalThumbnail' ? item.id : chosenCategory].some( format => {
                        if(item.files[0].name.includes(format)) {
                            errorType = '';
                            return true;
                        }
                        errorType = 'formatError';                                                                        
                    });               
                }

            } else {     
                errorType = !error[item.name].regexp.test(item.value) ? 'textInputError' : '';
            }

            switch(errorType) {
                case 'emptyFileError':
                    item.nextElementSibling.classList.add('active');
                    item.nextElementSibling.innerHTML = error[item.name].messageEmpty;  
                    break;
                case 'formatError':
                    item.nextElementSibling.classList.add('active');
                    item.nextElementSibling.innerHTML = error.userFile.messageFormat;  
                    break;
                case 'textInputError':
                    item.classList.add('warning');
                    item.nextElementSibling.classList.add('active');
                    item.nextElementSibling.innerHTML = error[item.name].message;
                    break;
                default:
                    item.classList.remove('warning');
                    item.nextElementSibling.innerHTML = '';   
                    item.nextElementSibling.classList.remove('active');
            }   
        }
    }; 
    if(url.indexOf('category.html') === -1) return;      
    document.addEventListener('click',function(e) {
        if(e.target.classList.contains('js-category-add-btn')) {
            dialog.querySelector('.category__dialog').classList.add('zoomIn');
            dialog.classList.add('active');
            document.querySelector('body').classList.add('modal');
            input = document.querySelectorAll('.js-category-input.js-required');
            form = document.getElementById('category-add-form');
            radio.forEach(item => {
                if(item.checked) {
                    chosenCategory = item.id;
                    if(chosenCategory == 'modalText') {
                        document.querySelector('#modalFile').disabled = true;
                    } else {
                        document.querySelector('#modalFile').disabled = false;
                    }
                }  
                item.addEventListener('change',function() {
                    if(this.checked) {
                        chosenCategory = this.id;
                        if(chosenCategory == 'modalText') {
                            document.querySelector('#modalFile').disabled = true;
                        } else {
                            document.querySelector('#modalFile').disabled = false;
                        }
                    }        
                });
            });
            form.addEventListener('submit',function(e) {
                e.preventDefault();
                input.forEach(item => {
                    error.validation(item);            
                });
                if(!error.hasError(input)) {
                    addMaterial(input,chosenCategory);
                    form.submit();
                }    
            }); 
        } else if(e.target.classList.contains('js-category-add-dialog') || e.target.classList.contains('js-category-close')) {
            dialog.querySelector('.category__dialog').classList.remove('zoomIn');
            dialog.querySelector('.category__dialog').classList.add('zoomOut');
            setTimeout(function() {
                dialog.querySelector('.category__dialog').classList.remove('zoomOut');
                dialog.classList.remove('active');
                document.querySelector('body').classList.remove('modal');
            },400);
        }          
    });   
}

export { addCategoryItem, addMaterial };