import regex from './regex'

const matchUrl = (value, regex) =>
  value ? value.search(regex) !== -1 : value === null

export default {
  urlValidator: value => matchUrl(value, regex.urlRegex)
}
