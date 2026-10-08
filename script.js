const addHabitBtn = document.getElementById("addHabitBtn");
const habitForm = document.getElementById("habitForm");
const habitInput = document.getElementById("habitInput");
const saveHabitBtn = document.getElementById("saveHabitBtn");

const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const streakCount = document.getElementById("streakCount");

const habitList = document.getElementById("habitList");

habitForm.style.display = "none";


// -------------------------
// Progress
// -------------------------

function updateProgress() {

    const habits = document.querySelectorAll(".habit-card");

    const completed = document.querySelectorAll(
        ".habit-card.completed"
    );

    const total = habits.length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round(
            (completed.length / total) * 100
        );
    }

    progressText.textContent = percentage + "%";

    progressFill.style.width = percentage + "%";
}


// -------------------------
// Save Habits
// -------------------------

function saveHabits() {

    const habits = [];

    document.querySelectorAll(".habit-card").forEach(function(card) {

        habits.push({
            name: card.querySelector("p").textContent,
            completed: card.classList.contains("completed")
        });

    });

    localStorage.setItem(
        "habitFlowHabits",
        JSON.stringify(habits)
    );
}


// -------------------------
// Streak
// -------------------------

function updateStreak() {

    const habits =
        document.querySelectorAll(".habit-card");

    const completed =
        document.querySelectorAll(
            ".habit-card.completed"
        );

    let streak = 0;

    if (habits.length > 0 && completed.length === habits.length) {
        streak = 1;
    }

    streakCount.textContent =
        "🔥 " + streak + " Day";
}


// -------------------------
// Setup Habit
// -------------------------

function setupHabit(card) {

    const completeButton =
        card.querySelector(".complete-btn");

    const deleteButton =
        card.querySelector(".delete-btn");


    completeButton.addEventListener("click", function() {

        card.classList.toggle("completed");

        if (card.classList.contains("completed")) {

            completeButton.textContent = "✓ Done";

        } else {

            completeButton.textContent = "Complete";

        }

        updateProgress();

        updateStreak();

        saveHabits();

    });


    deleteButton.addEventListener("click", function() {

        card.remove();

        updateProgress();

        updateStreak();

        saveHabits();

    });

}


// -------------------------
// Create Habit
// -------------------------

function createHabit(name, completed = false) {

    const habitCard =
        document.createElement("div");

    habitCard.className = "habit-card";


    if (completed) {

        habitCard.classList.add("completed");

    }


    habitCard.innerHTML = `
        <p>${name}</p>

        <div>

            <button class="complete-btn">
                ${completed ? "✓ Done" : "Complete"}
            </button>

            <button class="delete-btn">
                Delete
            </button>

        </div>
    `;


    habitList.appendChild(habitCard);

    setupHabit(habitCard);
}


// -------------------------
// Load Habits
// -------------------------

function loadHabits() {

    const savedHabits =
        JSON.parse(
            localStorage.getItem("habitFlowHabits")
        );


    if (savedHabits) {

        habitList.innerHTML = "";


        savedHabits.forEach(function(habit) {

            createHabit(
                habit.name,
                habit.completed
            );

        });

    }

}


// -------------------------
// Add Habit
// -------------------------

addHabitBtn.addEventListener("click", function() {

    habitForm.style.display = "flex";

    habitInput.focus();

});


saveHabitBtn.addEventListener("click", function() {

    const habitName =
        habitInput.value.trim();


    if (habitName === "") {

        alert("Please enter a habit");

        return;

    }


    createHabit(
        "⭐ " + habitName
    );


    habitInput.value = "";

    habitForm.style.display = "none";

    saveHabits();

    updateProgress();

    updateStreak();

});


// -------------------------
// Initial Setup
// -------------------------

document
    .querySelectorAll(".habit-card")
    .forEach(function(card) {

        setupHabit(card);

    });


loadHabits();

updateProgress();

updateStreak();