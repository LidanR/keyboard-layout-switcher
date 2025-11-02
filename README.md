# Keyboard Layout Switcher

## Overview
**Keyboard Layout Switcher** is a simple and efficient browser extension that converts text typed in the wrong keyboard layout between **Hebrew** and **English**.  
Press **Ctrl + Alt** to instantly fix your text based on keyboard mapping, not translation.

## Features
- Instantly switch between **Hebrew** and **English** layouts.  
- Works in most input fields and textareas.  
- **Smart behavior:**  
  - If you **select text with the mouse**, only the selected part will be converted.  
  - If you **press Ctrl + Alt without selecting**, the entire text in the input field will be converted.  
- Disabled automatically in **Google Search**, where a built-in layout correction feature already exists.  
- Runs locally — no data collection, no internet access required.

## How It Works
1. Type something in the wrong layout (for example, `akuo` instead of "שלום").  
2. To fix it:  
   - Select a part of the text and press **Ctrl + Alt** → Only that part is converted.  
   - Press **Ctrl + Alt** without selecting anything → The whole input is converted.  
3. The text instantly flips between Hebrew and English according to the key positions.

## Example
| Typed (wrong layout) | After pressing Ctrl + Alt |  
|----------------------|---------------------------|  
| `tvki` (English layout) | `אהלן` |  
| `שדגש` (Hebrew layout) | `applo` |  

## Installation Guide

### Desktop (Chrome / Edge / Brave / Opera)
1. Download and unzip `keyboard-layout-switcher.zip`.  
2. Open your browser and go to:  
   ```
   chrome://extensions/
   ```
3. Enable **Developer mode** (top right corner).  
4. Click **Load unpacked**.  
5. Select the unzipped folder (the one containing `manifest.json`).  
6. The extension will appear in your extensions list — you can pin it to the toolbar.

## Technical Details
- **Manifest version:** 3  
- **Supported languages:** Hebrew ↔ English  
- **Technologies used:** JavaScript, HTML, CSS  
- **Permissions:**  
  - `activeTab` – allows detecting and modifying text in the active page.  
  - `scripting` – used to inject conversion logic into editable fields.  

## Limitations
- Not active in Google Search because that site already includes built-in language correction.  
- Some web applications with complex editors (like Google Docs) may require a page refresh after installing the extension.

## Author
Created by **Lidan**, software engineer and creator of tools designed to make typing and productivity smoother.
