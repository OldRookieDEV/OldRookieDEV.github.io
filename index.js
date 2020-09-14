const __UTIL = {
    elem: {},
    init: () => {
        __UTIL.elem = {
            ...__UTIL.elem,
            headerBg: document.querySelector("#header-bg"),
            headerLogo: document.querySelector("#logo"),
            header: {},
        };

        __UTIL.elem.header = {
            bg: document.querySelector("#header-bg"),
            logo: document.querySelector("#logo"),
        };
        __UTIL.elem.content = {
            container: document.querySelector("#content-container"),
        };

        console.log("initialized");
        __UTIL.resized();
    },
    resized: (elem) => {
        // console.log("resized!");
        __UTIL.calc(elem);
    },
    calc: (elem) => {
        const _offsetTop = __UTIL.elem.header.bg.offsetTop;
        const _offsetHeight = __UTIL.elem.header.bg.offsetHeight;
        const _calculated = (_offsetTop + _offsetHeight) * 0.9;
        __UTIL.elem.content.container.style.top = `${_calculated}px`;
    },
};

window.addEventListener("DOMContentLoaded", __UTIL.init);
window.addEventListener("resize", __UTIL.resized);
