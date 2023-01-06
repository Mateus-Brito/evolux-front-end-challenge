import { serialize, parse } from 'cookie'
import { isProduction } from '@utils/index'

const MAX_AGE = 60 * 60 * 10 // 10 hours

export function setCookie(res, cookieName, value, maxAge = MAX_AGE) {
  const cookie = serialize(cookieName, value, {
    maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function removeCookie(res, cookieName) {
  const cookie = serialize(cookieName, '', {
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export function getCookie(req, cookieName) {
  const cookies = parseCookies(req)
  return cookies[cookieName]
}
