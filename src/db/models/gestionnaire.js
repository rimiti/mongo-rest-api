import {Schema, model} from "mongoose";

export default model('Gestionnaire', new Schema({
  fullname:  String,
  numero: Schema.Types.Mixed,
}));
