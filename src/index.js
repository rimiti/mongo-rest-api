import express from 'express';
import bodyParser from 'body-parser';
import {wrapAsync} from '@rimiti/express-async';
import {errors} from 'celebrate';
import Users from './controllers/users';
import Login from './controllers/login';
import Lists from './controllers/lists';
import Authentication from './middlewares/authentication';

const app = express();
app.use(bodyParser.json());

app.post('/users', Users.createValidator(), wrapAsync(Users.create));
app.post('/login', Login.createValidator(), wrapAsync(Login.create));
app.get('/lists', [Authentication, Lists.readValidator()], wrapAsync(Lists.read));

app.use(errors());
app.set('port', process.env.API_PORT);
app.listen(process.env.API_PORT, () =>
  console.log(`Server running on port: ${process.env.API_PORT}`),
);
