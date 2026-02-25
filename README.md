# Key-armour

**Key-armour** is a security-focused project that combines a **Chrome Extension** with a **web dashboard** to help users manage and protect their passwords efficiently. It provides real-time password analysis, strength checks, and a user-friendly interface to monitor and secure your credentials.

## Features

- **Chrome Extension**
  - Quickly analyze password strength.
  - Receive suggestions for stronger passwords.
  - Auto-save and manage passwords securely.
  - Secret vault
  - Risk Based Clustering

- **Web Dashboard**
  - View all saved passwords and their security status.
  - Track password health over time.
  - User-friendly interface for easy management.

## Tech Stack

- **Frontend (Web Dashboard):** HTML, CSS, JavaScript
- **Backend:** Node.js 
- **Chrome Extension:** Manifest V3, JavaScript
- **Storage:** Local Storage

## Installation
1)https://github.com/Manyagoya1/KEY-ARMOUR/edit/main/README.md

2)Open Chrome and go to chrome://extensions/

3)Enable Developer mode (top-right)

4)Click Load unpacked and select the project folder

5)Extension should appear in your Chrome toolbar

## Usage
- Install the Chrome Extension.
- Add passwords to the extension.
- Check the web dashboard to see overall security and manage saved passwords.
- Click the extension icon in the toolbar
- Enter your password in the input field
- See the real-time strength analysis
- Copy the hashed password if needed
- Secret vault saves password
- on Risk Based Clustering passwords are categorized automatically into Low, Medium, High risk based on strength.

## Folder Structure
- securepass360/
- │
- ├── icons/ 
- ├──   icons16.png
  ├──   icons48.png
  ├──   icons128.png
├── background.js    
├── cc
├── content.js       
├── main.js          
├── manifest.json    
├── popup.html       
├── popup.js         
├── style.css        

