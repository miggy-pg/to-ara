export function trimSentence(sentence, maxLength) {
  if (sentence.length > maxLength) {
    return sentence.substring(0, maxLength - 3) + "...";
  }
  return sentence;
}
