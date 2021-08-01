import UIkit from 'uikit';
import { app, form } from '../../modules/scripts/_core';

const { ready, $, $$, play, pause, mute } = UIkit.util;

ready(function () {
    app.init();
    app.dynamicVideo();
    form.init(`form`);

    document.querySelector('.header__map-drop-item--city').addEventListener('click', (ev) => {
        ev.preventDefault();
        // const inner = ev.currentTarget.querySelector('span').innerText;
        // if (inner === 'Москва') {
        //     document.querySelector('.header__map-drop-item--city span').innerText = 'Санкт-Петербург';
        //     document.querySelector('.header__map-drop-target span').innerText = 'Москва';
        // } else {
        //     document.querySelector('.header__map-drop-item--city span').innerText = 'Москва';
        //     document.querySelector('.header__map-drop-target span').innerText = 'Санкт-Петербург';
        // }
    });

    if ($(`.form-lead`)) {
        $$(`.form-lead__options`).forEach((el) => {
            app.letListClickActive(el, 'active', (item) => {
                $('.form-lead__options-input', el).value = item.dataset.value;
            });
        });
    }

    const sliders = {
        s6: undefined,
        s8: undefined,
        s9: undefined,
        s13: undefined,
    };

    app.matchMediaListener(
        app.md,
        () => {
            sliders.s6 = UIkit.slider('.s6__slider');
            sliders.s13 = UIkit.slider('.s13__slider');
        },
        () => {
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

    addSliderArrowNav(6, 8, 9, 13, 18, 19, 22);

    function addSliderArrowNav(...slidersIds) {
        slidersIds.forEach((sliderId) => {
            app.sliderSpy(`.s${sliderId}__slider`, (idx) => refreshSliderArrowNav(`.s${sliderId}__slider`, idx));
        });
    }

    function refreshSliderArrowNav(slider, index) {
        document.querySelector(`${slider} .slider-arrow-nav__numbers--current`).innerText = `0${index + 1}`;
    }

    UIkit.switcher(`.tab-switcher__tab`, {
        connect: `~.tab-switcher__content-block`,
        cls: `switcher-active`,
        animation: 'uk-animation-fade',
    });

    $$(`li.tab-switcher__content-item`).forEach((el, idx) => {
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

    app.mapSpy(`.s11__location-map`);

    app.letListClickActive($('.s11__location-nav'), 'active', (el) => {
        $(`.s11__location-map iframe`).setAttribute('src', el.dataset.src);
    });
});
