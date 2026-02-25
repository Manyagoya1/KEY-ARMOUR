/* -----------------------------
   1. Security Utilities
--------------------------------*/
// SHA-256 is much more secure than simple integer hashing
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (!/(.)\1\1/.test(password)) score++;

    if (score <= 2) return { level: "Weak", color: "red" };
    if (score <= 4) return { level: "Medium", color: "orange" };
    return { level: "Strong", color: "green" };
}

/* -----------------------------
   2. Main Feature Attachment
--------------------------------*/
function attachSecurityFeatures() {
    const passwordFields = document.querySelectorAll('input[type="password"]');

    passwordFields.forEach(field => {
        if (field.dataset.securepassAttached) return;
        field.dataset.securepassAttached = "true";

        // Create a single info box for both Strength and Reuse
        const infoBox = document.createElement("div");
        infoBox.className = "secure-pass-info";
        infoBox.style.cssText = "font-size: 12px; margin-top: 5px; font-weight: bold; display: block;";
        field.parentNode.appendChild(infoBox);

        field.addEventListener("input", async () => {
            const val = field.value;
            if (!val) {
                infoBox.textContent = "";
                return;
            }

            const strength = calculateStrength(val);
            const hashed = await hashPassword(val);
            const domain = window.location.hostname;

            chrome.storage.local.get(["passwords"], (result) => {
                const saved = result.passwords || {};
                let reused = false;

                for (let site in saved) {
                    if (site !== domain && saved[site] === hashed) {
                        reused = true;
                        break;
                    }
                }

                infoBox.textContent = `Strength: ${strength.level}${reused ? " ⚠ Reused!" : ""}`;
                infoBox.style.color = reused ? "red" : strength.color;
                
                // Save strength for popup display
                chrome.storage.local.set({ lastPasswordStrength: strength });
            });
        });

        // Save password hash only when the user submits the form
        if (field.form) {
            field.form.addEventListener("submit", async () => {
                if (!field.value) return;
                const hashed = await hashPassword(field.value);
                chrome.storage.local.get(["passwords"], (data) => {
                    let saved = data.passwords || {};
                    saved[window.location.hostname] = hashed;
                    chrome.storage.local.set({ passwords: saved });
                });
            });
        }
    });
}

/* -----------------------------
   3. Robust Initialization
--------------------------------*/
// targeting documentElement avoids the "document.body is null" error
const observer = new MutationObserver(() => attachSecurityFeatures());

function init() {
    const target = document.body || document.documentElement;
    if (target) {
        observer.observe(target, { childList: true, subtree: true });
        attachSecurityFeatures();
    }
}

// Ensure the script runs regardless of the page load state
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

/* -----------------------------
   4. Phishing Alert Listener
--------------------------------*/
chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "PHISHING_ALERT") {
        alert(request.message);
    }
});