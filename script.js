           //DOM Elements
const studentForm = document.getElementById("studentForm");
const studentNameInput = document.getElementById("studentName");
const studentIDInput = document.getElementById("studentID");
const emailIDInput = document.getElementById("emailID");
const contactNumberInput = document.getElementById("contactNumber");
const editIndexInput = document.getElementById("editIndex");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const studentTableBody = document.querySelector("#studentTable tbody");
const noDataMsg = document.getElementById("noDataMsg");

let students=[];
               //Load data from localStorage on startup    
document.addEventListener("DOMContentLoaded",()=>{
    const storedStudents = localStorage.getItem("students");
    if(storedStudents){
        students = JSON.parse(storedStudents);
    }
    renderTable();
})
              //validation logic
function validateInputs (){
    const name = studentNameInput.value.trim();
    const id = studentIDInput.value.trim();
    const email = emailIDInput.value.trim();
    const contact = contactNumberInput.value.trim();

    // for name
    if(!/^[a-zA-Z\s]+$/.test(name)){
        alert("Student Name must contain only characters.");
        return false;
    }
  
    // for student id 
    if(!/^\d+$/.test(id)){
        alert("Student id must contain only numbers.");
    }  
     
    // for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
        alert("Please Enter a valid email address.");
        return false;
    }
    
    //for number
    if(!/^\d+$/.test(contact)){
        alert("Contact number must contain only numbers.");
        return false;
    }

    if(contact.length<10){
        alert("Contact Number must be atleast 10 digits.");
        return false;
    }

    //Empty row check
     if (!name.trim() || !id.trim() || !email.trim() || !contact.trim()) {
        alert("All fields are required.");
        return false;
    }

    return true;

}
         //Add or update record
studentForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    if (!validateInputs()) return;
    const newStudent= {
        name: studentNameInput.value.trim(),
        id:studentIDInput.value.trim(),
        email:emailIDInput.value.trim(),
        contact:contactNumberInput.value.trim() 
    };
    const index = parseInt(editIndexInput.value);
    if(index ==-1){
        students.push(newStudent);
    }else{
        students[index]= newStudent;
        resetForm();
    }
    saveAndRender();
});
                //delete record
function deleteStudent(index){
        if(confirm('Are you sure you want to delete this record?')){
            students.splice(index,1);
            saveAndRender();
        }
}
       //edit record
function editStudent(index){
    const student = students[index];
    studentNameInput.value = student.name;
    studentIDInput.value = student.id;
    emailIDInput.value = student.email;
    contactNumberInput.value = student.contact;    

    editIndexInput.value = index;

    submitBtn.textContent = "Update Student";
    submitBtn.style.backgroundColor = "#ffc107";
    submitBtn.style.color = "#333";
    cancelBtn.style.display = "inline-block";
}
       //Reset form to add mode
function resetForm(){
    studentForm.reset();
    editIndexInput.value = "-1"
    submitBtn.textContent = "Register Student";
    submitBtn.style.backgroundColor = "28a745";
    submitBtn.style.color = "white";
    cancelBtn.style.display = "none";
}
          // cancel button logic 
cancelBtn.addEventListener("click",resetForm);

        //save to localStorage and render
function saveAndRender(){
    localStorage.setItem("students",JSON.stringify(students));
    renderTable()
}
      
         //render table and dynamic scroller
function renderTable(){
    studentTableBody.innerHTML = '';

    if (students.length === 0) {
        noDataMsg.style.display = 'block';
    } else {
        noDataMsg.style.display = 'none';
        
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
           ` ;
            studentTableBody.appendChild(row);
        });
    }
}