
// Example display: September 4 1986 8:30 PM
export const humanizeDate = (date) => {
    const monthNames = [
        'Jan.',
        'Feb.',
        'March',
        'Apr.',
        'May',
        'June',
        'Jul.',
        'Aug.',
        'Sept.',
        'Oct.',
        'Nov.',
        'Dec.',
    ];

    let minutes = date.getMinutes();
    let hours = date.getHours();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }

    return `${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${hours}:${minutes}`;
};


// Example display: 2005-01-01 00:00:00
export const transDate = (date) => {
    const monthNames = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ];
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let seconds = date.getSeconds()
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `
        ${date.getFullYear()}-${monthNames[date.getMonth()]}-${date.getDate()} 
        ${hours}:${minutes}:${seconds}
    `
}

//[{key1,title1},{key2,title2}]
export const generateList = (data,dataList) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const key = node.key;
      dataList.push({ key, title: node.title });
      if (node.children) {
        generateList(node.children, dataList);
      }
    }
  };