export default class Color{

  

  
  
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'string') {
      const str = args[0]
      
      // Check for hex color string (starts with '#')
      if (str.startsWith('#')) {
        const color = Color.fromHex(str)
        this.r = color.r
        this.g = color.g
        this.b = color.b
        this.a = color.a
  
      // Check for rgb/rgba color string (starts with 'rgb')
      } else if (str.startsWith('rgb')) {
        const color = Color.fromRGB(str)
        this.r = color.r
        this.g = color.g
        this.b = color.b
        this.a = color.a
      }else if (str.startsWith('hsl')) {
        const color = Color.fromHSLstr(str)
        this.r = color.r
        this.g = color.g
        this.b = color.b
        this.a = color.a
      } else if (str.startsWith('hsv')) {
        const color = Color.fromHSVstr(str)
        this.r = color.r
        this.g = color.g
        this.b = color.b
        this.a = color.a
      }
  
    // If 3 or 4 number arguments are passed, assign them directly
    } else if (args.length === 3 || args.length === 4) {
      const [r, g, b, a = 1] = args
  
      // Ensure r, g, b, and a are within valid bounds
      this.r = Math.min(255, Math.max(0, r))
      this.g = Math.min(255, Math.max(0, g))
      this.b = Math.min(255, Math.max(0, b))
      this.a = Math.min(1, Math.max(0, a)) // Alpha is between 0 and 1
    } else {
      throw new Error('Invalid arguments for Color constructor')
    }
  }
  
  
  static fromHex(str){
    const hexStr = str.replace("#","").replace(/\s/g, "")

    let r, g, b, a = 1

    if (hexStr.length === 6) {
      // Parse RGB (#RRGGBB)
      r = parseInt(hexStr.substring(0, 2), 16)
      g = parseInt(hexStr.substring(2, 4), 16)
      b = parseInt(hexStr.substring(4, 6), 16)
    }else if (hexStr.length === 3) {
      // Parse abbreviated RGB (#RGB)
      r = parseInt(hexStr[0] + hexStr[0], 16)
      g = parseInt(hexStr[1] + hexStr[1], 16)
      b = parseInt(hexStr[2] + hexStr[2], 16)
    } else if (hexStr.length === 8) {
      // Parse RGBA (#RRGGBBAA)
      r = parseInt(hexStr.substring(0, 2), 16)
      g = parseInt(hexStr.substring(2, 4), 16)
      b = parseInt(hexStr.substring(4, 6), 16)
      a = parseInt(hexStr.substring(6, 8), 16) / 255
    }else if (hexStr.length === 4) {
      // Parse abbreviated RGBA (#RGBA)
      r = parseInt(hexStr[0] + hexStr[0], 16)
      g = parseInt(hexStr[1] + hexStr[1], 16)
      b = parseInt(hexStr[2] + hexStr[2], 16)
      a = parseInt(hexStr[3] + hexStr[3], 16) / 255
    } else {
      throw new Error("Invalid hex format. Expected #RRGGBB or #RRGGBBAA.")
    }

    return new Color(r, g, b, a)

  }

  static fromRGB(str){

    const rgbStr = str.replace(/rgba?\(/, "").replace(")", "").replace(/\s/g, "")
    const values = rgbStr.split(",").map(Number)

    if (values.length === 3) {
      // RGB
      return new Color(values[0], values[1], values[2])
    } else if (values.length === 4) {
      // RGBA
      return new Color(values[0], values[1], values[2], values[3])
    } else {
      throw new Error("Invalid RGB(A) format. Expected rgb(255, 255, 255) or rgba(255, 255, 255, 1).")
    }


  }

  static fromHSV(h,s,v){
    const calculateRGBComponent = (n, h, s, v) => {
      const k = (n + h / 60) % 6
      const componentValue = v - v * s * Math.max(Math.min(k, 4 - k, 1), 0)
      return Math.round(componentValue * 255)
    }
  
    const colorInstance = new this()
    colorInstance.r = calculateRGBComponent(5, h, s, v)
    colorInstance.g = calculateRGBComponent(3, h, s, v)
    colorInstance.b = calculateRGBComponent(1, h, s, v)

    return colorInstance
  }

  static fromHSVstr(hsvString) {
    // Regular expression to match the "hsv(h, s, v)" format
    const regex = /^hsv\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)$/
    const match = hsvString.match(regex)
  
    if (!match) {
      throw new Error("Invalid format. Expected 'hsv(h, s, v)'")
    }
  
    // Parse the HSV values from the matched groups
    const h = parseFloat(match[1])
    const s = parseFloat(match[2])
    const v = parseFloat(match[3])
  
    // Call the fromHSV method to set the RGB values
    return this.fromHSV(h, s, v)
  }


  static fromHSL(h, s, l) {
    // Helper function to calculate the RGB components based on HSL
    const calculateRGBComponent = (n, h, s, l) => {
      const C = (1 - Math.abs(2 * l - 1)) * s
      const X = C * (1 - Math.abs((h / 60) % 2 - 1))
      const m = l - C / 2
  
      let r, g, b
      if (n === 0) {
        r = C, g = X, b = 0
      } else if (n === 1) {
        r = X, g = C, b = 0
      } else if (n === 2) {
        r = 0, g = C, b = X
      } else if (n === 3) {
        r = 0, g = X, b = C
      } else if (n === 4) {
        r = X, g = 0, b = C
      } else {
        r = C, g = 0, b = X
      }
  
      return [
        Math.round((r + m) * 255),
        Math.round((g + m) * 255),
        Math.round((b + m) * 255)
      ]
    }
  
    const colorInstance = new this()
    const [r, g, b] = calculateRGBComponent(Math.floor(h / 60) % 6, h, s, l)
    colorInstance.r = r
    colorInstance.g = g
    colorInstance.b = b
  
    return colorInstance
  }
  
  static fromHSLstr(hslString) {
    // Regular expression to match the "hsl(h, s, l)" format
    const regex = /^hsl\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)$/
    const match = hslString.match(regex)
  
    if (!match) {
      throw new Error("Invalid format. Expected 'hsl(h, s, l)'")
    }
  
    // Parse the HSL values from the matched groups
    const h = parseFloat(match[1])
    const s = parseFloat(match[2])
    const l = parseFloat(match[3])
  
    // Call the fromHSL method to set the RGB values
    return this.fromHSL(h, s, l)
  }


  static #getRandomNumber(value, n = 100) {
    if (typeof value === 'number') {
      return value
    } else if (Array.isArray(value)) {
      const [min, max] = value
      return Math.floor(Math.random() * (max - min + 1)) + min
    } else {
      return Math.floor(Math.random() * n)
    }
  }

  static randomHSL(sat = undefined, light = undefined, hue = undefined) {
    const h = this.#getRandomNumber(hue, 360) // H should be between 0 and 360
    const s = this.#getRandomNumber(sat, 100) // S should be between 0 and 100
    const l = this.#getRandomNumber(light, 100) // L should be between 0 and 100

    return new this.fromHSL(h, s / 100, l / 100) // Convert to RGB values
  }

  static randomHSV(sat = undefined, val = undefined, hue = undefined) {
    const h = this.#getRandomNumber(hue, 360) // H should be between 0 and 360
    const s = this.#getRandomNumber(sat, 100) // S should be between 0 and 100
    const v = this.#getRandomNumber(val, 100) // V should be between 0 and 100

    return new this.fromHSV(h, s / 100, v / 100) // Convert to RGB values
  }


  static random() {
    const colorInstance = new this()
    colorInstance.r = this.#getRandomNumber(undefined, 255)
    colorInstance.g = this.#getRandomNumber(undefined, 255)
    colorInstance.b = this.#getRandomNumber(undefined, 255)

    return colorInstance
  }






  isDark(){
    // Calculate brightness using the YIQ formula
    const brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1000
        
    // Return white for dark colors and black for bright colors
    return brightness < 128
  }

  isLight(){
    return !this.isDark()
  }


  getContrastColor() {
    return this.isDark()? new Color(255, 255, 255) : new Color(0, 0, 0) 
  }

  get rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }
  
  get hex() {
    const toHex = (value) => {
      const hex = value.toString(16).padStart(2, '0')
      return hex.toUpperCase()
    }
    return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`
  }

}