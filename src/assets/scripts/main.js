import UIkit from 'uikit';
import { app, form } from '../../modules/scripts/_core';

UIkit.util.ready(function () {
    app.init();

    // FORM
    form.init(`form`);

    if (document.querySelector(`.form-lead`)) {
        document.querySelectorAll(`.form-lead__options`).forEach((el) => {
            app.letListClickActive(el, 'active', (item) => {
                el.querySelector('.form-lead__options-input').value = item.dataset.value;
            });
        });
    }

    let switcherDrop;
    let s6Slider;
    app.matchMediaListener(
        app.md,
        () => {
            switcherDrop = UIkit.drop('.s3__tab-drop', {
                mode: 'click',
            });

            s6Slider = UIkit.slider('.s6__slider');
        },
        () => {
            switcherDrop?.$destroy();
            s6Slider?.$destroy();
        },
    );

    app.sliderSpy('.s6__slider', (idx) => refreshSliderArrowNav('.s6__slider', idx));
    app.sliderSpy('.s8__slider', (idx) => refreshSliderArrowNav('.s8__slider', idx));

    function refreshSliderArrowNav(slider, index) {
        document.querySelector(`${slider} .slider-arrow-nav__numbers--current`).innerText = `0${index + 1}`;
    }

    UIkit.switcher(`.tab-switcher__tab`, {
        connect: `.tab-switcher__content-block`,
        cls: `switcher-active`,
        animation: 'uk-animation-fade',
    });
    document.querySelectorAll(`li.tab-switcher__content-item`).forEach((el, idx) => {
        el.addEventListener(`beforeshow`, (event) => {
            if (window.innerWidth < app.md) {
                const $tabSwitcher = el.closest('.tab-switcher');
                $tabSwitcher.querySelector('.tab-switcher__btn-drop span').innerText = $tabSwitcher.querySelector(
                    `.tab-switcher__tab li.switcher-active a`,
                ).innerText;
                UIkit.drop('.tab-switcher__tab-drop').hide(0);
            }
        });
    });

    // app.letListClickActive(document.querySelector(`ul.list`))
    // app.dynamicVideo()
    // app.videoSpy(`#video .popup__body`, 'fmT2FFVuWDA')
    // app.mapSpy(`#map`, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.681137224115!2d45.91315441602808!3d51.592407112304684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4114c599cd81712b%3A0x2ebcd457d28444b3!2z0YPQuy4g0J_QsNC90YTQuNC70L7QstCwLCA1Mywg0KHQsNGA0LDRgtC-0LIsINCh0LDRgNCw0YLQvtCy0YHQutCw0Y8sIDQxMDAzMw!5e0!3m2!1sru!2sru!4v1618227745566!5m2!1sru!2sru')
    // const quiz = new Quiz()
    // quiz.create()
});
