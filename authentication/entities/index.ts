import ipRegex from 'ip-regex'
import buildMakeUser from './user'
import buildMakeSource from './source'
import { makeDecryption } from './passwordEncryption'
import bcrypt from "bcrypt";

const makeSource = buildMakeSource({ isValidIp })
const encryptPassword = makeDecryption({bcrypt})
const makeUser = buildMakeUser({ makeSource, encryptPassword, isValidEmail })

export default makeUser

function isValidIp (ip: string): boolean {
  return ipRegex({ exact: true }).test(ip)
}

function isValidEmail(email: string) {
  const EMAIL_REGEX = new RegExp('[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*')
  return EMAIL_REGEX.test(email);
}

