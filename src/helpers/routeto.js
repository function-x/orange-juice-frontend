export default function (context, path, timeout) {
  setTimeout(() => {
    context.$emit('routeTo', path)
  }, timeout || 1000)
}
