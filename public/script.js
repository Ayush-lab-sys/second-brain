function addEntry() {
    const text = document.getElementById("text").value;
    const category = document.getElementById("category").value;

    fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, category })
    }).then(() => {
        alert("✅ Saved!");
    });
}

function setReminder() {
    const time = document.getElementById("reminderTime").value;

    fetch("/set-reminder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time })
    }).then(() => {
        alert("✅ Reminder time set!");
    });
}
