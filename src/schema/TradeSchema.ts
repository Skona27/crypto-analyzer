import mongoose from "mongoose";

const { Schema } = mongoose;

const TradeSchema = new Schema({
  id: String,
  symbol: String,
  price: String,
  timestamp: Number,
});

export const TradeModel = mongoose.model("Trade", TradeSchema);
