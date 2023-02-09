import SForm from './lib/S-Form/index.mjs';
import STable from './lib/S-Table/index.mjs';

var index = {
    install(app) {
        app.component('SForm', SForm);
        app.component('STable', STable);
    }
};

export { index as default };
