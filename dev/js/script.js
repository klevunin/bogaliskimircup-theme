
(function ($) {
$(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 0);

    Shadowbox.init();
    Boombox.init();

    function open_popup(popup_prefix){
        const $popup = $(".popup_window."+popup_prefix);
        close_popup();
        $popup.fadeIn(250);
        if (!$popup.parent().hasClass('popup_overlay')){
            $popup.wrap('<div class="popup_overlay"></div>');
        }
        resize_popup($popup);
        $('body').addClass('fixed');
        $popup.parent(".popup_overlay").addClass('blue').fadeIn(250);
    }

    function close_popup(){

        $('.popupSmall').removeClass('active');

        $(".popup_window").fadeOut(250);
        $('body').removeClass('fixed');
        $(".popup_overlay").fadeOut(250, function(e){
            $(this).removeClass('blue');
        });
    }

    $('.js-news_block_more .js-click').bind('click', function(e){
        e.preventDefault();

        const btn = $(this);
        const blk = btn.parent().prev('.news_block');

        blk.addClass('opened')
        btn.remove();
    });

    $('.js-video_block_more .js-click').bind('click', function(e){
        e.preventDefault();

        const btn = $(this);
        const blk = btn.parent().prev('.mediablock');

        blk.addClass('opened')
        btn.remove();
    });

    function js_results__toggle(){
        const paytype = $('.js-paytype').html();
        const price = $('.js-price').html();
        const results = $('.js-help__results');

        if (paytype.length > 0 && price.length > 2) {
            results.slideDown(250);
        }else{
            results.slideUp(250);
        }
    }

    $('.js-btntab_paytype').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);
        const is_active = btn.hasClass('active');
        const results = $('.js-help__results');
        const value = btn.children('span').children('span').text();
        const paytype = $('.js-paytype');
        const toTypePrice = $('#js-typeprice');

        $('.js-btntab_paytype').removeClass('active').removeClass('pseudoactive');
        $('.js-btntab_paytype').parent().removeClass('current');
        $('.js-btntab_paytype').parent().parent().removeClass('checked');

        if (!is_active) {
            btn.addClass('active');
            btn.parent().addClass('current');
            btn.parent().parent().addClass('checked');
            paytype.html(value);
            toTypePrice.val(value);
            js_results__toggle();
        }else{
            results.slideUp(250, function(){
                paytype.html('');
                toTypePrice.val('');
            });
        }
    });

    $('.js-btntab_price').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);
        const is_active = btn.hasClass('active');
        const results = $('.js-help__results');
        const price = $('.js-price');
        const toValuePrice = $('#js-pricevalue');

        if (!btn.hasClass('js-btntab_price_another')) {
            var value = btn.children('span').text();
        }else {
            var value = btn.children('input').val() + ' ₽';
        }

        $('.js-btntab_price').removeClass('active');

        if (!is_active) {
            btn.addClass('active');
            price.html(value);
            js_results__toggle();
            toValuePrice.val(value);
        }else{
            results.slideUp(250, function(){
                price.html('');
                toValuePrice.val('');
            });
        }

    });

    $('.js-btntab_price_another input').bind('click', function(e){
        e.preventDefault();
        e.stopPropagation();
    });

    $('.js-btntab_price_another input').bind('blur keyup change', function(e){
        e.preventDefault();
        const value = $(this).val() + ' ₽';
        const $price = $('.js-price');
        const results = $('.js-help__results');
        const paytype = $('.js-paytype').html();
        const toValuePrice = $('#js-pricevalue');

        if (paytype.length > 0 && value.length > 2) {
            $price.html(value);
            results.slideDown(250);
            toValuePrice.val(value);
        }else{
            results.slideUp(250, function(){
                $price.html(value);
                toValuePrice.val(value);
            });
        }

        e.stopPropagation();
    });

    $('.js-help__selectbank').bind('change', function(e){
        const bnk_eq = $(this).val();
        const bnks = $('.help__bank');
        const cls = 'current';

        bnks.siblings().removeClass(cls);
        bnks.eq(bnk_eq).addClass(cls);
    });

    $('.js-bank__btntabs_type').bind('change', function(e){
        const bnk_eq = $(this).val();
        const cls = 'current';
        const toTypePrice = $('#js-typeprice');
        const paytype = $('.js-paytype');
        const ptype = $(bnk_eq + ' > span > span').html();
        $('.help__btntab_paytype')
            .removeClass('active')
            .removeClass('pseudoactive')
            .parent().removeClass(cls);

        toTypePrice.val(ptype);
        paytype.html(ptype);

        $(bnk_eq).addClass('active').parent().addClass(cls);

        js_results__toggle();
    })

    $('.js-effect__popup').hover(
        function(e){
            const btn = $(this);
            const ppp = $(this).next('.effect__popup');

            ppp.stop(true, true).fadeIn(200);
        },
        function(e){
            const btn = $(this);
            const ppp = $(this).next('.effect__popup');

            ppp.stop(true, true).fadeOut(200);

        });

    $('.ic_more').bind('click', function(e){
        e.preventDefault();
       // e.stopPropagation();

        const btn = $(this);
        const ppp = $(this).children('.ic_more_popup'); //popup

        btn.toggleClass('active');
        ppp.toggle(200);
    });

    $('.ic_more_popup a').bind('click', function(e){
        e.stopPropagation();
        // e.preventDefault();
    });

    $('.js-mobile_menu').bind('click', function(e){
        e.preventDefault();

        const btn = $(this);
        const ppp = $('.mainmenu__links .mainmenu__popup'); //popup
        const body = $('body');
        const ovrl = $('.popup_overlay');

        $('html, body').animate({
            scrollTop: 0
        }, 0);

        btn.toggleClass('active');
        ppp.slideToggle(200);
        body.toggleClass('fixed');
        ovrl.toggleClass('white').fadeToggle(200);
    });

    $('.js-viewswitch').bind('change', function(e){
        const state = $(this).val();

        $('.pane').hide(0, function(){
            $(state).show(0);
        });

    });

    $('select').bind('change', function(e){
        const select = $(this);
        setTimeout(function(){
            select.blur();
        }, 0);
    });

    $('.popupSmall').bind('click', function(e){
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            close_popup();
        }

        const btn = $(this);
        const sufix = btn.data('win');
        const $ppp = $(".popup_window.p"+sufix); // popup

        btn.toggleClass('active');
        $ppp.fadeToggle(250);
    })

    $('.tabs .tab a').bind('click', function(e){
        e.preventDefault();

        const btn = $(this);
        const pane = btn.data('pane');

        btn.parent().siblings().children('a').removeClass('active');
        btn.addClass('active');

        $('.pane').hide(0, function(){
            $(pane).show(0);
        });

        $('html, body').animate({
            scrollTop: btn.offset().top - 15
        }, 250);
    });

    $('.js-popup__fold_title').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);

        btn.toggleClass('active').next('.popup__fold_body').slideToggle(250);
    });

    $('.js-fold_button_add').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);
        const wrp = btn.parent().parent();
        const maxcount = btn.data('maxcount');
        const curcount = wrp.children('.popup__fold').length;
        const form = wrp.children('.popup__fold').first();

        if (maxcount <= curcount + 1) {
            btn.hide();
        }

        btn.parent().before(form.clone());

        $('.js-popup__fold_title').unbind('click').bind('click', function(e){
            e.preventDefault();
            const btn = $(this);

            btn.toggleClass('active').next('.popup__fold_body').slideToggle(250);
        });

        $('.js-fold_button_delete').unbind('click').bind('click', function(e){
            e.preventDefault();
            const btn = $(this);
            const wrp = btn.parent().parent();
            const btnadd = wrp.siblings('.popup__fold_button').children('a');

            wrp.hide(250, function(e){
                $(this).remove();
            })

            btnadd.fadeIn(250);
            e.stopPropagation();
        });

    });
/*
    $('.js-bigtable__header').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);

        btn.toggleClass('active');
        btn.next('.bigtable__body').slideToggle(150, function(e){
            if (btn.hasClass('active')) {
                $(this).css('overflow', 'visible');
            }
            bigtableictoggler();
        });

    });

    function bigtableictoggler(){
        $('.js-bigtable__buttons').each(function(i, btns){

            var cell = $(this);

            if (cell.children('.bigtable__button').length >= 1) {

                const cellw = cell.parent().width();
                const btnmore = cell.next('.bigtable__button.more');
                const btnmorew = btnmore.width();
                var cellbtnw = [];

                btnmore.css('visibility', 'hidden');

                cell.children('.bigtable__button').each(function(j, btn){
                    cellbtnw.push({
                        item: $(this),
                        width: $(this).width() + 7
                    });
                    $(this).hide(0);
                });

                var cellwInner = 0;
                cellbtnw = cellbtnw.reverse();
                var lastbtn = cellbtnw.pop();

                while(lastbtn && cellw - btnmorew > cellwInner + lastbtn.width) {
                    cellwInner = cellwInner + lastbtn.width;
                    lastbtn.item.show(0);
                    lastbtn = cellbtnw.pop();
                }

                const is_visible = cell.children('.bigtable__button:visible').length;
                const is_length = cell.children('.bigtable__button').length;

                if (is_length !== 1 && is_visible !== is_length) {

                    const popupBtn = btnmore.children('.ic_more').children('.ic_more_popup');

                    $(popupBtn.children('.ic_more_popup_link').get().reverse())
                        .each(function(k, popup_link){

                            $(this).css('display', 'none');

                            if (k < is_length - is_visible) {
                                $(this).css('display', 'block');
                            }
                        });

                    btnmore.css('visibility', 'visible');
                }

                cell.css('width', cellwInner);
            }

        });
    }
    bigtableictoggler();
*/
    function andtabsw(){
        $('.andtabs_outer').width(function(e){
            var ws = 0;
            const inner = $(this).children('.andtabs_inner');

            inner.children('.andtabs__item').each(function(e){
                ws = ws + $(this).width();
            });

            return ws;
        });
    }
    andtabsw();

    function uppershower(){
        //const hbody = Math.abs($('body,html').offset().top);
        const hbody = Math.abs($('head').offset().top);
        if(hbody > 100){
            $('.upper').fadeIn(250);
        }else{
            $('.upper').fadeOut(250);
        }
    }
    uppershower();

    $(".btnupld__avatar").bind('change', function(){
        const input = this;
        const btn_add = $(input).parent();
        const btn_del = btn_add.next();
        const uplblock = btn_add.parent().prev();
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                uplblock.css('background-image', 'url(' + imageUrl + ')');
                btn_del.css('display', 'block');
                btn_add.css('display', 'none');
            }
            reader.readAsDataURL(input.files[0]);
        }
    });

    $(".btnupld__delete").bind('click', function(e){
        e.preventDefault();
        const btn_del = $(this);
        const btn_add = $(this).prev();
        const uplblock = btn_del.parent().prev();
        const imageUrl = btn_del.data('img');
        btn_del.css('display', 'none');
        btn_add.css('display', 'block');

        uplblock.css('background-image', 'url(' + imageUrl + ')');
    });

    $('.gun__img img').hover(function(){
        $(this).addClass('glow').glow({ radius: "8", color:"rgba(242, 168, 9, 0.75)"});
    }, function(){
        $(this).removeClass('glow').glow({ disable:true });
    });

    $('.guns__btn.guns__prev').bind('click', function(e){
        e.preventDefault();
        const btn = (this);
        const prv = $('.gun.current').prev();

        $('.gun.current').removeClass('current');

        if (prv.hasClass('gun')) {
            prv.addClass('current');
        }else{
            $('.gun').last().addClass('current');
        }
    });

    $('.guns__btn.guns__next').bind('click', function(e){
        e.preventDefault();
        const btn = (this);
        const nxt = $('.gun.current').next();

        $('.gun.current').removeClass('current');

        if (nxt.hasClass('gun')) {
            nxt.addClass('current');
        }else{
            $('.gun').first().addClass('current');
        }
    });

    $('.timing__btn.timing__prev').bind('click', function(e){
        e.preventDefault();
        const btn = (this);
        const prv = $('.timing__item.current').prev();
        const swd = $('.siwidata__item.current').prev();

        $('.timing__item.current').removeClass('current');
        $('.siwidata__item.current').removeClass('current');

        if (prv.hasClass('timing__item')) {
            prv.addClass('current');
            swd.addClass('current');
        }else{
            $('.timing__item').last().addClass('current');
            $('.siwidata__item').last().addClass('current');
        }
    });

    $('.timing__btn.timing__next').bind('click', function(e){
        e.preventDefault();
        const btn = (this);
        const nxt = $('.timing__item.current').next();
        const swd = $('.siwidata__item.current').next();

        $('.timing__item.current').removeClass('current');
        $('.siwidata__item.current').removeClass('current');

        if (nxt.hasClass('timing__item')) {
            nxt.addClass('current');
            swd.addClass('current');
        }else{
            $('.timing__item').first().addClass('current');
            $('.siwidata__item').first().addClass('current');
        }
    });
/*
    $('.andtabs__link').bind('click', function(e){
        const btn = $(this).parent();

        btn.siblings().removeClass('active');
        btn.addClass('active');

        e.stopPropagation();
    });

    $('#fprogram').bind('change', function(e){
        const prgrm = $(this).val();
        const btns = $('.andtabs__item');

        btns.siblings().removeClass('active');
        $('.andtabs__item[data-fpr='+prgrm+']').addClass('active');
    });

    $('.js-bigtable__tr').bind('click', function(e){

        const btn = $(this);
        const href = btn.children('.bigtable__td_1').children('a').attr('href');

        if(href) {
            e.preventDefault();
            window.location = href;

        } else {

            const href = btn.children('.bigtable__td_3').children('.js-bigtable__buttons').children('.bigtable__button').children('a').attr('href');
            if(href) {
                e.preventDefault();
                window.location = href;

            }
        }


    })
*/
    $('.js-bigfilter__close').bind('click', function(e){
        e.preventDefault();
        $(this).closest('.bigfilter').slideToggle(250);
    });

    $('.js-bigfilter__change').bind('click', function(e){
        e.preventDefault();
        const year = $(this).data('toyear');

        if(!$(this).hasClass('disabled')){
            $('.bigfilter').fadeOut(0);
            $('.bigfilter[data-year='+year+']').fadeIn(250);
        }

        $('#edit-year').val(year);
        $('#edit-steps').val(0);
        $('#edit-year').change();
        $('.fetp').fadeOut(0);
        $('#fetp'+year).fadeIn(250);

        e.stopPropagation();

    });

    $('.js-bigfilter__item').bind('click', function(e){
        e.preventDefault();
        const filter = $(this).data('filter');
        const year = $(this).data('year');

        $('#edit-year').val(year);
        $('#edit-steps').val(filter);
        $('#edit-steps').change();
        $('body').removeClass('longfront');

        //$('.bigfilter').slideUp(250);

    });

    $('.nojs-bigfilter__item').bind('click', function(e){
        e.preventDefault();
    });

    $('.js-hist-bigfilter__item').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);
        const hst = btn.data('hist');

        btn.addClass('active').siblings().removeClass('active');
        $(hst).slideDown(200).siblings().slideUp(200);
    });

    $('#videoloader').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);
        const youid = btn.data('youtube');
        btn.removeClass('preview')
            .html('<iframe width="589" height="331" src="https://www.youtube.com/embed/'+youid+'?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
    });

    $('#fyear').bind('change', function(e){
        e.preventDefault();
        const year = $(this).val();

        $('.fetp').fadeOut(0);
        $('#fetp'+year).fadeIn(250);
        $('.bigfilter').fadeOut(0);
        $('.bigfilter[data-year='+year+']').fadeIn(250);

    });

    $('.floormenu__item_menu').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);

        btn.parent().toggleClass('active');
    });

    $('.js-faq__question').bind('click', function(e){
        e.preventDefault();
        const btn = $(this);
        const qst = btn.next('.faq__answer');

        qst.slideToggle(150, function(e){
            btn.toggleClass('active');
        });

    })

    if ($('.floormenu').length > 0) {
        $('.floormenu').stickUp();
    }

    $('a[href*=\\#]:not([href=\\#])').bind('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').stop(true).animate({
                    scrollTop: target.offset().top
                }, 500);
                return false;
            }
        }
    });

    $('[data-tofloor] span').bind('click', function() {
        const btn = $(this);
        const tofloor = btn.parent().data('tofloor');
        const menu = btn.parent().parent();

        $('html,body').stop(true).animate({
            scrollTop: $('[data-floor='+tofloor+']').offset().top - menu.parent().height()
        }, 500);

        menu.toggleClass('active');
    });

    var options =  {
        onKeyPress: function(cep, e, f, options) {
            var masks = ['+0-000-000-0000', '+000-00-000-00-00'];
            phoneV = f.val();
            fSymbol = phoneV.charAt(1);
            mask = (fSymbol == 7) ? masks[0] : masks[1];
            $('[name=fphone]').mask(mask, options);
        }
    };

    $('[name=fphone]').mask('+0-000-000-0000', options);

    function resize_popup(popup) {
    }





    $.validator.setDefaults({
        debug: true,
        success: "valid",
        rules: {
            fphone: "customPhone",
            fmail: "customMail",
        }
    });

    $.validator.addMethod("required",
        $.validator.methods.required,
        "Заполните поле"
    );

    $.validator.addMethod("customPhone", function(value) {
        //http://hashcode.ru/questions/158603/js-%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D0%BE%D0%B5-%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%BB%D1%8F-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0
        //+ http://habrahabr.ru/post/110731/
        re = /^((8|\+7|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{13,16}$/;
        return re.test(value);
    }, "Только цифры, знак + и дефис (-)");

    $.validator.addMethod("customMail", function(value) {
        //http://hashcode.ru/questions/158603/js-%D1%80%D0%B5%D0%B3%D1%83%D0%BB%D1%8F%D1%80%D0%BD%D0%BE%D0%B5-%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B4%D0%BB%D1%8F-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B0
        //+ http://habrahabr.ru/post/110731/
        re = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
        return re.test(value);
    }, "Неправильный формат");

    $('.popup__field input').bind('blur keyup change', function(e) {
        // TODO FIX @undefined
        console.log('TODO FIX @undefined');
        $(this).valid();
    })

    $(".sendform").bind("click", function (e) {
        e.preventDefault();

        var $form = $(this).closest("form");
        var callform = $form.data("callform");

        if ($form.valid()) {
            // $(this).closest('.popup_window').;
            close_popup();
            open_popup("thanksubscribe");
            // $form.ajaxSubmit({
            //     url: '/',
            //     type: 'POST',
            //     success: function(response) {
            //         close_popup();
            //         $form.resetForm();
            //         open_popup("thank");
            //         $.get("/counter.html", function(data) {
            //             console.log("counter");
            //         });
            //     }
            // })
        }

    });

    $(".popupButton").bind("click", function (e) {
        e.preventDefault();
        open_popup($(this).data("window"));
    });

    $(".popup_close, .popup_overlay, .popup_closeTrigger").bind("click", function (e) {
        e.preventDefault();
        close_popup();
    });

    $(".popup_window").bind("click", function(e){
        e.stopPropagation();
    });


    function wresize(){
        andtabsw();
        bigtableictoggler();
    }

    $(window).resize(wresize);

    function hscroll(){
        uppershower();
    }

    $(window).scroll(hscroll);

    window.onscroll = function() {
        var scrolled = window.pageYOffset || document.documentElement.scrollTop;
        // console.log(scrolled + 'px');

        $('.floor2__bg .inner').stop().animate({
                textIndent: 0
            }, {
                step: function(now, fx) {
                    const T = $(this).offset().top;
                    const H = window.innerHeight;
                    const opacity = (T - scrolled - 1.1*H)/(H);
                    $(this).css('opacity', Math.abs(opacity));
                },
                duration: 'slow'
            },
            'linear'
        );
    };
});


}) (jQuery);

(function ($) {
    Drupal.behaviors.popup = {
        attach : function(context, settings) {




        }
    };
})(jQuery);