let selectedAvatar=""
        function selectAvatar(img) {

    // remove previous selection
    document.querySelectorAll(".avatar-options img").forEach(i => {
        i.classList.remove("selected-avatar");
    });

    img.classList.add("selected-avatar");

    selectedAvatar = img.getAttribute("src");
}

function openEdit() {

    // Hide profile display
    document.getElementById("profileView").style.display = "none";

    // Show edit section
    document.getElementById("editSection").classList.remove("hidden");

    // Pre-fill existing values
    nameInput.value = localStorage.getItem("name") || "";
    emailInput.value = localStorage.getItem("email") || "";
    phoneInput.value = localStorage.getItem("phone") || "";
    addressInput.value = localStorage.getItem("address") || "";
    dobInput.value = localStorage.getItem("dob") || "";
    genderInput.value = localStorage.getItem("gender") || "";
}


function saveProfile() {

    let name = nameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let address = addressInput.value;
    let dob = dobInput.value;
    let gender = genderInput.value;

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("address", address);
    localStorage.setItem("dob", dob);
    localStorage.setItem("gender", gender);

    loadProfile();

    // Hide edit section
    document.getElementById("editSection").classList.add("hidden");

    // Show profile again
    document.getElementById("profileView").style.display = "block";
    if (selectedAvatar !== "") {
    localStorage.setItem("profileImage", selectedAvatar);
}
}


function loadProfile() {

    nameDisplay.innerText = localStorage.getItem("name") || "Your Name";
    emailDisplay.innerText = localStorage.getItem("email") || "Your Email";
    phoneDisplay.innerText = localStorage.getItem("phone") || "Contact Number";
    addressDisplay.innerText = localStorage.getItem("address") || "Address";
    dobDisplay.innerText = "DOB: " + (localStorage.getItem("dob") || "");
    genderDisplay.innerText = "Gender: " + (localStorage.getItem("gender") || "");
    let savedAvatar = localStorage.getItem("profileImage");
if (savedAvatar) {
    profileImage.src = savedAvatar;
}
}

window.onload = loadProfile;