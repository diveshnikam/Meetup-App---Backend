const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["online", "offline"],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  isFree: {
    type: Boolean,
    required: true,
  },
  venue: {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  imageThumb: {
    type: String,
    required: true,
  },
  imageCover: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  additionalInfo: {
    dressCode: {
      type: String,
      required: true,
    },
    ageRestrictions: {
      type: String,
      required: true,
    },
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  speakers: [
    {
      name: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
  ],
}, {
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema)

module.exports = Event
