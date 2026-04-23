const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// DATA POLKU
const DATA_FILE = path.join(__dirname, "..", "data", "issues.json");

// jos tiedostoa ei ole → luodaan
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]");
}

// TESTI
app.get("/", (req, res) => {
    res.send("LineWatch backend toimii!");
});

// hae kaikki
app.get("/issues", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Ei voitu lukea dataa" });
    }
});

// lisää
app.post("/issues", (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ error: "Tallennus epäonnistui" });
    }
});

// sulje
app.put("/issues/:id", (req, res) => {
    try {
        let data = JSON.parse(fs.readFileSync(DATA_FILE));

        data = data.map(issue => {
            if (issue.id == req.params.id) {
                issue.status = "closed";
                issue.endTime = new Date();
            }
            return issue;
        });

        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({ message: "Closed" });
    } catch (err) {
        res.status(500).json({ error: "Päivitys epäonnistui" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});