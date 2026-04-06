document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Tutup menu mobile saat link diklik
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // 2. Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 3. Scroll Animation (Fade In)
  const fadeElements = document.querySelectorAll(".fade-in");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // 4. Dark Mode Toggle
  const toggle = document.getElementById("theme-toggle");

  // Load dari localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggle.checked = true;
  }

  // Saat toggle berubah
  toggle.addEventListener("change", () => {
    if (toggle.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (href && href.includes(current)) {
      link.classList.add("active");
    }
  });
});

// =========================================
// LOGIKA CHATBOT GELAFID
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("chatbot-toggle");
  const closeBtn = document.getElementById("chatbot-close");
  const chatWindow = document.getElementById("chatbot-window");
  const chatMessages = document.getElementById("chatbot-messages");
  const sendBtn = document.getElementById("chatbot-send");
  const chatInput = document.getElementById("chatbot-text");
  const tooltip = document.getElementById("chatbot-tooltip");
  // 1. Fungsi buka-tutup chat window
  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("hidden");
    tooltip.classList.toggle("hidden"); // TAMBAHKAN BARIS INI: Sembunyikan teks saat dibuka
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.classList.add("hidden");
    tooltip.classList.remove("hidden"); // TAMBAHKAN BARIS INI: Munculkan teks saat ditutup
  });

  // 2. Fungsi menambahkan pesan ke layar
  function appendMessage(text, senderClass) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${senderClass}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    // Otomatis scroll ke pesan terbaru
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 3. Fungsi memproses dan membalas pesan
  // 3. Fungsi memproses dan membalas pesan (VERSI UPGRADE)
  function handleSendMessage() {
    const userText = chatInput.value.trim().toLowerCase();
    if (userText === "") return;

    // Tampilkan pesan user
    appendMessage(chatInput.value, "user-message");
    chatInput.value = ""; // Kosongkan kolom input

    // Tentukan balasan bot berdasarkan KATA KUNCI (Keyword)
    setTimeout(() => {
      // Balasan default jika bot tidak mengerti
      let botReply =
        "Maaf kak, bot masih belajar nih 😅. Aku cuma ngerti pertanyaan seputar produk Kunir Asem atau cara pesannya. Boleh tanya soal khasiat, asal usul, komposisi, atau cara ordernya ya!";

      // 1. Sapaan
      if (
        userText.includes("halo") ||
        userText.includes("hai") ||
        userText.includes("min") ||
        userText.includes("pagi") ||
        userText.includes("siang")
      ) {
        botReply =
          "Halo juga, kak! Ada yang pengen kamu tanyain soal jamu sehat Pawon Gelafid?";
      }
      // 2. Apa itu Kunir Asem?
      else if (
        userText.includes("apa itu") ||
        userText.includes("pengertian") ||
        userText.includes("maksud") ||
        userText === "kunir asem"
      ) {
        botReply =
          "Kunir asem (atau kunyit asam) itu minuman jamu tradisional khas nusantara. Perpaduan antara perasan kunyit segar dan asam jawa yang bikin rasanya manis, asam, dan segeeer banget!";
      }
      // 3. Berasal dari daerah mana? / Sejarah
      else if (
        userText.includes("asal") ||
        userText.includes("daerah") ||
        userText.includes("dari mana") ||
        userText.includes("sejarah")
      ) {
        botReply =
          "Jamu kunir asem ini aslinya warisan leluhur dari Pulau Jawa, kak. Dulu minuman ini identik dengan ramuan keraton untuk menjaga kecantikan dan kesehatan, tapi sekarang udah jadi minuman favorit seluruh Indonesia!";
      }
      // 4. Khasiat & Manfaat
      else if (
        userText.includes("manfaat") ||
        userText.includes("khasiat") ||
        userText.includes("guna") ||
        userText.includes("fungsi")
      ) {
        botReply =
          "Wah, manfaatnya banyak! Kunir Asem Pawon Gelafid bagus banget buat nyegerin badan, melancarkan pencernaan, meredakan nyeri haid, dan ningkatin sistem imun kamu karena kaya antioksidan.";
      }
      // 5. Komposisi & Bahan
      else if (
        userText.includes("komposisi") ||
        userText.includes("bahan") ||
        userText.includes("terbuat") ||
        userText.includes("isi")
      ) {
        botReply =
          "Jamu kita terbuat dari 100% bahan alami kak: Kunyit segar, asam jawa pilihan, gula aren murni, dan air. Tanpa bahan pengawet dan tanpa pemanis buatan sama sekali!";
      }
      // 6. Cara Minum / Penyimpanan
      else if (
        userText.includes("minum") ||
        userText.includes("simpan") ||
        userText.includes("kulkas") ||
        userText.includes("tahan") ||
        userText.includes("basi")
      ) {
        botReply =
          "Paling nikmat diminum pas lagi dingin, kak! Karena kita tanpa pengawet, pastikan botolnya langsung disimpan di kulkas ya biar awet dan tetep segar saat mau diminum.";
      }
      // 7. Harga
      else if (
        userText.includes("harga") ||
        userText.includes("berapa") ||
        userText.includes("pricelist") ||
        userText.includes("price list")
      ) {
        botReply =
          "Untuk update harga terbaru, promo bundle, dan ongkir, kakak bisa langsung klik tombol 'Pesan via WhatsApp' ya, nanti admin kita bakal bantu hitungin!";
      }
      // 8. Cara Pesan
      else if (
        userText.includes("pesan") ||
        userText.includes("beli") ||
        userText.includes("order") ||
        userText.includes("cara") ||
        userText.includes("ongkir")
      ) {
        botReply =
          "Gampang banget! Kakak tinggal klik logo/tombol WhatsApp di website ini, sebutin jumlah pesanan dan alamatnya, lalu tunggu jamunya diantar ke rumah deh.";
      }

      // Tampilkan pesan balasan bot
      appendMessage(botReply, "bot-message");
    }, 600); // Jeda 0.6 detik biar kerasa natural kayak lagi ngetik
  }

  // 4. Trigger pengiriman pesan (Klik tombol atau tekan Enter)
  sendBtn.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });
});
