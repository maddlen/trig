/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
export default class BarcodeScanner {
    scriptId = 'zbar_wasm'
    video = undefined
    stream = undefined

    constructor(el) {
        this.el = el
        this.loadZbarWasm()
    }

    dispatch(event, data) {
        document.dispatchEvent(new CustomEvent(this.scriptId + event, {detail: data}))
    }

    on(event, cb) {
        document.addEventListener(this.scriptId + event, e => cb(e))
    }

    loadZbarWasm() {
        if (!document.getElementById(this.scriptId)) {
            const script = document.createElement('script')
            script.id = this.scriptId
            script.src = '/vendor/barcode-scanner/zbar-wasm/zbar-wasm-0.10.1.js'
            document.head.appendChild(script)
        }
    }

    createVideo() {
        const video = document.createElement('video')
        video.muted = true
        video.autoplay = true
        video.playsInline = true
        this.el.appendChild(video)
        this.video = video
    }

    start() {
        this.createVideo()
        navigator.mediaDevices.getUserMedia({audio: false, video: {facingMode: 'environment'}})
            .then(stream => {
                this.stream = stream
                this.video.srcObject = stream
                this.detectVideo()
                this.dispatch('ready')
            })
    }

    stop() {
        this.stream.getVideoTracks().forEach(t => t.stop())
        this.video.remove()
    }

    detectVideo() {
        this.read(this.video).then(() => requestAnimationFrame(() => this.detectVideo()))
    }

    read(source) {
        const width = source.naturalWidth || source.videoWidth || source.width
        const height = source.naturalHeight || source.videoHeight || source.height
        const canvas = new OffscreenCanvas(width, height)
        const ctx = canvas.getContext('2d')
        if (canvas.height && canvas.width) {
            ctx.drawImage(source, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            return zbarWasm.scanImageData(imageData).then(symbols => {
                if (symbols.length) {
                    const result = symbols[0].decode('utf-8')
                    this.dispatch('result', {result: result})
                }
            })
        } else {
            return Promise.resolve()
        }
    }
}
