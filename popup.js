function setEnabled(enabled) {
  try {
    chrome.storage.sync.set({ enabled: !!enabled }, () => {
      // Broadcast to all tabs so content script can update quickly
      chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
          if (!tab.id) continue;
          try {
            chrome.tabs.sendMessage(tab.id, { type: 'KLS_SET_ENABLED', enabled });
          } catch (_) {}
        }
      });
    });
  } catch (_) {}
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('enabledToggle');
  if (!toggle) return;

  // Load initial state
  try {
    chrome.storage.sync.get({ enabled: true }, (data) => {
      toggle.checked = !!data.enabled;
    });
  } catch (_) {}

  toggle.addEventListener('change', (e) => {
    const enabled = e.target.checked;
    setEnabled(enabled);
  });
});


