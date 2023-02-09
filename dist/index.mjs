import SIconComponent from './lib/S-Icon/index.mjs';

var index = {
    install(app) {
        app.component('SIcon', SIconComponent);
    }
};

export { index as default };
