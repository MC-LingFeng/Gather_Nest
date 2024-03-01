import { chunk } from 'lodash';

function stringToBuffer(encryptionList) {
  return encryptionList.map((item, index) => {
    if (index === 0 || index === encryptionList.length - 1) {
      return item;
    } else {
      const arr = chunk(item.split(''), 2).map((child) =>
        parseInt(child.join(''), 16),
      );
      const uint8Arr = new Uint8Array(arr);
      return Buffer.from(uint8Arr);
    }
  });
}

export default stringToBuffer;
