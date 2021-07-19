import UIkit from 'uikit';
import { app, form } from '../../modules/scripts/_core';

UIkit.util.ready(function () {
    app.init();

    app.dynamicVideo();
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

    const sliders = {
        s6: undefined,
        s8: undefined,
        s9: undefined,
        s13: undefined,
    };

    app.matchMediaListener(
        app.md,
        () => {
            switcherDrop = UIkit.drop('.s3__tab-drop', {
                mode: 'click',
            });

            sliders.s6 = UIkit.slider('.s6__slider');
            sliders.s13 = UIkit.slider('.s13__slider');
        },
        () => {
            switcherDrop?.$destroy();

            sliders.s6?.$destroy();
            sliders.s13?.$destroy();
        },
    );

    app.matchMediaListener(
        app.lg,
        () => {
            sliders.s8 = UIkit.slider('.s8__slider');
            sliders.s9 = UIkit.slider('.s9__slider');
        },
        () => {
            sliders.s8?.$destroy();
            sliders.s9?.$destroy();
        },
    );

    app.sliderSpy('.s6__slider', (idx) => refreshSliderArrowNav('.s6__slider', idx));
    app.sliderSpy('.s8__slider', (idx) => refreshSliderArrowNav('.s8__slider', idx));
    app.sliderSpy('.s9__slider', (idx) => refreshSliderArrowNav('.s9__slider', idx));
    app.sliderSpy('.s13__slider', (idx) => refreshSliderArrowNav('.s13__slider', idx));
    app.sliderSpy('.s18__slider', (idx) => refreshSliderArrowNav('.s18__slider', idx));

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

    // app.mapSpy(`.s11__location-map`);

    app.letListClickActive(document.querySelector('.s11__location-nav'), 'active', (el) => {
        document.querySelector(`.s11__location-map iframe`).setAttribute('src', el.dataset.src);
    });

    // app.letListClickActive(document.querySelector(`ul.list`))
    // app.dynamicVideo()
    // app.videoSpy(`#video .popup__body`, 'fmT2FFVuWDA')
    // app.mapSpy(`#map`, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.681137224115!2d45.91315441602808!3d51.592407112304684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4114c599cd81712b%3A0x2ebcd457d28444b3!2z0YPQuy4g0J_QsNC90YTQuNC70L7QstCwLCA1Mywg0KHQsNGA0LDRgtC-0LIsINCh0LDRgNCw0YLQvtCy0YHQutCw0Y8sIDQxMDAzMw!5e0!3m2!1sru!2sru!4v1618227745566!5m2!1sru!2sru')
    // const quiz = new Quiz()
    // quiz.create()
});
