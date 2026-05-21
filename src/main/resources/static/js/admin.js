 const API = 'http://localhost:8080';

    function showSection(id) {
      document.querySelectorAll('.section-tab').forEach(el => el.classList.remove('active'));
      document.getElementById(id).classList.add('active');

      document.querySelectorAll('.toolbar button').forEach(btn => btn.classList.remove('active'));
      const buttons = [...document.querySelectorAll('.toolbar button')];
      const map = { servicesTab: 0, customersTab: 1, bookingsTab: 2 };
      buttons[map[id]].classList.add('active');
    }

    function setStatus(id, message, isError = false) {
      const el = document.getElementById(id);
      if (!el) return;
      el.textContent = message;
      el.classList.toggle('error', isError);
    }

    async function fetchJson(url, options = {}) {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
        ...options
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
      }
      if (res.status === 204) return null;
      return await res.json();
    }

    async function loadServices() {
      const tbody = document.getElementById('serviceTable');
      tbody.innerHTML = '<tr><td colspan="3">Loading...</td></tr>';
      try {
        const data = await fetchJson(`${API}/api/services`);
        document.getElementById('serviceCount').textContent = data.length;
        tbody.innerHTML = data.length
          ? data.map(s => `<tr><td>${s.id}</td><td>${s.name}</td><td>${s.price}</td></tr>`).join('')
          : '<tr><td colspan="3">No services yet</td></tr>';
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="3">Error loading services</td></tr>';
        setStatus('serviceStatus', err.message, true);
      }
    }

    async function loadCustomers() {
      const tbody = document.getElementById('customerTable');
      tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';
      try {
        const data = await fetchJson(`${API}/api/customers`);
        document.getElementById('customerCount').textContent = data.length;
        tbody.innerHTML = data.length
          ? data.map(c => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.phone}</td><td>${c.email}</td></tr>`).join('')
          : '<tr><td colspan="4">No customers yet</td></tr>';
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="4">Error loading customers</td></tr>';
      }
    }

    async function loadBookings() {
      const tbody = document.getElementById('bookingTable');
      tbody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';
      try {
        const data = await fetchJson(`${API}/api/bookings`);
        document.getElementById('bookingCount').textContent = data.length;
        tbody.innerHTML = data.length
          ? data.map(b => `<tr><td>${b.id}</td><td>${b.customerName}</td><td>${b.customerPhone}</td><td>${b.serviceName}</td><td>${b.bookingDate}</td><td>${b.status}</td></tr>`).join('')
          : '<tr><td colspan="6">No bookings yet</td></tr>';
      } catch (err) {
        tbody.innerHTML = '<tr><td colspan="6">Error loading bookings</td></tr>';
      }
    }

    document.getElementById('serviceForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('serviceStatus', 'Saving...');
      try {
        await fetchJson(`${API}/api/services`, {
          method: 'POST',
          body: JSON.stringify({
            name: document.getElementById('serviceName').value,
            price: parseFloat(document.getElementById('servicePrice').value)
          })
        });
        e.target.reset();
        setStatus('serviceStatus', 'Saved successfully');
        await loadServices();
      } catch (err) {
        setStatus('serviceStatus', 'Error: ' + err.message, true);
      }
    });

    loadServices();
    loadCustomers();
    loadBookings();