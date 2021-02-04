# ig-download-DM-media

This is a Chrome Extension that downloads media objects inside of an Instagram direct message as they are loaded. It is not on the Chrome Web Store, thus usage is limited to Developer Mode only. 

---

After loading the application into Chrome, navigate to https://www.instagram.com/direct/inbox/ in your Chrome browser, press F12 to open the devtools, click the `GHTMEKH` tab, click the Instagram direct message thread you'd like to scrape, and then scroll up. As you scroll up, and web requests are made, files will download to your downloads folder.

---

There is a script included `remove_duplicates.py` that will remove some of the errors that the Chrome extension leaves.

Usage:

```
python remove_duplicates.py D:\Images\ig-downloaded
```

This script is simple in functionality; it just removes files that have the duplicate number appended to their filename. For example, in bold, filename **(2)**.jpg.

---

**Disclaimer:** This was made for educational purposes, and I am not responsible for inappropriate usage of this application.

