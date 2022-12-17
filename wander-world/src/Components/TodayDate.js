
function findDate()
{
    const today = new Date();

    const dateObj = {
        day : today.getDate(),
        month : today.getMonth()+1,
        year : today.getFullYear(),
        time : (today.getHours()<10?'0'+today.getHours():today.getHours())+':'+(today.getMinutes()<10?'0'+today.getMinutes():today.getMinutes())+':'+(today.getSeconds()<10?'0'+today.getSeconds():today.getSeconds())
    }

    return dateObj
}


export default findDate




