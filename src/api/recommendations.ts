export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const getPrice = (n: number) =>
  n === 0 ? "free" : "requires an investment";
export const decapitalize = (s: string) => {
  const splitted = s.split("")
  const firstLetter = splitted[0].toLowerCase()
  splitted.shift()
  splitted.unshift(firstLetter)
  return splitted.join("")
}