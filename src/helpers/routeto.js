export default function (context, path, timeout) {
  setTimeout(() => {
    context.$emit('routeTo', path)
  }, timeout === undefined ? 1000 : timeout)
}
