// popup.js
// Handles domain management for the extension

document.addEventListener("DOMContentLoaded", () => {
  const enableSiteBtn = document.getElementById("enable-site-btn");
  const manageSitesBtn = document.getElementById("manage-sites-btn");
  const manageSection = document.getElementById("manage-section");
  const mainMenu = document.getElementById("main-menu");
  const domainList = document.getElementById("domain-list");
  const manualDomain = document.getElementById("manual-domain");
  const addDomainBtn = document.getElementById("add-domain-btn");
  const backBtn = document.getElementById("back-btn");

  // Get current tab's domain
  function getCurrentDomain(cb) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      try {
        const url = new URL(tabs[0].url);
        cb(url.hostname.replace(/^www\./, ""));
      } catch {
        cb(null);
      }
    });
  }

  // Load domains from storage
  function loadDomains(cb) {
    chrome.storage.sync.get({ domains: [] }, (data) => {
      cb(data.domains);
    });
  }

  // Save domains to storage
  function saveDomains(domains, cb) {
    chrome.storage.sync.set({ domains }, cb);
  }

  // Render domain list
  function renderDomains() {
    loadDomains((domains) => {
      domainList.innerHTML = "";
      domains.forEach((domain, idx) => {
        const li = document.createElement("li");
        li.textContent = domain;
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
          domains.splice(idx, 1);
          saveDomains(domains, renderDomains);
        };
        li.appendChild(delBtn);
        domainList.appendChild(li);
      });
    });
  }

  // Add current site
  function addCurrentSite() {
    getCurrentDomain((domain) => {
      if (!domain) return;
      loadDomains((domains) => {
        if (!domains.includes(domain)) {
          domains.push(domain);
          saveDomains(domains, () => {
            alert(
              "Domain added: " +
                domain +
                "\n請重新整理網頁 (Reload) 以啟用功能。"
            );
          });
        } else {
          alert("Domain already in list.");
        }
      });
    });
  }

  // Add manual domain
  addDomainBtn.onclick = () => {
    const domain = manualDomain.value.trim();
    if (!domain) return;
    loadDomains((domains) => {
      if (!domains.includes(domain)) {
        domains.push(domain);
        saveDomains(domains, () => {
          manualDomain.value = "";
          renderDomains();
          alert(
            "Domain added: " + domain + "\n請重新整理網頁 (Reload) 以啟用功能。"
          );
        });
      }
    });
  };

  // Enable current site button
  enableSiteBtn.onclick = () => {
    addCurrentSite();
  };

  // Manage sites button
  manageSitesBtn.onclick = () => {
    mainMenu.style.display = "none";
    manageSection.style.display = "block";
    renderDomains();
  };

  // Back button
  backBtn.onclick = () => {
    manageSection.style.display = "none";
    mainMenu.style.display = "block";
  };
});
