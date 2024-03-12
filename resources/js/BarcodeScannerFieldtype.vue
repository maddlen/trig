<template>
    <div class="barcode_scanner-fieldtype-container">
        <barcode-scanner-modal v-if="isScanning" :title="__('Barcode scanner')" @result="onScanResult" @cancel="isScanning = false"/>

        <div class="input-group">
            <div @click="isScanning = true" class="input-group-prepend flex items-center cursor-pointer">
                <svg-icon name="light/revealer" class="w-4 h-4"/>
            </div>
            <div class="input-text border border-gray-500 border-l-0">
                <input
                    class="input-text-minimal p-0 bg-transparent leading-none"
                    :value="value"
                    @input="update($event.target.value)"
                />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mixins: [Fieldtype],
    data() {
        return {
            isScanning: false,
            scanner: undefined
        }
    },
    methods: {
        onScanResult(e) {
            this.update(e.detail.result)
            this.isScanning = false
        }
    }
}
</script>
