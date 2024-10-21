import Color from "./Color"

export default class Chrono{
  constructor(name, color) {
    this.name = name
    this.color = new Color(color)
    this.timestamps = []
    this.isRunning = false
  }

  addTimestamp() {
    const now = new Date()
    const timestamp = Math.floor(now.getTime() / 1000)
    console.log("HELLO")
    this.timestamps.push(timestamp)
    this.updateRunningStatus()
  }

  updateRunningStatus() {
    this.isRunning = this.timestamps.length % 2 !== 0
  }

  calculateTotalTime() {
    let totalTime = 0
    const currentTimestamp = this.isRunning ? Math.floor(Date.now() / 1000) : null
    const timestamps = currentTimestamp ? [...this.timestamps, currentTimestamp] : this.timestamps
  
    // Iterate over the timestamps in pairs
    for (let i = 0; i < timestamps.length; i += 2) {
      const start = timestamps[i]
      const end = timestamps[i + 1] || currentTimestamp || 0
      totalTime += end - start
    }
  
    return totalTime // Total time in seconds
  }


  toJSON() {
    return {
      name: this.name,
      color: this.color.hex,
      timestamps: this.timestamps
    }
  }

  static fromJSON(json) {
    const chrono = new Chrono(json.name, json.color)
    chrono.timestamps = json.timestamps
    chrono.updateRunningStatus()
    return chrono
  }

}




export function formatDuration(seconds) {
  if (seconds < 60) {
    return `${seconds}s`
  } else if (seconds < 3600) {
    const mm = Math.floor(seconds / 60)
    const ss = seconds % 60
    return `${mm}:${String(ss).padStart(2, '0')}`
  } else if (seconds < 86400) {
    const hh = Math.floor(seconds / 3600)
    const mm = Math.floor((seconds % 3600) / 60)
    const ss = seconds % 60
    return `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
  } else {
    const days = Math.floor(seconds / 86400)
    const hh = Math.floor((seconds % 86400) / 3600)
    const mm = Math.floor((seconds % 3600) / 60)
    const ss = seconds % 60
    return `${days} days, ${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
  }
}