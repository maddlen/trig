<template>
    <modal name="barcode-scanner-modal" @opened="opened()">
        <div class="barcode-scanner-modal flex flex-col h-full">
            <header class="text-lg font-semibold px-5 py-3 bg-gray-200 rounded-t-lg flex items-center justify-between border-b">
                {{ __('Barcode scanner') }}
            </header>
            <div class="flex-1 px-5 py-6 text-gray">
                <div class="border border-dashed border-pink-dark">
                    <div id="barcode_scanner" class="flex relative">
                        <div v-show="isScanning" class="z-ray absolute w-full h-full"></div>
                    </div>
                </div>
            </div>
            <div class="px-5 py-3 bg-gray-200 rounded-b-lg border-t flex items-center justify-end text-sm">
                <button class="text-gray hover:text-gray-900" @click="dismiss()" v-text="__('Cancel')"/>
            </div>
        </div>
    </modal>
</template>

<style>
.z-ray::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 2px;
    background: red;
    clip-path: inset(0);
    animation: z-ray 1s ease-in-out infinite alternate
}

@keyframes z-ray {
    to {
        transform: translateX(-100%);
        left: 100%;
    }
}
</style>

<script>
export default {
    data() {
        return {
            escBinding: null,
            isScanning: false,
            scanner: undefined
        }
    },

    methods: {
        dismiss() {
            this.scanner.stop()
            this.$emit('cancel')
        },
        opened() {
            this.$emit('opened')
            this.scanner = this.scanner || new BarcodeScanner(document.getElementById('barcode_scanner'))
            this.scanner.start()
            this.scanner.on('ready', this.scan.bind(this))
        },
        scan() {
            this.isScanning = true
            this.scanner.on('result', this.onScanResult)
        },
        onScanResult(e) {
            this.scanner.stop()
            this.$emit('result', e)
        }
    },

    created() {
        this.escBinding = this.$keys.bind('esc', this.dismiss)
    },

    beforeDestroy() {
        this.escBinding.destroy()
    }
}
</script>
