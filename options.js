// options.js
// Manage domains from the options page

document.addEventListener("DOMContentLoaded", () => {
  const domainList = document.getElementById("domain-list");
  const manualDomain = document.getElementById("manual-domain");
  const addDomainBtn = document.getElementById("add-domain-btn");

  function loadDomains(cb) {
    chrome.storage.sync.get({ domains: ["kktv.me", "netflix.com"] }, (data) => {
      cb(data.domains);
    });
  }

  function saveDomains(domains, cb) {
    chrome.storage.sync.set({ domains }, cb);
  }

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

  addDomainBtn.onclick = () => {
    const domain = manualDomain.value.trim();
    if (!domain) return;
    loadDomains((domains) => {
      if (!domains.includes(domain)) {
        domains.push(domain);
        saveDomains(domains, () => {
          manualDomain.value = "";
          renderDomains();
        });
      }
    });
  };

  renderDomains();
});
