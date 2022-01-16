

export const phonedes = (value) => value ? value.replace(/(\d{3})\d*(\d{4})/, '$1****$2') : ''
export const carddes = (value) => value ? value.replace(/^(.{1})(?:\w+)(.{1})$/, "\$1****************\$2") : ''
export const addrdes = (value) => {
    let tempaddr = value.match(/.+?(省|市|自治区|自治州|盟)/g)?.join('')
    return (tempaddr && tempaddr + "***") || value

}
export const bankdes = (value) => {
    let bankId = ''
    if (value.length === 16) {
        bankId = value.substring(0, 3) + "********" + value.substring(12, value.length);
    } else if (value.length === 17) {
        bankId = value.substring(0, 3) + "*********" + value.substring(13, value.length);
    } else if (value.length === 18) {
        bankId = value.substring(0, 3) + "**********" + value.substring(14, value.length);
    }
    else if (value.length === 19) {
        bankId = value.substring(0, 3) + "***********" + value.substring(15, value.length);
    }
    return bankId || value;
}
export const namedes = (name) => {
    let userName = "";
    if (name.length === 2) {
        userName = name.substring(0, 1) + "*"; //截取name 字符串截取第一个字符，
    } else if (name.length === 3) {
        userName = name.substring(0, 1) + "**"
    } else if (name.length > 3) {
        userName =
            name.substring(0, 1) + "*" + "*" + name.substring(3, name.length); //截取第一个和大于第4个字符
    }
    return userName || name;
}