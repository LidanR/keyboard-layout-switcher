// content.js

// Helper: check if element is editable (expanded version)
function isEditableElement(el) {
  if (!el) return false;
  
  return (
    // Basic form elements
    el.tagName === 'TEXTAREA' ||
    (el.tagName === 'INPUT' && (
      el.type === 'text' || 
      el.type === 'search' || 
      el.type === 'email' || 
      el.type === 'url' || 
      el.type === 'password' ||
      !el.type // default input type is text
    )) ||
    
    // ContentEditable elements
    el.isContentEditable ||
    el.contentEditable === 'true' ||
    
    // Check if inside a contentEditable parent
    (el.closest && el.closest('[contenteditable="true"]')) ||
    
    // Common rich text editors
    el.classList.contains('ql-editor') || // Quill editor
    el.classList.contains('DraftEditor-editorContainer') || // Draft.js
    el.classList.contains('notranslate') || // Google Docs style
    el.classList.contains('kix-lineview-text-block') || // Google Docs
    
    // Check for common WYSIWYG editors
    el.closest('.ql-editor') ||
    el.closest('[data-slate-editor]') || // Slate.js
    el.closest('.prosemirror-widget') || // ProseMirror
    el.closest('.fr-element') || // FroalaEditor
    el.closest('.note-editable') // Summernote
  );
}

// Convert a string char-by-char using our maps
function convertText(str) {
  if (!str) return str;
  
  return [...str].map(ch => {
    // English -> Hebrew (try exact, then lowercase fallback)
    if (engToHeb[ch] != null) return engToHeb[ch];
    const lower = ch && ch.toLowerCase ? ch.toLowerCase() : ch;
    if (lower !== ch && engToHeb[lower] != null) return engToHeb[lower];

    // Hebrew -> English
    if (hebToEng[ch] != null) return hebToEng[ch];
    return ch;
  }).join('');
}

// Replace long dashes (em/en/minus/fullwidth) with a normal hyphen-minus '-'
function replaceLongDashes(str) {
  if (!str) return str;
  return str.replace(/[—–‒−﹣－‑]/g, '-');
}

// Handle contentEditable elements with better support
function handleContentEditable(element) {
  try {
    const sel = window.getSelection();
    
    if (sel.rangeCount > 0 && !sel.isCollapsed) {
      // Replace only the selected range
      const range = sel.getRangeAt(0);
      const selectedText = range.toString();
      const converted = convertText(selectedText);
      
      range.deleteContents();
      range.insertNode(document.createTextNode(converted));
      
      // Restore selection
      const newRange = document.createRange();
      newRange.setStartAfter(range.startContainer);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
      
    } else {
      // No selection: replace all text content
      const originalText = element.textContent || element.innerText || '';
      const converted = convertText(originalText);
      
      // Store cursor position
      const cursorPos = sel.focusOffset;
      
      // Replace text while preserving structure as much as possible
      if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
        element.textContent = converted;
      } else {
        // More complex structure - try to preserve it
        element.textContent = converted;
      }
      
      // Restore cursor position
      try {
        const range = document.createRange();
        const textNode = element.childNodes[0] || element;
        range.setStart(textNode, Math.min(cursorPos, converted.length));
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {
        // Fallback: just focus the element
        element.focus();
      }
    }
    
    // Trigger input events to notify the page
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
    
  } catch (error) {
    console.log('ContentEditable conversion error:', error);
    // Fallback to simple text replacement
    const text = element.textContent || element.innerText || '';
    element.textContent = convertText(text);
  }
}

// Handle regular input/textarea elements
function handleInputElement(element) {
  const text = element.value;
  const start = element.selectionStart;
  const end = element.selectionEnd;

  if (start !== end) {
    // Replace only the selected substring
    const before = text.slice(0, start);
    const selected = text.slice(start, end);
    const after = text.slice(end);
    const converted = convertText(selected);
    
    element.value = before + converted + after;
    
    // Restore selection around the converted text
    element.setSelectionRange(start, start + converted.length);
    
  } else {
    // No selection: replace all
    const converted = convertText(text);
    element.value = converted;
    
    // Restore caret position
    element.setSelectionRange(start, start);
  }
  
  // Trigger events
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

// Handle dash replacement for contentEditable
function handleContentEditableDashes(element) {
  try {
    const sel = window.getSelection();
    if (sel.rangeCount > 0 && !sel.isCollapsed) {
      const range = sel.getRangeAt(0);
      const selectedText = range.toString();
      const converted = replaceLongDashes(selectedText);
      range.deleteContents();
      range.insertNode(document.createTextNode(converted));
      const newRange = document.createRange();
      newRange.setStartAfter(range.startContainer);
      newRange.collapse(true);
      sel.removeAllRanges();
      sel.addRange(newRange);
    } else {
      const originalText = element.textContent || element.innerText || '';
      const converted = replaceLongDashes(originalText);
      const cursorPos = sel.focusOffset;
      element.textContent = converted;
      try {
        const range = document.createRange();
        const textNode = element.childNodes[0] || element;
        range.setStart(textNode, Math.min(cursorPos, converted.length));
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (_) {
        element.focus();
      }
    }
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  } catch (error) {
    const text = element.textContent || element.innerText || '';
    element.textContent = replaceLongDashes(text);
  }
}

// Handle dash replacement for inputs/textareas
function handleInputElementDashes(element) {
  const text = element.value;
  const start = element.selectionStart;
  const end = element.selectionEnd;
  if (start !== end) {
    const before = text.slice(0, start);
    const selected = text.slice(start, end);
    const after = text.slice(end);
    const converted = replaceLongDashes(selected);
    element.value = before + converted + after;
    element.setSelectionRange(start, start + converted.length);
  } else {
    const converted = replaceLongDashes(text);
    element.value = converted;
    element.setSelectionRange(start, start);
  }
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

// Settings: whether conversion is enabled (toggled via popup)
let klsEnabled = true;

// Initialize setting from storage
try {
  chrome.storage && chrome.storage.sync.get({ enabled: true }, (data) => {
    if (typeof data?.enabled === 'boolean') klsEnabled = data.enabled;
  });
} catch (_) {}

// Listen for runtime messages to toggle on/off
try {
  chrome.runtime && chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg && msg.type === 'KLS_SET_ENABLED') {
      klsEnabled = !!msg.enabled;
      sendResponse && sendResponse({ ok: true });
      return;
    }
    if (msg && msg.type === 'KLS_CONVERT_ACTIVE') {
      if (!klsEnabled) return;
      let active = document.activeElement;
      if (!isEditableElement(active)) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          active = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
        }
      }
      if (!isEditableElement(active)) return;
      if (active.isContentEditable || active.contentEditable === 'true' || active.closest('[contenteditable="true"]')) {
        handleContentEditable(active);
      } else {
        handleInputElement(active);
      }
      sendResponse && sendResponse({ ok: true });
      return;
    }
    if (msg && msg.type === 'KLS_NORMALIZE_DASHES') {
      if (!klsEnabled) return;
      let active = document.activeElement;
      if (!isEditableElement(active)) {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const container = range.commonAncestorContainer;
          active = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
        }
      }
      if (!isEditableElement(active)) return;
      if (active.isContentEditable || active.contentEditable === 'true' || active.closest('[contenteditable="true"]')) {
        handleContentEditableDashes(active);
      } else {
        handleInputElementDashes(active);
      }
      sendResponse && sendResponse({ ok: true });
      return;
    }
  });
} catch (_) {}

// Main event listener with enhanced detection
window.addEventListener("keydown", function(e) {
  if (!klsEnabled) return;
  if (!(e.ctrlKey && e.altKey)) return;

  let active = document.activeElement;
  
  // If no clear active element, try to find focused editable element
  if (!isEditableElement(active)) {
    // Look for recently focused elements or elements with selection
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      active = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
    }
  }
  
  if (!isEditableElement(active)) {
    return;
  }


  // Handle different types of elements
  if (active.isContentEditable || active.contentEditable === 'true' || active.closest('[contenteditable="true"]')) {
    handleContentEditable(active);
  } else {
    handleInputElement(active);
  }

  e.preventDefault();
  e.stopPropagation();
}, true); // Use capture phase on window for cross-frame focus

// Also listen in bubble phase as backup
window.addEventListener("keydown", function(e) {
  if (!klsEnabled) return;
  if (!(e.ctrlKey && e.altKey)) return;
  
  const active = document.activeElement;
  if (isEditableElement(active)) {
    e.preventDefault();
    e.stopPropagation();
  }
});

// Shortcut: Alt + '-' => replace long dashes with standard '-'
window.addEventListener("keydown", function(e) {
  if (!klsEnabled) return;
  if (!e.altKey) return;
  const isMinus = (e.key === '-' || e.code === 'Minus');
  if (!isMinus) return;

  let active = document.activeElement;
  if (!isEditableElement(active)) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      active = container.nodeType === Node.TEXT_NODE ? container.parentElement : container;
    }
  }
  if (!isEditableElement(active)) return;

  if (active.isContentEditable || active.contentEditable === 'true' || active.closest('[contenteditable="true"]')) {
    handleContentEditableDashes(active);
  } else {
    handleInputElementDashes(active);
  }

  e.preventDefault();
  e.stopPropagation();
}, true);

