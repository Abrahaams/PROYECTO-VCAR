const form = document.getElementById("vehicleForm");
const msg = document.getElementById("formMessage");
const sendBtn = document.getElementById("sendBtn");
const telefonoInput = document.getElementById("telefonoInput");

const WHATSAPP_NUMBER = "50237915807"; // <-- Tu número

function setMessage(type, text) {
  msg.classList.remove("ok", "bad");
  msg.classList.add(type);
  msg.textContent = text;
  msg.style.display = "block";
}

function cleanVin(vin) {
  return vin.replace(/\s/g, "").toUpperCase();
}

function isValidVin(vin) {
  // VIN: 17 caracteres, sin I, O, Q
  if (vin.length !== 17) return false;
  if (/[IOQ]/.test(vin)) return false;
  if (!/^[A-Z0-9]+$/.test(vin)) return false;
  return true;
}

function encodeText(text) {
  return encodeURIComponent(text);
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}

/* ================================
   TELÉFONO GUATEMALA: AUTOFORMATO
   5555-4444
================================ */
function formatGTPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 4) return digits;
  return digits.slice(0, 4) + "-" + digits.slice(4);
}

telefonoInput.addEventListener("input", (e) => {
  e.target.value = formatGTPhone(e.target.value);
});

/* ================================
   SUBMIT
================================ */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const nombre = data.get("nombre").trim();
  const telefonoRaw = data.get("telefono").trim();
  const email = data.get("email").trim();
  let vin = data.get("vin").trim();
  const detalles = data.get("detalles").trim();

  // Teléfono validación
  const phoneDigits = telefonoRaw.replace(/\D/g, "");
  if (phoneDigits.length !== 8) {
    setMessage("bad", "⚠️ El teléfono debe tener 8 dígitos (Ej: 5555-4444).");
    return;
  }

  // Email validación básica
  if (!email.includes("@") || !email.includes(".")) {
    setMessage("bad", "⚠️ Ingresa un correo válido.");
    return;
  }

  // VIN validación
  vin = cleanVin(vin);
  if (vin.length > 0 && !isValidVin(vin)) {
    setMessage("bad", "⚠️ VIN inválido. Debe tener 17 caracteres y no puede contener I, O o Q.");
    return;
  }

  const vinText = vin.length > 0 ? vin : "No proporcionado (cliente desea propuestas)";
  const detallesText = detalles.length > 0 ? detalles : "El cliente no especificó detalles aún.";

  // Mensaje WhatsApp
  const message = `
🚗 *SOLICITUD DE IMPORTACIÓN (COPART)*

👤 *Nombre:* ${nombre}
📞 *Teléfono:* +502 ${formatGTPhone(phoneDigits)}
📧 *Email:* ${email}

🔎 *VIN:* ${vinText}

📝 *Vehículo / Detalles:*
${detallesText}

✅ Quiero una cotización completa con tiempos y costos.
  `.trim();

  const encodedMessage = encodeText(message);

  // URLs
  const mobileURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  const desktopURL = `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

  const finalURL = isMobileDevice() ? mobileURL : desktopURL;

  // UI loading
  sendBtn.classList.add("loading");
  sendBtn.innerHTML = "Abriendo WhatsApp...";

  setMessage("ok", "✅ Listo. Te estamos redirigiendo a WhatsApp...");

  setTimeout(() => {
    window.open(finalURL, "_blank");

    // Reset
    form.reset();
    sendBtn.classList.remove("loading");
    sendBtn.innerHTML = `Enviar Solicitud <span>→</span>`;
  }, 700);
});
