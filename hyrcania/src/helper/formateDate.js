const formateDate = (date) => {

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const edate = new Date(Date.parse(date))
    const AMPM = edate.getHours() >= 12 ? 'PM' : 'AM';
    return `${months[edate.getMonth()]}.${edate.getDate()}.${edate.getFullYear()}.${edate.getHours()}:${edate.getMinutes()}.${AMPM}`;

}
export default formateDate;
