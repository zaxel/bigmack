//use this for adaptive single slide
$(document).ready(function(){
    $('.discover__carousel').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        
    });
});



$(document).ready(function(){
    const top_nav_menu = document.querySelector('.top_nav_menu');
    const header_nav = document.querySelector('.header');
    const body = document.querySelector('body');
    const burger = document.querySelector('.burger');
    $('.burger').click(function(event){
        $('.top_nav_menu').toggleClass('top_nav_menu_active');
        $('.header').toggleClass('header_nav_stick_tothe_top');
        $(this).toggleClass('active_burger');
        $('body').toggleClass('lock');
        // $('.z-index-to-lower-class').toggleClass('zindex');  - uncomment if you need to give z-index
        $('.top_nav_ul').click(function(event){
            top_nav_menu.classList.remove('top_nav_menu_active');
            header_nav.classList.remove('header_nav_stick_tothe_top');
            burger.classList.remove('active_burger');
            body.classList.remove('lock');
            //$('.z-index-to-lower-class').removeClass('zindex'); - uncomment if you need to give z-index
        });
    });
});
$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() != 0)
        $('#jumbBtn').fadeIn();
        else
        $('#jumbBtn').fadeOut();
    });
    $('#jumbBtn').click(function(){
        $('body,html').animate({
            scrollTop: 0
        }, 800);
    });
});
(function(){
    if(!Element.prototype.closest){
        Element.prototype.closest = function(css){
            let node = this;
            while(node){
                if(node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function(){
    if(!Element.prototype.matches){
        Element.prototype.matches = Element.prototype.matchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();

(function(){
    const popupLinks = document.querySelectorAll('.popup-link');
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const elToAddPad = document.querySelectorAll('section');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const lockMargin = document.querySelectorAll('.lock-margin');
    let unlock = true;
    const timeout = 800; //this parametr has to be the same as transforme in your css ex: transition: all .8s ease 0s;
    let forms = document.querySelectorAll('.book-form');

    

    if(popupLinks.length > 0){
        for(let i = 0; i < popupLinks.length; i++){
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function(e){
                const popupName = popupLink.getAttribute('data-popup-id');
                const curentPopup = document.getElementById(popupName);
                popupOpen(curentPopup);
                e.preventDefault();
            }); 
        }
    }
    const popupCloseIcons = document.querySelectorAll('.close-popup');
    if(popupCloseIcons.length > 0){
        for(let i = 0; i < popupCloseIcons.length; i++){
            const popupCloseIcon = popupCloseIcons[i];
            popupCloseIcon.addEventListener('click', function(e){
                popupClose(popupCloseIcon.closest('.popup'));
                e.preventDefault();
            }); 
        }
    }
    function popupOpen(currentPopup){
        if(currentPopup && unlock){
            const popupActive = document.querySelector('.popup.popup-active');
            popupActive ? popupClose(popupActive, false) : bodyLock();
            

            currentPopup.classList.add('popup-active');
            currentPopup.addEventListener('click', function(e){
                if(!e.target.closest('.popup__content')){
                    popupClose(e.target.closest('.popup'));
                }
                e.preventDefault();
            })
        }
    }
    
    function popupClose(popupActive, doUnlock){
        doUnlock = (doUnlock === undefined) ? true : doUnlock;
        if(unlock){
            popupActive.classList.remove('popup-active');
            if(doUnlock){
                bodyUnlock();
            }
        }
    }
    function bodyLock(){
        const lockPaddingVal = window.innerWidth - document.querySelector('.main').offsetWidth + 'px';
        if(lockPadding.length > 0){
            for(let i=0; i < lockPadding.length; i++){
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingVal;
            }
            
        }
        if(lockMargin.length > 0){
            for(let i=0; i < lockMargin.length; i++){
                const el = lockMargin[i];
                el.style.marginRight = lockPaddingVal;
            }
            
        }
        body.classList.add('lock');
        // body.style.paddingRight = lockPaddingVal; //to use comment bottom if section and next 2 lines

        if(elToAddPad.length > 0){
            for(let i=0; i < elToAddPad.length; i++){
                const el = elToAddPad[i];
                el.style.paddingRight = lockPaddingVal;
            }
            
        }
        header.style.paddingRight = lockPaddingVal;
        footer.style.paddingRight = lockPaddingVal;

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }
    function bodyUnlock(){
        setTimeout(function(){
            if(lockPadding.length > 0){
                for(let i=0; i < lockPadding.length; i++){
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            if(lockMargin.length > 0){
                for(let i=0; i < lockMargin.length; i++){
                    const el = lockMargin[i];
                    el.style.marginRight = '0px';
                }
            }
            body.classList.remove('lock');
            // body.style.paddingRight = '0px';  //to use comment bottom if section and next 2 lines
            
            if(elToAddPad.length > 0){
                for(let i=0; i < elToAddPad.length; i++){
                    const el = elToAddPad[i];
                    el.style.paddingRight = '0px';
                }
                
            }
            header.style.paddingRight = '0px';
            footer.style.paddingRight = '0px';
        }, timeout);

        unlock = false;
        setTimeout(function(){
            unlock = true;
        }, timeout);
    }

    document.addEventListener('keydown', function(e){
        if(e.which === 27){
            console.log(true);
            const popupActive = document.querySelector('.popup.popup-active');
            if(popupActive === null) {return;}
            popupClose(popupActive);
        }
    });



    if(forms.length === 0){
        return;
    }


    // name=value&name2=value2
    let serialize = function(form){
        let items = form.querySelectorAll('input, select, textarea');
        let str = '';
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            let name = item.name;
            let value = item.value;
            let separator = i === 0 ? '' : '&';

            if(value){
                str += separator + name + '=' + value;
            }
        }

        return str;
    }

    let formSend = function(form){
        let data = serialize(form);
        let xhr = new XMLHttpRequest();
        let url = 'mail/mail.php'
        

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        xhr.onload = function(){
            if (this.response === 'success'){
                console.log('form sent successfully')
                const curentPopup = document.getElementById('popupEmailSuccess');
                popupOpen(curentPopup);
                // e.preventDefault();
            }else{
                console.log('some error occurred')
                const curentPopup = document.getElementById('popupEmailError');
                popupOpen(curentPopup);
                // e.preventDefault();
            }
            form.reset();
        }

        xhr.send(data);
    }

    for(let i = 0; i < forms.length; i++){
        forms[i].addEventListener('submit', function(e){
            e.preventDefault();
            let form = e.currentTarget;
            formSend(form);
        })
    }
})();

//time input and date input hover
$(document).ready(function(){
    let dateChoosed = false;
    let timeChoosed = false;
    
    $('.book-form__input-container').hover(function () {
      $('.book-form__date-placeholder').addClass('no-after');
      }, function () {
        if(!dateChoosed){
          $('.book-form__date-placeholder').removeClass('no-after');
        }
    });
    $('.book-form__when').focus(function() {
      $('.book-form__date-placeholder').addClass('no-after');
    });
  
    $('.book-form__when').on('input', function() {
      $('.book-form__date-placeholder').addClass('no-after');
      dateChoosed = true;
    });
  
  
    $('.book-form__time-container').hover(function () {
      $('.book-form__time-placeholder').addClass('no-after');
      }, function () {
        if(!timeChoosed){
          $('.book-form__time-placeholder').removeClass('no-after');
        }
    });
    $('.book-form__time').focus(function() {
      $('.book-form__time-placeholder').addClass('no-after');
    });
  
    $('.book-form__time').on('input', function() {
      $('.book-form__time-placeholder').addClass('no-after');
      timeChoosed = true;
    });
  
  });