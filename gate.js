// ─────────────────────────────────────────
//  PORTFOLIO ACCESS GATE
//  Change ACCESS_CODE to your 4-digit code.
// ─────────────────────────────────────────
const ACCESS_CODE = "1234";
const SESSION_KEY = "sage_access_granted";

(function () {
  if (sessionStorage.getItem(SESSION_KEY) === "true") return;

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;1,9..144,300;1,9..144,700&family=Inter:wght@300;400;500;600&display=swap');

    #access-gate {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #f8f8fc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0;
      animation: gateFadeIn .4s ease both;
    }

    @keyframes gateFadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @keyframes gateFadeOut {
      from { opacity: 1; transform: scale(1); }
      to   { opacity: 0; transform: scale(1.015); }
    }

    #access-gate.unlocking {
      animation: gateFadeOut .5s ease forwards;
      pointer-events: none;
    }

    #gate-wordmark {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 0.72rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #0e0e10;
      margin-bottom: 56px;
    }

    #gate-heading {
      font-family: 'Fraunces', serif;
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      font-style: italic;
      line-height: 1;
      color: #0e0e10;
      margin-bottom: 8px;
      text-align: center;
    }

    #gate-label {
      font-family: 'Inter', sans-serif;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #4B61B6;
      margin-bottom: 32px;
      text-align: center;
    }

    #gate-dots {
      display: flex;
      gap: 12px;
      margin-bottom: 40px;
    }

    .gate-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1.5px solid rgba(75,97,182,0.35);
      background: transparent;
      transition: background .15s, border-color .15s, transform .15s;
    }

    .gate-dot.filled {
      background: #4B61B6;
      border-color: #4B61B6;
      transform: scale(1.2);
    }

    .gate-dot.error {
      background: #c0392b;
      border-color: #c0392b;
      animation: dotShake .3s ease;
    }

    @keyframes dotShake {
      0%,100% { transform: translateX(0); }
      25%      { transform: translateX(-5px); }
      75%      { transform: translateX(5px); }
    }

    #gate-keypad {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
      width: 228px;
    }

    .gate-key {
      height: 60px;
      border: 1px solid rgba(75,97,182,0.18);
      border-radius: 16px;
      background: white;
      font-family: 'Fraunces', serif;
      font-weight: 700;
      font-size: 1.3rem;
      color: #0e0e10;
      cursor: pointer;
      transition: background .12s, border-color .15s, transform .08s, box-shadow .15s;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      box-shadow: 0 2px 8px rgba(75,97,182,0.06);
    }

    .gate-key:hover {
      background: #E8ECFA;
      border-color: #4B61B6;
    }

    .gate-key:active {
      transform: scale(0.93);
      background: #dde3f7;
    }

    #gate-zero {
      grid-column: 2;
    }

    #gate-delete {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 400;
      color: #5a5a6e;
      grid-column: 3;
    }

    #gate-error-msg {
      margin-top: 24px;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 0.68rem;
      letter-spacing: 0.16em;
      color: #c0392b;
      opacity: 0;
      transition: opacity .2s;
      text-transform: uppercase;
    }

    #gate-error-msg.visible {
      opacity: 1;
    }

    /* thin divider line above wordmark, like the navbar border */
    #gate-wordmark::before {
      content: '';
      display: block;
      width: 32px;
      height: 1px;
      background: rgba(75,97,182,0.2);
      margin: 0 auto 24px;
    }
  `;
  document.head.appendChild(style);

  const gate = document.createElement("div");
  gate.id = "access-gate";
  gate.innerHTML = `
    <div id="gate-wordmark">Sage Ellen Rebello</div>
    <div id="gate-heading">Welcome.</div>
    <div id="gate-label">Enter access code</div>
    <div id="gate-dots">
      <div class="gate-dot" id="d0"></div>
      <div class="gate-dot" id="d1"></div>
      <div class="gate-dot" id="d2"></div>
      <div class="gate-dot" id="d3"></div>
    </div>
    <div id="gate-keypad">
      ${[1,2,3,4,5,6,7,8,9].map(n =>
        `<button class="gate-key" data-key="${n}">${n}</button>`
      ).join("")}
      <button class="gate-key" id="gate-delete" data-key="del">⌫</button>
      <button class="gate-key" id="gate-zero"   data-key="0">0</button>
    </div>
    <div id="gate-error-msg">Incorrect code</div>
  `;
  document.body.appendChild(gate);

  let input = "";
  const dots     = [0,1,2,3].map(i => document.getElementById("d" + i));
  const errorMsg = document.getElementById("gate-error-msg");

  function updateDots() {
    dots.forEach((d, i) => {
      d.classList.toggle("filled", i < input.length);
      d.classList.remove("error");
    });
    errorMsg.classList.remove("visible");
  }

  function showError() {
    dots.forEach(d => { d.classList.remove("filled"); d.classList.add("error"); });
    errorMsg.classList.add("visible");
    input = "";
    setTimeout(updateDots, 600);
  }

  function unlock() {
    sessionStorage.setItem(SESSION_KEY, "true");
    gate.classList.add("unlocking");
    setTimeout(() => gate.remove(), 500);
  }

  function handleKey(k) {
    if (k === "del") {
      input = input.slice(0, -1);
      updateDots();
      return;
    }
    if (input.length >= 4) return;
    input += k;
    updateDots();
    if (input.length === 4) {
      setTimeout(() => {
        if (input === ACCESS_CODE) unlock();
        else showError();
      }, 120);
    }
  }

  document.getElementById("gate-keypad").addEventListener("click", e => {
    const btn = e.target.closest(".gate-key");
    if (btn) handleKey(btn.dataset.key);
  });

  document.addEventListener("keydown", e => {
    if (!document.getElementById("access-gate")) return;
    if (/^[0-9]$/.test(e.key)) handleKey(e.key);
    if (e.key === "Backspace") handleKey("del");
  });
})();