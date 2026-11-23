// Students Array

const students = [
  { id: 1, name: "Uzman", marks: 78 },
  { id: 2, name: "Haider", marks: 33 },
  { id: 3, name: "Harshal", marks: 91 },
  { id: 4, name: "Vidhi", marks: 89 },
  { id: 5, name: "Asrar", marks: 67 },
  { id: 6, name: "Amirah", marks: 95 },
];

// Get HTML Elements

const studentList = document.getElementById("studentList");

const studentSelect = document.getElementById("studentSelect");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

const button = document.getElementById("getMarksBtn");

// Display Students Function

function displayStudents() {
  studentList.innerHTML = "";

  studentSelect.innerHTML = '<option value="">-- Select Student --</option>';

  students.forEach((student) => {
    // Display Student Card

    studentList.innerHTML += `
            <div class="student"
                 onclick="getMarks(${student.id})">
                👤 ${student.name}
            </div>
        `;

    // Add Student to Dropdown

    studentSelect.innerHTML += `
            <option value="${student.id}">
                ${student.name}
            </option>
        `;
  });
}

// Update Statistics Function

function updateStats() {
  const total = students.length;

  const passed = students.filter((student) => student.marks >= 35).length;

  const failed = students.filter((student) => student.marks < 35).length;

  document.getElementById("total").innerHTML = total;

  document.getElementById("passed").innerHTML = passed;

  document.getElementById("failed").innerHTML = failed;
}

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
  // Prevent Multiple Clicks

  if (button.disabled) {
    return;
  }

  // Check Selection

  if (id == "") {
    result.innerHTML = "Please select a student!";
    result.className = "fail";

    return;
  }

  // Update Dropdown

  studentSelect.value = id;

  // Highlight Selected Student

  const allStudents = document.querySelectorAll(".student");

  allStudents.forEach((item, index) => {
    item.classList.toggle("active", students[index].id == id);
  });

  // Clear Previous Result

  result.innerHTML = "";
  result.className = "";

  // Show Loading

  loading.classList.remove("hidden");

  button.disabled = true;
  button.innerHTML = "Loading...";

  try {
    // Fetch Student Marks

    const data = await fetchMarks(id);

    // Pass or Fail

    const status = data.marks >= 35 ? "PASS" : "FAIL";

    // Display Result

    result.className = status == "PASS" ? "pass" : "fail";

    result.innerHTML = `

            <h3>🎓 Student Result</h3>

            Name: ${data.name}<br><br>

            Student ID: ${data.id}<br><br>

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

// Add New Student Function

function addStudent() {
  // Get Input Values

  const name = document.getElementById("studentName").value.trim();

  const marksInput = document.getElementById("studentMarks").value;

  const marks = Number(marksInput);

  // Validation

  if (name === "" || marksInput === "") {
    alert("Please enter student name and marks!");

    return;
  }

  if (Number.isNaN(marks) || marks < 0 || marks > 100) {
    alert("Marks must be between 0 and 100!");

    return;
  }

  // Generate New ID

  const id =
    students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;

  // Create New Student Object

  const newStudent = {
    id: id,

    name: name,

    marks: marks,
  };

  // Add Student to Array

  students.push(newStudent);

  // Update Student List and Dropdown

  displayStudents();

  // Update Statistics

  updateStats();

  // Clear Input Fields

  document.getElementById("studentName").value = "";

  document.getElementById("studentMarks").value = "";

  // Success Message

  alert("Student added successfully!");
}

// Initial Display

displayStudents();

updateStats();

// Dropdown Change Event

studentSelect.addEventListener("change", () => {
  if (studentSelect.value !== "") {
    getMarks();
  }
});
