import BarcodeScanner from './barcode-scanner'
import BarcodeScannerFieldtype from "./BarcodeScannerFieldtype.vue";
import BarcodeScannerModal from "./BarcodeScannerModal.vue";

window.BarcodeScanner = BarcodeScanner

Statamic.booting(() => {
    Statamic.$components.register('barcode_scanner-fieldtype', BarcodeScannerFieldtype);
    Statamic.$components.register('barcode-scanner-modal', BarcodeScannerModal);
})
