// Students Array

const students = [
  { id: 1, name: "Uzman", marks: 78 },
  { id: 2, name: "Haider", marks: 33 },
  { id: 3, name: "Harshal", marks: 91 },
  { id: 4, name: "Vidhi", marks: 89 },
  { id: 5, name: "Asrar", marks: 67 },
  { id: 6, name: "Amirah", marks: 95 },
  { id: 7, name: "Anjali", marks: 34 },
];

// Get HTML Elements

const studentList = document.getElementById("studentList");
const studentSelect = document.getElementById("studentSelect");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const button = document.getElementById("getMarksBtn");

// Display Students using forEach()

students.forEach((student) => {
  // Display student card

  studentList.innerHTML += `
        <div class="student" onclick="getMarks(${student.id})">
            👤 ${student.name}
        </div>
    `;

  // Add student to dropdown

  studentSelect.innerHTML += `
        <option value="${student.id}">
            ${student.name}
        </option>
    `;
});

// Display Statistics

const totalStudents = students.length;

const passedStudents = students.filter((student) => student.marks >= 35).length;

const failedStudents = students.filter((student) => student.marks < 35).length;

document.getElementById("total").innerHTML = totalStudents;

document.getElementById("passed").innerHTML = passedStudents;

document.getElementById("failed").innerHTML = failedStudents;

// Promise Function

function fetchMarks(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = students.find((student) => student.id == id);

      if (data) {
        resolve(data);
      } else {
        reject("Student marks not found!");
      }
    }, 2000);
  });
}

// Async/Await Function

async function getMarks(id = studentSelect.value) {
  // Stop if another request is running

  if (button.disabled) {
    return;
  }

  // If no student selected

  if (id == "") {
    result.innerHTML = "Please select a student!";
    result.className = "fail";
    return;
  }

  // Update dropdown selection

  studentSelect.value = id;

  // Highlight selected student

  const allStudents = document.querySelectorAll(".student");

  allStudents.forEach((item, index) => {
    item.classList.toggle("active", students[index].id == id);
  });

  // Show Loading

  result.innerHTML = "";
  result.className = "";

  loading.classList.remove("hidden");

  button.disabled = true;
  button.innerHTML = "Loading...";

  try {
    // Fetch marks using Promise

    const data = await fetchMarks(id);

    // Check Pass or Fail

    const status = data.marks >= 35 ? "PASS" : "FAIL";

    // Display Result

    result.className = status == "PASS" ? "pass" : "fail";

    result.innerHTML = `
            <h3>🎓 Student Result</h3>

            Name: ${data.name}<br>

            Student ID: ${data.id}<br>

            Marks: ${data.marks}/100

            <div class="result-status">
                ${status == "PASS" ? "✅ PASS" : "❌ FAIL"}
            </div>
        `;
  } catch (error) {
    result.className = "fail";
    result.innerHTML = error;
  } finally {
    // Hide Loading

    loading.classList.add("hidden");

    // Enable Button

    button.disabled = false;
    button.innerHTML = "Get Marks";
  }
}
