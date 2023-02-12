import { SIcon } from './S-Icon/index.mjs';
export { isIconType } from './S-Icon/index.mjs';
import { SIconSelect } from './S-IconSelect/index.mjs';
import { SEllipsis } from './S-Ellipsis/index.mjs';

var index = {
    install(app) {
        app.component('SIconSelect', SIconSelect);
        app.component('SEllipsis', SEllipsis);
        app.component('SIcon', SIcon);
    }
};

export { SEllipsis, SIcon, SIconSelect, index as default };
