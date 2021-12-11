interface BuilMakeSource {
    isValidIp: any
}

export interface MakeSourceParams {
    ip: string;
    browser: string;
    referrer: string;
}

export interface MakeSourceType {
    getIp: () => string;
    getBrowser: () => string;
    getReferrer: () => string;
}

export default function buildMakeSource ({ isValidIp }: BuilMakeSource){
    return function makeSource ({ ip, browser, referrer }: MakeSourceParams): MakeSourceType {
      if (!ip) {
        throw new Error('Comment source must contain an IP.')
      }
      if (!isValidIp(ip)) {
        throw new RangeError('Comment source must contain a valid IP.')
      }
      return Object.freeze({
        getIp: () => ip,
        getBrowser: () => browser,
        getReferrer: () => referrer
      })
    }
  }
  