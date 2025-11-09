const cron = require("node-cron");
const db = require("./db");

let currentTask = null;

function scheduleReminder(time) {
    if (currentTask) currentTask.stop();

    const [hour, minute] = time.split(":");

    const cronString = `${minute} ${hour} * * *`;

    currentTask = cron.schedule(cronString, () => {
        db.all(
            `SELECT text, category FROM entries WHERE DATE(created_at) = DATE('now')`,
            [],
            (err, rows) => {
                if (err) return console.error(err);

                console.log("\n📌 TODAY'S SUMMARY\n");
                rows.forEach((r) => {
                    console.log(`- ${r.text} (${r.category})`);
                });
                console.log("\n✅ Reminder sent!\n");
            }
        );
    });

    console.log("✅ Reminder scheduled at", time);
}

module.exports = scheduleReminder;
