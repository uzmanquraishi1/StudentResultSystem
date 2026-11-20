// Students name array
const students = [
  { id: 1, name: "Uzman" },
  { id: 2, name: "Haider" },
  { id: 3, name: "Harshal" },
  { id: 4, name: "Vidhi" },
  { id: 5, name: "Asrar" },
  { id: 6, name: "Amirah" },
];

// Students marks array
const marksData = [
  { id: 1, marks: 78 },
  { id: 2, marks: 33 },
  { id: 3, marks: 91 },
  { id: 4, marks: 89 },
  { id: 5, marks: 67 },
  { id: 6, marks: 95 },
];

// Display Students using forEach()
students.forEach((student) => {
  document.getElementById("studentList").innerHTML +=
    `<div class="student">${student.name}</div>`;

  document.getElementById("studentSelect").innerHTML +=
    `<option value="${student.id}">${student.name}</option>`;
});

// Promise Function
function fetchMarks(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = marksData.find((student) => student.id == id);

      if (data) {
        resolve(data);
      } else {
        reject("Student marks not found!!!");
      }
    }, 2000);
  });
}

// Async/Await function
async function getMarks() {
  const id = document.getElementById("studentSelect").value;
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");

  result.innerHTML = "";
  result.innerHTML = "";

  if (id == "") {
    result.innerHTML = "Please select s student!";
    result.className = "fail";
    return;
  }
  loading.innerHTML = "Loading.... Please wait";
  try {
    // Fetch marks
    const data = await fetchMarks(id);

    // find student name
    const student = students.find((s) => s.id == id);

    // Check Pass or Fail
    const status = data.marks >= 35 ? "PASS" : "FAIL";

    loading.innerHTML = "";

    result.innerHTML = `
    Name: ${student.name} <br><br>
    Marks: ${data.marks}<br><br>
    Result: ${status}`;

    if (status == "PASS") {
      result.className = "pass";
    } else {
      result.className = "fail";
    }
  } catch (error) {
    loading.innerHTML = "";
    result.innerHTML = error;
    result.className = "fail";
  }
}
