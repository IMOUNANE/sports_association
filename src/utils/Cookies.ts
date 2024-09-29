export function setCookie(name: string, value: string, duration = 604800) {
	document.cookie = `${name}=${value}; Max-Age=${duration}; path=/; SameSite=Lax`;
}



