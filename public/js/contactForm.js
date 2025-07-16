//Add event listener to the form with id 'contactForm' for form submission
document.getElementById("contactForm").addEventListener("submit", async function (e){
    e.preventDefault();  //prevent the default form submission

    const form = e.target;  //Reference to the form element

    //Collect input field values
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    //Package the form data into an object
    const data = {name, email, phone, message};

    try{
        //Send the data to your backend API using fetch
        const response = await fetch("/api/sendEmail", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)  //Convert the data object to a JSON string
        });

        const result = await response.json();  //Parse the response as JSON
        
        if(response.ok){
            //If the request was successful, reset the form and show success message
            formSuccess();
            console.log("Form has been submitted successfully");
        }
        else{
            //If the server responded with an error, show error message to user
            submitMSG(false, "The form cannot be submitted at this time. Please try again later or contact us at (604) 302-8001");
            console.log(result.error);
        }
    }catch(err){
        //If fetch or any async call failed, log the error in the console
        console.log(err);
    }
});

//Called on successful form submission
function formSuccess(){
    document.getElementById("contactForm").reset();  //Reset the form to its initial state
    submitMSG(true, "Message Sent Successfully!")  //Show success message
}

//Show a status message (success or error)
function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h4 text-success";
    } else {
        var msgClasses = "h4 text-danger";
    }

    //Update the DOM element with id 'msgsubmit' with the message and style
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}