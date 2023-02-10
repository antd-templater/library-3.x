import { SIcon } from './S-Icon/index.mjs';
import { SEllipsis } from './S-Ellipsis/index.mjs';

var index = {
    install(app) {
        app.component('SIcon', SIcon);
        app.component('SEllipsis', SEllipsis);
    }
};

export { SEllipsis, SIcon, index as default };
