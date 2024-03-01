function bufferToString(cipherTextList) {
  return cipherTextList.map((item) => {
    if (typeof item === 'string') {
      return item;
    } else {
      return item.toString('hex');
    }
  });
}

export default bufferToString;
