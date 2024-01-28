export default (string) => {
  const spaced = string.replace(/([A-Z])/g, ' $1')
  const withFirstLetterUpperCased = spaced.replace(/^./, (letter) => letter.toUpperCase())
  return withFirstLetterUpperCased
}
