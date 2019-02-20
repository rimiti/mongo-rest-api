import {Schema, model} from "mongoose";

export default model('Lot', new Schema({
  client:  { type: 'ObjectId', ref: 'Client' },
  surface: Number,
}));
