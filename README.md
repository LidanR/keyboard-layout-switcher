# KeyFlip
**תוסף דפדפן לתיקון והמרת פריסת מקלדת**

**Choose your language | בחר שפה:**
- [English](#english) 🇬🇧
- [עברית](#hebrew) 🇮🇱

---

## English

### Overview
**KeyFlip** is a simple and efficient browser extension that converts text typed in the wrong keyboard layout between **Hebrew** and **English**.  
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

### Example
| Typed (wrong layout) | After pressing Ctrl + Alt |  
|----------------------|---------------------------|  
| `tvki` (English layout) | `אהלן` |  
| `שפפךש` (Hebrew layout) | `applo` |  
| `,nup` (English layout) | `שלום` |

### Installation Guide

#### Desktop (Chrome / Edge / Brave / Opera)
1. Download and unzip `keyflip.zip` (or `keyboard-layout-switcher.zip`).  
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

---

## Hebrew

<div dir="rtl">

### מה זה?
**KeyFlip** הוא תוסף דפדפן פשוט ויעיל שפותר בעיה מעצבנת שכולנו מכירים: הקלדה בפריסת המקלדת הלא נכונה.

שכחתם לעבור לעברית והקלדתם `akuo` במקום "שלום"? לחצו **Ctrl + Alt** והטקסט מתוקן מיידית.

**חשוב:** התוסף לא מתרגם, אלא ממיר את האותיות בדיוק לפי המיקום הפיזי שלהן על המקלדת (אנגלית ↔ עברית).

### יכולות מרכזיות
- **תיקון טקסט מיידי** בלחיצת קיצור המקשים **Ctrl + Alt**
- עובד ברוב **שדות הקלט והטקסט באינטרנט** (טפסים, צ'אטים, מיילים ועוד)
- **התנהגות חכמה:**  
  - **בחירה סלקטיבית:** אם מסמנים טקסט ספציפי ולוחצים, רק הוא יומר  
  - **הפעלה מלאה:** אם לא מסמנים כלום, לחיצה על הקיצור תמיר את כל הטקסט בשדה  
- **פרטיות מלאה:** פועל לוקלית על הדפדפן, ללא איסוף מידע או צורך בחיבור אינטרנט
- **מוכוון יעילות:** מושבת אוטומטית בחיפוש גוגל (שם קיים פתרון מובנה) למניעת כפילויות

### איך משתמשים?
1. הקלדתם בפריסה הלא נכונה (למשל `tvki` במקום "אהלן")
2. כדי לתקן:  
   - **לתיקון חלקי:** סמנו את הטקסט הרצוי ולחצו **Ctrl + Alt**  
   - **לתיקון מלא:** מקמו את הסמן בשדה (מבלי לסמן טקסט) ולחצו **Ctrl + Alt**  
3. הטקסט יתחלף מיידית לפריסה הנכונה

### דוגמאות
| מה הקלדתם | מה יצא אחרי Ctrl + Alt |  
|-----------|------------------------|  
| `tvki` | `אהלן` |  
| `שפפךש` | `applo` |  
| `,nup` | `שלום` |

### איך מתקינים?

#### דסקטופ (Chrome / Edge / Brave / Opera)
1. הורידו וחלצו את הקובץ `keyflip.zip` (או `keyboard-layout-switcher.zip`)
2. פתחו את הדפדפן והיכנסו לכתובת:  
   ```
   chrome://extensions/
   ```
3. הפעילו **מצב מפתחים** (Developer mode) (בדרך כלל בפינה העליונה)
4. לחצו על **טען תוסף שלא נארז** (Load unpacked)
5. בחרו את התיקייה שחולצה (זו המכילה את קובץ `manifest.json`)
6. התוסף יופיע ברשימה. מומלץ להצמיד אותו לסרגל הכלים לגישה מהירה

### מידע טכני
- **מניפסט:** גרסה 3
- **שפות נתמכות:** המרה דו-כיוונית עברית ⟷ אנגלית
- **טכנולוגיות:** JavaScript, HTML, CSS
- **הרשאות:** `activeTab` ו-`scripting` (מינימליות הנדרשות לזיהוי ושינוי טקסט בלשונית הפעילה)

### מגבלות ודגשים
- התוסף אינו פעיל בחיפוש גוגל, מכיוון שבאתר זה קיים פתרון מובנה לתיקון שפה
- ביישומים כבדים עם עורכי טקסט מורכבים (כמו Google Docs), ייתכן שיידרש רענון דף לאחר התקנת התוסף

### יוצר
**לידן** - מהנדס תוכנה ויוצר כלים שנועדו להפוך עבודה ופרודוקטיביות לחלקות ונוחות יותר.

</div>

