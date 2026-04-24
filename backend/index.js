const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "..", "data", "issues.json");

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
}

// TESTI
app.get("/", (req, res) => {
    res.send("LineWatch backend toimii!");
});

// HAETAAN KAIKKI
app.get("/issues", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// LISÄÄ HÄIRIÖ
app.post("/issues", (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));

    const newIssue = {
        id: Date.now(),
        machine: req.body.machine,
        description: req.body.description,
        category: req.body.category,
        startTime: new Date(),
        status: "open"
    };

    data.push(newIssue);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json(newIssue);
});

// SULJE HÄIRIÖ
app.put("/issues/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(DATA_FILE));

    data = data.map(issue => {
        if (issue.id == req.params.id) {
            issue.status = "closed";
            issue.endTime = new Date();
            issue.duration = (new Date(issue.endTime) - new Date(issue.startTime)) / 1000;
        }
        return issue;
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.json({ message: "Closed" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});