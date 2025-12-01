export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private processor: ScriptProcessorNode | null = null;
  private onDataAvailable: (data: ArrayBuffer) => void;
  private onVolumeChange: ((volume: number) => void) | null = null;

  constructor(
    onDataAvailable: (data: ArrayBuffer) => void,
    onVolumeChange?: (volume: number) => void
  ) {
    this.onDataAvailable = onDataAvailable;
    this.onVolumeChange = onVolumeChange || null;
  }

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioContext = new AudioContext({ sampleRate: 24000 });
      this.source = this.audioContext.createMediaStreamSource(this.stream);

      // Buffer size 4096, 1 input channel, 1 output channel
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = this.floatTo16BitPCM(inputData);
        this.onDataAvailable(pcmData);

        if (this.onVolumeChange) {
          const rms = Math.sqrt(
            inputData.reduce((acc, val) => acc + val * val, 0) /
              inputData.length
          );
          this.onVolumeChange(rms);
        }
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error("Error starting audio recording:", error);
      throw error;
    }
  }

  stop() {
    if (this.processor && this.source) {
      this.processor.disconnect();
      this.source.disconnect();
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.stream = null;
    this.audioContext = null;
    this.source = null;
    this.processor = null;
  }

  private floatTo16BitPCM(input: Float32Array): ArrayBuffer {
    const output = new Int16Array(input.length);
    for (let i = 0; i < input.length; i++) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return output.buffer;
  }
}

export class AudioPlayer {
  private audioContext: AudioContext | null = null;
  private nextStartTime: number = 0;
  private analyser: AnalyserNode | null = null;
  private onVolumeChange: ((volume: number) => void) | null = null;
  private animationFrame: number | null = null;

  constructor(
    sampleRate: number = 24000,
    onVolumeChange?: (volume: number) => void
  ) {
    this.audioContext = new AudioContext({ sampleRate });
    this.onVolumeChange = onVolumeChange || null;

    if (this.onVolumeChange) {
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.connect(this.audioContext.destination);
      this.checkVolume();
    }
  }

  async play(pcmData: ArrayBuffer) {
    if (!this.audioContext) return;

    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }

    const float32Data = this.pcm16ToFloat32(pcmData);
    const buffer = this.audioContext.createBuffer(
      1,
      float32Data.length,
      this.audioContext.sampleRate
    );
    buffer.getChannelData(0).set(float32Data);

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;

    if (this.analyser) {
      source.connect(this.analyser);
    } else {
      source.connect(this.audioContext.destination);
    }

    const currentTime = this.audioContext.currentTime;
    if (this.nextStartTime < currentTime) {
      this.nextStartTime = currentTime;
    }

    source.start(this.nextStartTime);
    this.nextStartTime += buffer.duration;
  }

  private checkVolume() {
    if (!this.analyser || !this.onVolumeChange) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    this.onVolumeChange(average / 255);

    this.animationFrame = requestAnimationFrame(() => this.checkVolume());
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }

  private pcm16ToFloat32(pcmData: ArrayBuffer): Float32Array {
    const int16Array = new Int16Array(pcmData);
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      float32Array[i] = int16Array[i] / 32768;
    }
    return float32Array;
  }
}
