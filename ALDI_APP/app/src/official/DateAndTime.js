
function DateAndTime(){
    const d = new Date()
    const weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const day = weekDay[d.getDay()]
    const month = months[d.getMonth()]
    const date = d.getDate()
    const year = d.getFullYear()

    return(
        <div>
            <div className="date-show">
                <p>{date} {month},{year}</p>
            </div>
        </div>
    )
}

export default DateAndTime;