var jwt = localStorage.getItem("jwt");
if (jwt == null) {
  window.location.href = './login.html'
}

function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://demo2.z-bit.ee/tasks");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", "Bearer "+jwt);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (objects) {
        console.log(objects);
        objects.forEach(renderTask);
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html'
}

function addTask() {
    // Open a new window or popup
    var taskWindow = window.open('', 'Add Task', 'width=300,height=200');

    // Basic HTML structure for the new window
    taskWindow.document.write('<html><head><title>Add New Task</title></head><body>');

    // Form for adding a task
    taskWindow.document.write('<form id="taskForm">');
    taskWindow.document.write('Title: <input type="text" id="title" name="title"><br>');
    taskWindow.document.write('Description: <input type="text" id="desc" name="desc"><br>');
    taskWindow.document.write('<input type="button" value="Add Task" onclick="opener.submitTask(document.getElementById(\'title\').value, document.getElementById(\'desc\').value)">');
    taskWindow.document.write('</form>');

    // Close the HTML document
    taskWindow.document.write('</body></html>');
    taskWindow.document.close(); // Close the document for further writing
}

function submitTask(title, desc) {
    // Process task submission, e.g., send it to a server or log it
    console.log('Task Title:', title, 'Task Description:', desc);

    // Here, add your logic to send task to the backend server
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://demo2.z-bit.ee/tasks", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", "Bearer " + jwt);
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log('Task Added:', this.responseText);
            // Optionally, reload or update task list in the original window
            window.location.reload();
        }
    };
    xhttp.send(JSON.stringify({ title: title, desc: desc }));
}
