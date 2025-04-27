document.addEventListener("DOMContentLoaded", () => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  // lấy phần cuối cùng, ví dụ từ /blog/top10ai -> top10ai
  const filename = pathParts[pathParts.length - 1]?.toLowerCase();

  if (!filename) {
    console.warn("Không xác định được filename từ URL.");
    return;
  }

  // Tạo tên hàm render (viết hoa chữ đầu)
  const functionName = "render" + filename.charAt(0).toUpperCase() + filename.slice(1);
  const renderFunction = window[functionName];

  if (typeof renderFunction !== "function") {
    console.warn(`Không tìm thấy hàm render tương ứng: ${functionName}`);
    return;
  }

  // Fetch dữ liệu JSON
  fetch(`/static/assets/data/${filename}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Không thể load file JSON: ${filename}.json`);
      }
      return response.json();
    })
    .then(data => {
      renderFunction(data);
    })
    .catch(err => {
      console.error("Lỗi khi load hoặc xử lý JSON:", err);
    });
});



// Hàm gọi danh sách AI
function renderTop10ai(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  data.forEach((ai, index) => {
    const aiElement = document.createElement("div");
    aiElement.className = "main-content";
    aiElement.innerHTML = `
      <h5>${index + 1}. ${ai.name}</h5>
      <p>${ai.description}</p>
      <div class="img-ai mb-2" style="text-align:center">
        <img src="${ai.image}" alt="${
      ai.name
    }" class="img-fluid" style="max-height: 200px;">
      </div>
      <ul class="function">
        <strong>Tính năng nổi bật:</strong>
        ${ai.features.map((f) => `<li>✅ ${f}</li>`).join("")}
      </ul>
      <p><strong>Link:</strong> <a href="${ai.link}" target="_blank">${
      ai.link
    }</a></p>
      <hr>
    `;
    app.appendChild(aiElement);
  });
}
function renderTop10code(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  data.forEach((code, index) => {
    const codeEle = document.createElement("div");
    codeEle.className = "main-content";
    codeEle.innerHTML = `
     <h5>${index + 1}. ${code.name}</h5>
      <p>${code.description}</p>
      <div class="img-ai mb-2">
        <img src="${code.image}" alt="${
      code.name
    }" class="img-fluid" style="max-height: 200px;">
      </div>
      <ul class="function">
        <strong>Tính năng nổi bật:</strong>
        ${code.features.map((f) => `<li>✅ ${f}</li>`).join("")}
      </ul>
      <p><strong>Link:</strong> <a href="${code.link}" target="_blank">${
      code.link
    }</a></p>
      <hr>
    `;
    app.appendChild(codeEle);
  });
}
// Hàm gọi danh sách thuật ngữ Frontend
function renderThuatngufrontend(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  data.forEach((frontend, index) => {
    const thuatNgu = document.createElement("div");
    thuatNgu.className = "main-content";
    thuatNgu.innerHTML = `
      <p class="name"><strong>${index + 1}.${frontend.short_name}</strong> (${
      frontend.full_name
    })</p>
      <p class="desc" rows="5" style="width:100%;">${frontend.info}</p>
      <hr>
    `;
    app.appendChild(thuatNgu);
  });
}
function renderThuatngubackend(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  data.forEach((backend, index) => {
    const thuatNgu = document.createElement("div");
    thuatNgu.className = "main-content";
    thuatNgu.innerHTML = `
    <p class="name"><strong>${index + 1}.${backend.short_name}</strong>(${
      backend.full_name
    })</p>
    <p class="desc">${backend.info}</p>
    <hr>`;
    app.appendChild(thuatNgu);
  });
}
function renderSlider(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  data.forEach((slider, index) => {
    const sliDer = document.createElement("div");
    sliDer.className = "main-content";
    sliDer.innerHTML = `
    
    `;
  });
}

function renderMeojavascript(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // Hiển thị tiêu đề nếu có
  const title = document.createElement("h2");
  title.textContent = data.title;
  app.appendChild(title);

  data.sections.forEach((section, index) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "main-content";

    sectionDiv.innerHTML = `
      <h5>${index + 1}. ${section.heading}</h5>
      ${section.desc ? `<p>${section.desc}</p>` : ""}
      ${
        section.images && section.images.length > 0
          ? section.images
              .map(
                (img) => `
          <div class="img-ai mb-2">
            <img src="${img}" alt="image" class="img-fluid" style="max-height: 300px;">
          </div>`
              )
              .join("")
          : ""
      }
      ${
        section.bullets && section.bullets.length > 0
          ? `
        <ul class="function">
          <strong>Ghi chú:</strong>
          ${section.bullets.map((b) => `<li> ${b}</li>`).join("")}
        </ul>`
          : ""
      }
      <hr>
    `;

    app.appendChild(sectionDiv);
  });
}
function render8lenhsql(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  app.innerHTML += `
    <h2>${data.title}</h2>
    <img src="${data.image}" alt="cover" style="max-width:600px; display:block; margin:auto;" />
    <p style="text-align: justify;">${data.intro}</p>
  `;

  data.sections.forEach((section, index) => {
    const html = `
      <div class="main-content mb-4">
        <h5>${section.heading}</h5>
        <p>${section.desc || ""}</p>
        <pre style="background:#f0f0f0; padding:10px; border-radius:6px;"><code>${
          section.code
        }</code></pre>
        <hr>
      </div>
    `;
    app.innerHTML += html;
  });

  app.innerHTML += `<p style="text-align: justify;"><strong>${data.outro}</strong></p>`;
}
function render10sukienthuongnien(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";
  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="card flex-md-row shadow-sm h-100">
    <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="mb-3">${index + 1}. ${item.name}</h5>
      <p><strong>Đơn vị tổ chức:</strong> ${item.organizer}</p>
      <p><strong>Thời gian:</strong> ${item.time}</p>
      <p><strong>Địa điểm:</strong> ${item.location}</p>
      <p><strong>Hình thức:</strong> ${item.format}</p>
      <p><strong>Quy mô:</strong> ${item.scale}</p>
      <p><strong>Đối tượng:</strong> ${item.audience}</p>
      <p><a href="${item.link}" target="_blank" class="text-secondary"><i class="fas fa-link"></i> Xem chi tiết</a></p>
    </div>
    `;
    document.getElementById("app").appendChild(div.firstElementChild);
  });
}
