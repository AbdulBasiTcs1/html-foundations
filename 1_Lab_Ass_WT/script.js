document.getElementById("myForm").addEventListener("submit", function (e) {
    var name = document.getElementById("name").value; var email = document.getElementById("email").value; var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "") {
        alert("All fields are required!");
        e.preventDefault();	// Stop form submission
    } else if (!emailRegex.test(email)) {
        alert("Please enter a valid email address."); e.preventDefault();
    } else {
        alert("Form submitted successfully!");
    }
});

// jQuery — Hide/Show Element on Button Click
$(document).ready(function () {
    $("#toggleBtn").on("click", function () {
        $("#content").slideToggle(300);
    });
});