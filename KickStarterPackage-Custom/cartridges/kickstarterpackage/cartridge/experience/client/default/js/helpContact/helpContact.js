
module.exports = function () {
    $(document).ready(function () {
        $('.contact-content-wrapper').hide();
        var flag = false;
        if (window.location.hash !== '') {
            $('.lists-wrapper li a').each(function () {
                var url = window.location.href;
                if ($(this).attr('href') === url.substring(url.lastIndexOf('#'))) {
                    $(this).trigger('click');
                    flag = true;
                }
            });
        } else {
            $('.lists-wrapper li a[href="#Kundenservice_&_Kontakt"]').trigger('click');
            var url = window.location.href.split('#')[0];
            window.history.replaceState(null, null, url);
            flag = true;
        }
        if (!flag) {
            $('.contact-wrapper').removeClass('d-none');
        }
    });
    window.addEventListener('popstate', function () {
        var flag = false;
        $('.lists-wrapper li a').each(function () {
            var url = window.location.href;
            if ($(this).attr('href') === url.substring(url.lastIndexOf('#'))) {
                $(this).trigger('click');
                flag = true;
            }
        });
        if (!flag) {
            location.reload();
        }
    });
    $('#accordion .collapse.show').each(function () {
        $(this).parents('.tab-item').addClass('active-tab');
    });
    $('#accordion .collapse').on('show.bs.collapse', function () {
        $(this).parents('.tab-item').addClass('active-tab');
    }).on('hide.bs.collapse', function () {
        $(this).parents('.tab-item').removeClass('active-tab');
    });
    $('.lists-wrapper li a').click(function () {
        var target = $(this).attr('data-target');
        $('.contact-wrapper').hide();
        $('.contact-content-wrapper').show();
        $('#accordion .tab-content').hide();
        $('#accordion').find(target).show();
        if (!($('.sidebar-tab li a[data-target="' + target + '"]').parent('li').hasClass('active'))) {
            $('.sidebar-tab li').removeClass('active');
            $('.sidebar-tab li a[data-target="' + target + '"]').parent('li').addClass('active');
            $('.tab-item .tab-heading a[data-target="' + target + '"]').parents('.tab-item').addClass('active-tab');
        }
    });

    $('.sidebar-tab li a').click(function () {
        var target = $(this).attr('data-target');
        $('#accordion .tab-content').hide(100);
        $('#accordion').find(target).show(100);
        $('.sidebar-tab li').removeClass('active');
        $(this).parent('li').addClass('active');
    });

    $('.tab-item .tab-heading a').click(function (e) {
        var target = $(this).attr('data-target');
        if ($(this).parents('.tab-item').hasClass('active-tab')) {
            e.preventDefault();
            $('#accordion').find(target).hide(100);
            $(this).parents('.tab-item').removeClass('active-tab');
            var url = window.location.href.split('#')[0];
            window.history.replaceState(null, null, url);
        } else {
            $('#accordion .tab-content').hide(100);
            $('#accordion').find(target).show(100);
            $('.tab-item').removeClass('active-tab');
            $(this).parents('.tab-item').addClass('active-tab');
        }
    });
};
