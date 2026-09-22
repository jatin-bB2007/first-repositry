document.addEventListener("DOMContentLoaded", () => {
  const leadStorageKey = "mbaAdmissionLeads";

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");
    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
      });

      if (!isOpen) {
        item.classList.add("active");
      }
    });
  });

  const leadForm = document.querySelector("[data-lead-form]");
  if (!leadForm) {
    return;
  }

  const message = leadForm.querySelector("[data-form-message]");

  const showMessage = (text, type) => {
    if (!message) {
      return;
    }

    message.textContent = text;
    message.dataset.type = type;
  };

  const getSavedLeads = () => {
    try {
      return JSON.parse(localStorage.getItem(leadStorageKey)) || [];
    } catch (error) {
      return [];
    }
  };

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const lead = {
      name: String(formData.get("name") || "").trim(),
      mobile: String(formData.get("mobile") || "").trim(),
      specialization: String(formData.get("specialization") || "").trim(),
      graduation: String(formData.get("graduation") || "").trim(),
      submittedAt: new Date().toISOString(),
    };

    const mobileDigits = lead.mobile.replace(/\D/g, "");
    if (!lead.name || mobileDigits.length < 10) {
      showMessage("Please enter your name and a valid mobile number.", "error");
      return;
    }

    const savedLeads = getSavedLeads();
    savedLeads.push(lead);
    localStorage.setItem(leadStorageKey, JSON.stringify(savedLeads));

    leadForm.reset();
    showMessage("Thanks. Your enquiry has been saved and our counsellor will contact you.", "success");
  });
});
