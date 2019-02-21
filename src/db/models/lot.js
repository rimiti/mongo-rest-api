import {Schema} from 'mongoose';

export default new Schema({
  client: {type: 'ObjectId', ref: 'Client'},
  surface: Number,
});
