const { Chirp } = ChirpConnectSDK
const audioContext = window.AudioContext || window.webkitAudioContext

const isMobile = /iPhone|iPad|iPod|Android|Blackberry|Windows Phone/i.test(
  navigator.userAgent
)
if (!'WebAssembly' in window)
  window.alert('WebAssembly is not supported in this browser')
if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  navigator.mediaDevices = { getUserMedia: navigator.getUserMedia }
}

const hexToAscii = hexx => {
  var hex = hexx.toString()
  var str = ''
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  return str
}

window.Chirpy = received =>
  Chirp().then(sdk => {
    sdk.init()
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
        echoCancellation: true,
      })
      .then(stream => {
        const context = new audioContext()
        const source = context.createMediaStreamSource(stream)
        const processor = context.createScriptProcessor(0, 1, 1)
        source.connect(processor)
        processor.connect(context.destination)
        sdk.setSampleRate(context.sampleRate)
        isMobile ? sdk.setVolume(0.1) : sdk.setVolume(0.6)
        processor.onaudioprocess = function(e) {
          sdk.process_input(
            e.inputBuffer.getChannelData(0),
            e.inputBuffer.length
          )
          sdk.process_output(
            e.outputBuffer.getChannelData(0),
            e.outputBuffer.length
          )
        }
      })
      .catch(err => window.alert('getUserMedia is not supported'))

    sdk.setCallbacks(null, null, null, null, data => received(hexToAscii(data)))
    sdk.start()

    return sdk.send
  })
