
        const dialogTrigger = document.getElementById("dialog-trigger");
        const dialogOverlay = document.getElementById("dialog-overlay");
        const dialogContent = document.getElementById("dialog-content");
        const dialogCloseButtons = document.querySelectorAll(
        "#dialog-close, #dialog-close-footer"
        );
  
        dialogTrigger.addEventListener("click", () => {
        dialogOverlay.classList.remove("hidden");
        dialogContent.classList.remove("hidden");
        });
  
        dialogCloseButtons.forEach((button) => {
        button.addEventListener("click", () => {
            dialogOverlay.classList.add("hidden");
            dialogContent.classList.add("hidden");
        });
        });
  
        dialogOverlay.addEventListener("click", () => {
        dialogOverlay.classList.add("hidden");
        dialogContent.classList.add("hidden");
        });
  
        // Get the current year
        const currentYear = new Date().getFullYear();
        // Set the current year in the footer
        document.getElementById("currentYear").textContent = currentYear;
  
        const formElem = document.querySelector("#form");
  
        const newMessage = document.getElementById("message");
  
        // submit handler
        formElem.addEventListener("submit", (e) => {
        // on form submission, prevent default
        e.preventDefault();
  
        const companyName = document.getElementById("companyName").value;
        const companyAddress = document.getElementById("companyAddress").value;
        const contactPerson = document.getElementById("contactPerson").value;
        const phone = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const categories = document.getElementById("categories").value;
        const whatsappNumber = document.getElementById("whatsappNumber").value;
  
        const payload = {
            medium: "email",
            name: "kcorporate_purchase_request",
            recipient: "info@kongahealth.com ",
            subject: "Purchase Request",
            sender: "no-reply@konga.com",
            sender_id: "Konga Corporate",
            params: {
            companyName: companyName,
            companyAddress: companyAddress,
            contactPerson: contactPerson,
            phone: phone,
            email: email,
            categories: categories,
            whatsappNumber: whatsappNumber,
            },
        };
        sendFormData(payload);
        });
  
        const sendFormData = async (payload) => {
        axios.interceptors.request.use(
            function(config) {
            config.headers['Access-Control-Allow-Origin'] = '*';
            return config;
            }
        );
        
        axios.interceptors.response.use(
            function(response) {
            response.headers['Access-Control-Allow-Origin'] = '*';
            return response;
            }
        );
        axios
            .post("https://hermes.igbimo.com/v1/notifications", payload)
            .then((response) => {
            // Handle the response data
            if (response.status === 200) {
                newMessage.textContent = "Message sent successfully! We will contact you shortly ✅";
                newMessage.style.color = "black";
                newMessage.style.fontWeight = "500";
                setTimeout(() => {
                window.location.reload(); // Reset the page after a short delay
                }, 2000); // Reset the form to its original state
            } else {
                // Handle other statuses
                newMessage.textContent = "Something went wrong. Please try again.";
                newMessage.style.color = "red";
            }
            })
            .catch((error) => {
            console.error("Error:", error);
            });
        };
  