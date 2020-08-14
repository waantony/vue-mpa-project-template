import { getType } from './index.js'

// 将字符串、数字转为 Date 类型，Date 类型直接返回
export const parseToDate = val => {
  const whichType = getType(val)
  if (whichType === 'Number') {
    if (!/\d{13,}/u.test(val)) {
      val *= 1000
    }
    return new Date(val)
  }
  if (whichType === 'String') {
    return new Date(val.replace(/-/gu, '/').replace(/T/gu, ' ').replace(/\..*/gu, ''))
  }
  if (whichType === 'Date') {
    return val
  }
  return null
}

/**
 * 格式化一个日期，YYYY, MM, DD, hh, mm, ss 以外的字符将保留
 *
 * @param { number | Date | string } val 要格式化的日期
 * @param { string | 'date' | 'time' } format 需要格式化的格式，`YYYY` 年，2 或 4 位，`MM，DD，hh，mm，ss` 分别 1 或 2 位
 * @returns { string } 返回转换后的字符串
 * @example
 * dateToString(new Date(), 'YYYY-MM-DD hh:mm:ss') // 2020-07-09 17:11:09
 * dateToString(new Date(), 'YY-M-D h:m:s') // 20-7-9 17:11:9
 * dateToString(new Date(), 'YYYY年MM月DD日 hh时mm分ss秒') // 2020年07月09日 17时11分09秒
 * dateToString(new Date(), 'YY年M月D日 h时m分s秒') // 20年7月9日 17时11分9秒
 */
export const dateToString = (val = new Date(), format = 'YYYY-MM-DD hh:mm:ss') => {
  const date = parseToDate(val)
  if (!date) {
    return ''
  }
  if (format === 'date') {
    format = 'YYYY-MM-DD'
  }
  if (format === 'time') {
    format = 'hh:mm:ss'
  }
  // 年 单独处理
  format = format.replace(/Y+/u, match => {
    const Y = `${date.getFullYear()}`
    return match && match.length >= 4 ? Y : Y.slice(2)
  })
  // 月日时分秒 统一处理
  const obj = {
    '(M+)': date.getMonth() + 1,
    '(D+)': date.getDate(),
    '(h+)': date.getHours(),
    '(m+)': date.getMinutes(),
    '(s+)': date.getSeconds(),
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      format = format.replace(new RegExp(key, 'u'), match => {
        const v = obj[key]
        return match && match.length >= 2 ? v >= 10 ? v : `0${v}` : obj[key]
      })
    }
  }
  return format
}

// 将日期转换为 年月 'YYYY-MM'
export const yearMonthParse = (val, icon = '-') => {
  const datetime = parseToDate(val)
  if (!datetime) {
    return val
  }
  const y = datetime.getFullYear()
  let m = datetime.getMonth() + 1
  m = m >= 10 ? m : `0${m}`
  const result = `${y}${icon}${m}`
  return result
}

// 将日期转换为字符串 年月日 'YYYY-MM-DD'
export const dateParse = (val, icon = '-') => {
  const datetime = parseToDate(val)
  if (!datetime) {
    return val
  }
  const y = datetime.getFullYear()
  let m = datetime.getMonth() + 1
  m = m >= 10 ? m : `0${m}`
  let d = datetime.getDate()
  d = d >= 10 ? d : `0${d}`
  const result = `${y}${icon}${m}${icon}${d}`
  return result
}

// 将日期转为字符串 'YYYY-MM-DD hh:mm:ss'
export const datetimeParse = (val, icon = '-') => {
  const datetime = parseToDate(val)
  if (!datetime) {
    return val
  }
  const y = datetime.getFullYear()
  let m = datetime.getMonth() + 1
  m = m >= 10 ? m : `0${m}`
  let d = datetime.getDate()
  d = d >= 10 ? d : `0${d}`
  let h = datetime.getHours()
  h = h >= 10 ? h : `0${h}`
  let mi = datetime.getMinutes()
  mi = mi >= 10 ? mi : `0${mi}`
  let s = datetime.getSeconds()
  s = s >= 10 ? s : `0${s}`
  const result = `${y}${icon}${m}${icon}${d} ${h}:${mi}:${s}`
  return result
}

// 获取某个日期是星期几
export const weekParse = (val, full = true) => {
  const datetime = parseToDate(val)
  if (!datetime) {
    return val
  }
  const weekday = datetime.getDay()
  const arr = ['日', '一', '二', '三', '四', '五', '六']
  const result = `${full ? '星期' : ''}${arr[weekday]}`
  return result
}

// 获取某个日期属于第几个季度
export const seasonParse = val => {
  const datetime = parseToDate(val)
  if (!datetime) {
    return val
  }
  const season = Math.floor((datetime.getMonth() + 3) / 3)
  return season
}

// 判断一个时间是多久之前 比如：'刚刚', '5分钟前'
export const howLongAgo = val => {
  const datetime = parseToDate(val)
  if (!datetime) {
    return ''
  }
  const now = Date.now()
  const diff = (now - +datetime) / 1000

  if (diff < 60) {
    return '刚刚'
  }
  if (diff < 60 * 60) {
    return `${Math.floor(diff / 60)}分钟前`
  }
  if (diff < 60 * 60 * 24) {
    return `${Math.floor(diff / 60 / 60)}小时前`
  }
  if (diff > 60 * 60 * 24 * 1) {
    return `${Math.floor(diff / 60 / 60 / 24)}天前`
  }
  return ''
}

/**
 * 获取未来或过去的某一天，可选获取那一天的开始，结束，默认为获取当时。可选时间戳。
 * @param { Number } count 未来多少天(正整数)，过去多少天(负整数)
 * @param { String } period 目标日的开始或结束，默认为当时
 * @param { Boolean } isTimeStamp 是否返回时间戳
 * @returns { Date | Number } 返回日期对象或时间戳
 * @example
 * getSomeDay(7, undefined, true)
 */
export const getSomeDay = (count, period, isTimeStamp = false) => {
  const whichType = getType(count)
  if (whichType !== 'Number') {
    return ''
  }
  const now = Date.now()
  const dayTimeStamp = now + (count * 1000 * 60 * 60 * 24)
  const result = new Date(dayTimeStamp)
  if (period === 'start') {
    result.setHours(0, 0, 0, 0)
  } else if (period === 'end') {
    result.setHours(23, 59, 59, 999)
  }
  return isTimeStamp ? +result : result
}

/**
 * 获取步进时间，上/下 一 天/周/月
 * @param { 'day' | 'week' | 'month' } stepType 步进时间为 天/周/月/
 * @param { Number } step 步进大小，正数为【下X天/周/月/】，负数为【上X天/周/月/】
 * @param { Number | String | Date } startTime 开始时间
 * @returns { Date } 返回日期对象或时间戳
 * @example
 * getStepDate('day', -1)
 * getStepDate('week', 2, '2020-01-01')
 */
export const getStepDate = (stepType, step, startTime = new Date()) => {
  startTime = new Date(+parseToDate(startTime))
  if (stepType === 'day') {
    const targetDay = startTime.getDate() + step
    return new Date(startTime.setDate(targetDay))
  }
  if (stepType === 'week') {
    const targetDay = startTime.getDate() + (step * 7)
    return new Date(startTime.setDate(targetDay))
  }
  if (stepType === 'month') {
    const targetMonth = startTime.getMonth() + step
    return new Date(startTime.setMonth(targetMonth))
  }
  return null
}

/**
 * 获取开始时间到结束时间的剩余时间的字符串，可以选择长度
 * @param { Number | String | Date } endTime 结束时间
 * @param { Number | String | Date } startTime 开始时间，默认为当前时间
 * @param { Number } strLength 倒计时长度，1：秒，2：分秒，3：时分秒，4：天时分秒
 * @returns { String } 返回字符串 xx天xx时xx分xx秒
 * @example
 * getRemainingTime('2020-01-01 10:30:00', undefined, 3)
 *
 */
// eslint-disable-next-line max-statements
export const getRemainingTime = (endTime, startTime = new Date(), strLength = 4) => {
  endTime = parseToDate(endTime)
  startTime = parseToDate(startTime)
  if (!endTime || !startTime) {
    return ''
  }
  let restTimestamp = endTime - startTime // 1000 * 60 * 60 * 24
  if (restTimestamp < 999) {
    return (strLength >= 4 ? '00天' : '')
      + (strLength >= 3 ? '00时' : '')
      + (strLength >= 2 ? '00分' : '')
      + (strLength >= 1 ? '00秒' : '')
  }
  let ss = null, mm = null, hh = null, DD = null
  if (strLength >= 4) {
    const levelTimestamp = 1000 * 60 * 60 * 24
    DD = Math.floor(restTimestamp / levelTimestamp)
    DD < 10 && (DD = `0${DD}`)
    restTimestamp %= levelTimestamp
  }
  if (strLength >= 3) {
    const levelTimestamp = 1000 * 60 * 60
    hh = Math.floor(restTimestamp / levelTimestamp)
    hh < 10 && (hh = `0${hh}`)
    restTimestamp %= levelTimestamp
  }
  if (strLength >= 2) {
    const levelTimestamp = 1000 * 60
    mm = Math.floor(restTimestamp / levelTimestamp)
    mm < 10 && (mm = `0${mm}`)
    restTimestamp %= levelTimestamp
  }
  if (strLength >= 1) {
    const levelTimestamp = 1000
    ss = Math.floor(restTimestamp / levelTimestamp)
    ss < 10 && (ss = `0${ss}`)
    restTimestamp %= levelTimestamp
  }
  return (DD ? `${DD}天` : '') + (hh ? `${hh}时` : '') + (mm ? `${mm}分` : '') + (ss ? `${ss}秒` : '')
}
