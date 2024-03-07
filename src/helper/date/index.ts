class DateTime extends Date {
  constructor() {
    super();
  }
  getNowTime() {
    const date = this.getDate();
    const year = this.getFullYear();
    const month = this.getMonth();
    const hour = this.getHours();
    const min = this.getMinutes();
    const second = this.getSeconds();

    return `${year}-${month + 1}-${date}${hour}:${min}:${second}`;
  }
}

export default DateTime;
