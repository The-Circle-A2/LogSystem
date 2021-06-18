const express = require("express");
const app = express();
const insertLog = require("./log/main");

app.use(express.json());

app.post("/api/log", (req, res) => {
    let errors = [];
    let required = ["text", "from"];

    if (!req.body) {
        return res
            .status(400)
            .json({
                status: 400,
                time: Date.now(),
                text: `No body provided.`
            });
    }

    required.forEach((requirement) => {
        if (!(requirement in req.body)) {
            errors.push(`Missing body key: ${requirement}`);
        }
    });

    if (errors.length) {
        return res
            .status(400)
            .json({
                status: 400,
                time: Date.now(),
                text: "Missing body keys. Check the 'errors' key in this object.",
                errors: errors.map((error, i) => `${i + 1}: ${error}`)
            });
    }
 
    const { text, from } = req.body;

    insertLog(text, from)
        .then((r) => res
            .status(200)
            .json({
                status: 200,
                time: Date.now(),
                text: r.text,
                record: r.result
            })
        )
        .catch((err) => res
            .status(400)
            .json({
                status: 400,
                time: Date.now(),
                text: err
            })
        );
});

app.listen(3030, () => {
    console.log(`API Started: http://localhost/3030`);
});