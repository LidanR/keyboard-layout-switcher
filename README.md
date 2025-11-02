# Keyboard Layout Switcher | מחליף פריסת מקלדת

**Choose your language | בחר שפה:**
- [English](#english) 🇬🇧
- [עברית](#hebrew) 🇮🇱

---

## English

### Overview
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
1. Type something in the wrong layout (for example, `akuo` instead of "שלו��").  
2. To fix it:  
   - Select a part of the text and press **Ctrl + Alt** → Only that part is converted.  
   - Press **Ctrl + Alt** without selecting anything → The whole input is converted.  
3. The text instantly flips between Hebrew and English according to the key positions.

## Example
| Typed (wrong layout) | After pressing Ctrl + Alt |  
|----------------------|---------------------------|  
| `tvki` (English layout) | `אהלן` |  
| `שפפךם` (Hebrew layout) | `applo` |  

## Installation Guide

### Desktop (Chrome / Edge / Brave / Opera)
1. Download and unzip `keyboard-layout-switcher.zip`.  
2. Open your browser and go to:  
   ````
   chrome://extensions/
   ````
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

---

## Hebrew

<div dir="rtl">

### מה זה?
**KeyFlip** הוא תוסף דפדפן קטן ומהיר שמתקן טקסט שהוקלד בפריסת מקלדת שגויה בין עברית לאנגלית.  
הקיצור Ctrl + Alt ממיר מיד את הטקסט לפי מיקום המקשים — לא לפי תרגום.

the extension runs locally in the browser and does not send data outside.

### למה זה שימושי?
- מתקן טקסט **מיידית** בלחיצת צירוף מקשים אחד
- עובד ברוב שדות הקלט וטקסטאריאות בדפי אינטרנט — פייסבוק, ווטסאפ ווב, מיילים ועוד
- **אפשר לבחור מה לתקן:**
  - סימנתם טקסט עם העכבר? רק הטקסט המסומן יומר
  - לא סימנתם כלום? כל התוכן בשדה יומר
- פועל באופן מקומי — אין איסוף נתונים, אין חיבור לשרתים
- מושבת אוטומטית בגוג�� (במקרים בהם קיימת תיקון פריסות מובנה)

### איך משתמשים?
1. הקלדתם משהו בפריסה השגויה (למשל `tvki` במקום "אהלן")
2. יש לכם שתי אפשרויות:
   - **סמנו את הטקסט** שברצונכם לתקן ← לחצו **Ctrl + Alt**
   - **לא סימנתם כלום** ← לחצו **Ctrl + Alt** וכל השדה יתוקן
3. הטקסט יומר מיד בין עברית לאנגלית לפי מיפוי המקשים

### דוגמאות
| מה הוקלד | מה יצא אחרי Ctrl + Alt |  
|-----------|------------------------|  
| `tvki` | `אהלן` |  
| `שפפךש` | `applo` |  
| `,nup` | `שלום` |

### איך מתקינים?

#### כרום / אדג' / ברייב / אופרה
1. הורידו את הקובץ `keyboard-layout-switcher.zip` וחלצו אותו
2. היכנסו לכתובת:
   ````
   chrome://extensions/
   ````
3. הפעילו **Developer mode** (למעלה מימין)
4. לחצו על **Load unpacked**
5. בחרו את התיקייה שחילצתם (זו שיש בה `manifest.json`)
6. התוסף מותקן! ניתן להצמיד אותו לסרגל הכלים

### מידע טכני
- בנוי על Manifest V3
- תומך בהמרה דו-כיוונית: עברית ⟷ אנגלית
- נכתב ב-JavaScript, HTML ו-CSS
- דורש הרשאות מינימליות (`activeTab` ו-`scripting` בלבד)

### דברים שכדאי לדעת
- בגוגל התוסף לא פעיל כאשר קיימת שם פונקציה דומה
- בעורכי טקסט מורכבים (כמו Google Docs) ייתכן ויהיה צורך לרענן את הדף לאחר ההתקנה

### מי יצר את זה?
**לידן** — מפתחת תוכנה שיוצרת כלים לשיפור חוויית ההקלדה והפרודוקטיביות.

</div>