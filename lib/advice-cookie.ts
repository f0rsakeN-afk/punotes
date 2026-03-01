const COOKIE_NAME = "advice_seen";
const THREE_DAYS = 3 * 24 * 60 * 60;

export function setAdviceCookie() {
  document.cookie = `${COOKIE_NAME}=1; max-age=${THREE_DAYS}; path=/; SameSite=Lax`;
}

export function isAdviceDue(): boolean {
  if (typeof document === "undefined") return false;
  return !document.cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
}
