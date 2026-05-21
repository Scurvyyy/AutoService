const API = "http://localhost:8080";
const form = document.getElementById("bookingForm");
const statusEl = document.getElementById("bookingStatus");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return await res.json();
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setStatus("Submitting booking...");

  try {
    await fetchJson(`${API}/api/bookings`, {
      method: "POST",
      body: JSON.stringify({
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        serviceName: document.getElementById("serviceName").value,
        bookingDate: document.getElementById("bookingDate").value,
        status: "Pending",
        note: document.getElementById("problemDescription").value
      })
    });

    form.reset();
    showToast("Booking submitted successfully!");
  } catch (err) {
    setStatus("Error: " + err.message, true);
  }
});