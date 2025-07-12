document.getElementById("contactForm").addEventListener("submit", async function (e){
    e.preventDefault();
    console.log("Form clicked");
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const message = form.message.value;

    console.log(name, email, phone, message);
});