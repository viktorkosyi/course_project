import routerConfig from './routerConfig.js'
export default class Router {
    constructor(anchor) {
        this.anchor = anchor;
    }

    changeRoute(route) {
        const config = routerConfig[route];
        if (!config) return;
        window.history.pushState(config.data, '', config.url);
        const component = new config.component();
        const dom = component.render();
        component.onInit();

        if (this.currentDomComponent) {
            this.anchor.innerHTML = '';
            this.anchor.innerHTML = dom;
            component.setupListeners();
        } else {
            this.anchor.innerHTML = dom;
            component.setupListeners();
        }

        this.currentDomComponent = dom;
    }
}
