# Trig

> Trig is a Statamic addon that adds a barcode scanner fieldtype to Statamic CP.

## Features

This addon:

- Creates a new Statamic fieldtype named "Barcode Scanner"
- With a trigger that opens a modal
- Which embeds a barcode scanner
- Using a WebAssembly build of the ZBar Bar Code Reader

## Credits

- ZBar Bar Code Reader: https://zbar.sourceforge.net/
- WebAssembly build (zbar-wasm): https://github.com/undecaf/zbar-wasm 

## How to Install

You can search for this addon in the `Tools > Addons` section of the Statamic control panel and click **install**, or run the following command from your project root:

``` bash
composer require maddlen/trig
```

## How to Use

Add the "Barcode Scanner" fieldtype to your blueprints, fieldsets, ... 
as you would with any other fieldtype.

Click on the revealer icon next to the text input to open the scanner
and make sure to **allow access to your camera**.

Scan the barcode of an object. When a readable result is found,
the field is populated with its value and the scanner is closed.
