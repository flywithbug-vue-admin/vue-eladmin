
export function formatDate(date, fmt) {

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

// 入参是纳秒ns
export function formatTimeDuration(duration) {
  duration = duration / 1000 // µs
  if (duration < 1000) {
    return duration.toFixed(3) + 'µs'
  }
  duration = duration / 1000
  if (duration < 1000) {
    return duration.toFixed(3) + 'ms'
  }
  duration = duration / 1000
  if (duration < 60) {
    return duration.toFixed(3) + 's'
  }
  duration = duration / 60
  return duration.toFixed(3) + 'min'
}

export function timeExpValid(value) {
  const timeNow = new Date()
  if (timeNow.valueOf() > value) {
    return false
  }
  return true
}

// 毫秒
export function formatExpTimeStamp(value) {
  const timeNow = new Date()
  if (timeNow.valueOf() > value) {
    return '0s'
  }
  let secondTime = (value - timeNow.valueOf()) / 1000// 秒
  let minuteTime = 0// 分
  let hourTime = 0// 小时
  if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
    // 获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60)
    // 获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60)
    // 如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      // 获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60)
      // 获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60)
    }
  }
  let result = '' + parseInt(secondTime) + '秒'

  if (minuteTime > 0) {
    result = '' + parseInt(minuteTime) + '分' + result
  }
  if (hourTime > 0) {
    result = '' + parseInt(hourTime) + '小时' + result
  }
  return result
}
