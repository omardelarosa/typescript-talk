// Resolves @app references
import "module-alias/register";

import { API } from "@app/shared/api";

const api = new API();
console.log("Hello HTML", api.render());
