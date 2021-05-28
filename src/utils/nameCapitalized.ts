export function nameCapitalized(name: string): string {
  return `${name.charAt(0).toUpperCase()}${name.substr(1)}`
}