export default {
  data () {
    return {
      //
    }
  },
  mounted () {
    //
  },
  methods: {
    encodeUTF16 (str) {
      const arr = []
      const hexStr = []
      for (let i = 0; i < str.length; i++) {
        arr[i] = str.charCodeAt(i)
      }
      arr.forEach(num => {
        hexStr.push(this.fillZero(this.decToHexStr(num)))
      })
      return hexStr.join('')
    },
    decToHexStr (number) {
      if (number < 0) {
        number = 0xFFFFFFFF + number + 1
      }
      return number.toSring(16).toUpperCase()
    },
    fillzero (str) {
      return str.length >= 4 ? str : new Array(4 - str.length + 1).join('0') + str
    }
  }
}
