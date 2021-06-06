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
      if (str) {
        for (let i = 0; i < str.length; i++) {
          const h = str.charCodeAt(i)
          arr[i] = h.toString(16)
        }
        arr.forEach(num => {
          const r = num.length >= 4 ? num : new Array(4 - num.length + 1).join('0') + num
          hexStr.push(r.toUpperCase())
        })
        return hexStr.join('')
      }
    }
  }
}
