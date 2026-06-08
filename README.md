# Clear & Download Symbols

A lightweight and efficient Visual Studio Code extension designed for **Dynamics 365 Business Central** developers, created by **HaThanhHuy**. It streamlines your daily workflow by allowing you to instantly purge cached `.alpackage` files from your cache directories and automatically trigger a fresh symbols download with a single command.

---

## Features

* 🗑️ **Bulk Deletion:** Automatically locates and deletes all `.alpackage` files across configured paths.
* 📂 **Multi-Folder Cache Support:** Fully compatible with custom package setups by scanning an array of relative paths.
* 🔄 **Automated Sync:** Immediately invokes the `AL: Download Symbols` command right after a successful clean-up.
* ⚠️ **Safe Execution:** Includes a built-in modal confirmation dialog to prevent accidental triggers.

---

## Prerequisites

To leverage the automatic symbols recovery feature, ensure you have the official Microsoft AL Language extension active in your workspace:

* **[AL Language extension for Dynamics 365 Business Central](https://marketplace.visualstudio.com/items?itemName=ms-dynamics-smb.al)**

---

## Extension Settings

This extension contributes the following configuration setting to target your package cache directories:

* `al.packageFolder`: An array of relative folder paths containing `.alpackage` files.
  * **Default:** `".alpackages"`
  * *Note: If you leave this array empty, the extension will scan and clear `.alpackage` files from the **entire** workspace.*

---

## How to Use

1. Open your Business Central AL project workspace.
2. Press **`Ctrl+Shift+P`** (or `Cmd+Shift+P` on macOS) to open the Command Palette.
3. Type and select: **`AL: Clear & Download Symbols`**.
4. A warning dialog will appear. Click **Delete** to confirm.
5. The extension will wipe the target package folders and immediately launch the native AL symbol downloader!

---