// Import required packages
const express = require("express");
const app = express();
const cors = require("cors");

//Setup CORS (Cross-Origin Resource Sharing) so your frontend can call your backend API

const corsOptions = {
  origin: "*", // allow requests from any origin
  credentials: true,
  optionSuccessStatus: 200,
};


app.use(cors(corsOptions));

// Allow server to parse JSON request bodies
app.use(express.json());


// Import Event model (MongoDB schema)
const Event = require("./models/event.model");


// Read mock data from a JSON file (used for seeding database)
//const fs = require("fs");

//const jsonData = fs.readFileSync("events.json", "utf-8");

//const eventsData = JSON.parse(jsonData);


// Import DB connection helper

const { initDatabse } = require("./db/db.connect");


initDatabse();

// Seed sample event data into MongoDB (optional — run once to populate DB)

/*const seedData = async () => {
  try {
    for (const eventData of eventsData) {
      const newEvent = new Event({
        title: eventData.title,
        category: eventData.category,
        type: eventData.type,
        date: eventData.date,
        endDate: eventData.endDate,
        price: eventData.price,
        isFree: eventData.isFree,
        venue: eventData.venue,
        imageThumb: eventData.imageThumb,
        imageCover: eventData.imageCover,
        host: eventData.host,
        description: eventData.description,
        additionalInfo: eventData.additionalInfo,
        tags: eventData.tags,
        speakers: eventData.speakers,
      });

      await newEvent.save();
    }
  } catch (error) {
    console.log("Error Seeding Data", error);
  }
};*/

//seedData()


// Fetch ALL events from DB
const getAllEvents = async () => {
  try {
    const allEvents = await Event.find();

    return allEvents;
  } catch (error) {
    throw error;
  }
};

app.get("/events", async (req, res) => {
  try {
    const events = await getAllEvents();

    if (events.length !== 0) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ error: "Events not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch events.", errorMessage: error.message });
  }
});

// Fetch event by ID

const getEventById = async (eventId) => {
  try {
    const event = Event.findById(eventId);
    return event;
  } catch (error) {
    throw error;
  }
};

app.get("/events/id/:eventId", async (req, res) => {
  try {
    const event = await getEventById(req.params.eventId);

    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch event.", errorMessage: error.message });
  }
});

// Fetch events by type (Online / Offline / Both)

const getEventsByType = async (type) => {
  try {
    const filter = {};

    if (type && type.toLowerCase() !== "both") {
      filter.type = type.toLowerCase();
    }

    const events = await Event.find(filter);
    return events;
  } catch (error) {
    throw error;
  }
};

app.get("/events/type", async (req, res) => {
  try {
    const { type } = req.query;
    const events = await getEventsByType(type);

    if (events.length > 0) {
      res.status(200).json(events);
    } else {
      res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch events",
      errorMessage: error.message,
    });
  }
});

// Search events by title or tags 

const searchEventByTitleOrTags = async (searchWord) => {
  try {
    const regex = new RegExp(searchWord, "i");

    const events = await Event.find({
      $or: [{ title: regex }, { tags: regex }],
    });

    return events;
  } catch (error) {
    throw error;
  }
};

app.get("/events/search", async (req, res) => {
  try {
    const {q} = req.query
    const events = await searchEventByTitleOrTags(q)

    if(events.length > 0){
      res.status(200).json(events)
    }else {
      res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch events",
      errorMessage: error.message,
    });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


