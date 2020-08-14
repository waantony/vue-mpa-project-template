/* 全局验证正则及验证规则 */

/**
 * 全局正则 ------------------------------------------------------------------
 */

// 纯数字验证
export const integerRegExp = /^\d+$/u

// 用户名正则
export const usernameRegExp = /^[a-zA-Z0-9]{4,20}$/u

// 密码正则
export const passwordRegExp = /^[a-zA-Z0-9]{6,}$/u

// 手机号正则
export const mobileRegExp = /^1[3456789]\d{9}$/u

// 邮箱格式正则
export const emailRegExp = /^\S+@\w+(?<host>[-.]\w+)*\.\w+(?<level>[-.]\w+)*$/u

// 中文正则
export const chineseRegExp = /^[\u4e00-\u9fa5]+$/u

/**
 * 通用验证规则 ------------------------------------------------------------------
 */

// 必填验证
export const requiredRule = Object.freeze({ required: true, message: '不能为空', trigger: 'blur' })

// 纯数字验证
export const integerRule = Object.freeze({ pattern: integerRegExp, message: '只接受数字', trigger: 'blur' })

// 手机号格式验证
export const mobileRule = Object.freeze({ pattern: mobileRegExp, message: '请输入正确的手机号', trigger: 'blur' })

// 密码格式验证
export const passwordRule = Object.freeze({ pattern: passwordRegExp, message: '字母或数字，至少6位', trigger: 'blur' })

// 用户名格式验证
export const usernameRule = Object.freeze({ pattern: usernameRegExp, message: '字母或数字，4~20位', trigger: 'blur' })

// 邮箱格式验证
export const emailRule = Object.freeze({ pattern: emailRegExp, message: '请输入正确的邮箱', trigger: 'blur' })

// 中文姓名验证
export const chineseRule = Object.freeze({ pattern: chineseRegExp, message: '请输入中文姓名', trigger: 'blur' })

// 通用正则验证函数
export const patternvalidator = reg => value => reg.test(value)

/**
 * vant 验证规则 ------------------------------------------------------------------
 */

// 纯数字
export const integerRuleVant = Object.freeze({ validator: patternvalidator(integerRegExp), message: '只能输入纯数字' })
