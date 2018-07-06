import config from './config/config';
import routes from './config/routes'; 

import { Airborne } from './framework/index';
import controllers from './controllers';

const app = new Airborne(config);

app.routes(routes)
app.controllers(controllers)

app.start();