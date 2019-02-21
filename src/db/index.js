import mongoose from 'mongoose';
import paginate from 'mongoose-aggregate-paginate';
import UserSchema from './models/user';
import ClientSchema from './models/client';
import GestionnaireSchema from './models/gestionnaire';
import LotSchema from './models/lot';

// TODO: Use logger like Pino or Winston

mongoose
  .connect(
    `mongodb://${process.env.API_MONGO_USERNAME}:${process.env.API_MONGO_PASSWORD}@${
      process.env.API_MONGO_HOST
    }:${process.env.API_MONGO_PORT}/${process.env.API_MONGO_DATABASE}?authSource=admin`,
  )
  .then(() => console.info('Database connection successful.'))
  .catch((err) => console.error('Database connection error', err));

LotSchema.plugin(paginate);
ClientSchema.plugin(paginate);
GestionnaireSchema.plugin(paginate);
LotSchema.plugin(paginate);

const UserModel = mongoose.model('User', UserSchema);
const ClientModel = mongoose.model('Client', ClientSchema);
const GestionnaireModel = mongoose.model('Gestionnaire', GestionnaireSchema);
const LotModel = mongoose.model('Lot', LotSchema);

export {UserModel, ClientModel, GestionnaireModel, LotModel};
