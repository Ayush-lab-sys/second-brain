const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const scheduleReminder = require("./reminder");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Add entry
app.post("/add", (req, res) => {
    const { text, category } = req.body;
    db.run(`INSERT INTO entries (text, category) VALUES (?, ?)`,
        [text, category],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ success: true });
        }
    );
});

// Set reminder time
app.post("/set-reminder", (req, res) => {
    const { time } = req.body;
    db.run(`DELETE FROM reminder`);
    db.run(`INSERT INTO reminder (id, time) VALUES (1, ?)`, [time]);
    scheduleReminder(time);
    res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
