declare const chrome: typeof import("webextension-polyfill").browser;

document.addEventListener("DOMContentLoaded", () => {

    chrome.storage.local.get("lastPasswordStrength", (data: Record<string, any>) => {
        if (data.lastPasswordStrength) {
            const strengthElement = document.getElementById("strength");
            if (strengthElement) {
                strengthElement.textContent =
                    "Password Strength: " + data.lastPasswordStrength.level;
            }
        }
    });

    const saveRiskElement = document.getElementById("saveRisk");
    if (saveRiskElement) {
        saveRiskElement.addEventListener("click", () => {
            chrome.storage.local.get("lastPasswordStrength", (data: Record<string, any>) => {

                if (!data.lastPasswordStrength) {
                    alert("No password detected yet.");
                    return;
                }

                const strengthScore = data.lastPasswordStrength.score;
                const categoryElement = document.getElementById("category") as HTMLSelectElement;
                const categoryWeight = categoryElement ? parseFloat(categoryElement.value) : 1;

                const riskScore = strengthScore * categoryWeight;

                const riskResultElement = document.getElementById("riskResult");
                if (riskResultElement) {
                    riskResultElement.textContent =
                        "Risk Score: " + riskScore;
                }

                chrome.storage.local.set({
                    finalRiskScore: riskScore
                });
            });
        });
    }
    
    const openSiteElement = document.getElementById("openSite");
    if (openSiteElement) {
        openSiteElement.addEventListener("click", () => {
            chrome.tabs.create({ url:"file:///D:/securepass360/cc.html" });
        });
    }
});