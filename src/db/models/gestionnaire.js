import {Schema} from 'mongoose';

export default new Schema({
  fullname: String,
  numero: Schema.Types.Mixed,
});
