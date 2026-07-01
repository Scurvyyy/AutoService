const API = "http://localhost:8080";

const partsGrid = document.getElementById("partsGrid");
const searchInput = document.getElementById("searchInput");
const filterStock = document.getElementById("filterStock");
const categoryButtons = document.querySelectorAll(".cat-btn");

let allParts = [];
let selectedCategory = "all";

const demoImages = [
  "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=900&q=80"
];

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

function getStockLabel(stock) {
  if (stock > 5) return "available";
  if (stock > 0) return "low";
  return "out";
}

function getStockText(stock) {
  if (stock > 5) return "Available";
  if (stock > 0) return "Low stock";
  return "Out of stock";
}

function guessCategory(part) {
  const text = `${part.name || ""} ${part.description || ""}`.toLowerCase();

  if (text.includes("oil") || text.includes("fluid")) return "oil";
  if (text.includes("brake") || text.includes("pad") || text.includes("disc")) return "brake";
  if (text.includes("battery") || text.includes("wire") || text.includes("light")) return "electrical";
  if (text.includes("tire") || text.includes("wheel")) return "tire";
  return "engine";
}

function renderParts() {
  const query = searchInput.value.trim().toLowerCase();
  const stockFilter = filterStock.value;

  const filtered = allParts.filter((part) => {
    const name = (part.name || "").toLowerCase();
    const desc = (part.description || "").toLowerCase();
    const stockLabel = getStockLabel(part.stock ?? 0);
    const category = (part.category || guessCategory(part)).toLowerCase();

    const matchesText = name.includes(query) || desc.includes(query);
    const matchesStock = stockFilter === "all" || stockFilter === stockLabel;
    const matchesCategory = selectedCategory === "all" || selectedCategory === category;

    return matchesText && matchesStock && matchesCategory;
  });

  if (!filtered.length) {
    partsGrid.innerHTML = `<div class="parts-loading">No parts found.</div>`;
    return;
  }

  partsGrid.innerHTML = filtered.map((part, index) => {
    const stockLabel = getStockLabel(part.stock ?? 0);
    const imageUrl = part.imageUrl || demoImages[index % demoImages.length];
    const category = part.category || guessCategory(part);

    return `
      <article class="part-card">
        <img class="part-image" src="${imageUrl}" alt="${part.name ?? "Part image"}" />
        <div class="part-body">
          <h3 class="part-name">${part.name ?? ""}</h3>
          <p class="part-desc">${part.description ?? ""}</p>
          <div class="part-footer">
            <div>
              <div class="price">${part.price ?? 0}₮</div>
              <div class="small" style="font-size: 12px; margin-top: 4px;">${category}</div>
            </div>
            <span class="status-badge status-${stockLabel}">${getStockText(part.stock ?? 0)}</span>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

async function loadParts() {
  try {
    allParts = await fetchJson(`${API}/api/parts`);
    renderParts();
  } catch (err) {
    partsGrid.innerHTML = `<div class="parts-loading">Error loading parts: ${err.message}</div>`;
  }
}

searchInput.addEventListener("input", renderParts);
filterStock.addEventListener("change", renderParts);

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.cat;
    renderParts();
  });
});

loadParts();