export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1));
    } catch (e) {
      console.warn('Skipping parse error');
    }
  }
  return value;
}
