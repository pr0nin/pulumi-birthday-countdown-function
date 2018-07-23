export function countDaysToBirthDay(queries: {[key: string]: any}): string {
    let birthdate : string = "";

    for (let key in queries){
        if(key === "birthday"){
            birthdate = queries["birthday"];
        }
    }

    if(!birthdate || birthdate && birthdate.split("-").length !== 3){
        return getBirthdayForm();
    }
    
    let [_year, _month, _dayAndTime] = birthdate.split("-");

    let year = +_year;
    let month = +_month -1;
    let _day = _dayAndTime.split("T")[0]
    let day = +_day;

    if(_year.length !== 4 || _month.length !== 2 || _day.length !== 2){
        return getBirthdayForm();
    }

    let today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (today.getMonth() > month ||
        today.getMonth() == month && today.getDate() > day) {
        year = today.getFullYear() + 1; 
    } else {
        year = today.getFullYear();
    }

    let ticks = +(today) - +(new Date(year, month, day));
    let days = Math.abs(ticks / (60 * 60 * 24 * 1000)).toFixed(); 

    if (+days === 0) {
        return "<h1>Gratulerer med dagen!</h1>";
    }

    return `<p>Det er <em>${days} dag(er)</em> igjen til du har bursdag.</p>`;
}

export function getBirthdayForm(): string {
    return `<form method="GET" action="/api/fn"><input type="date" name="birthday"><input type="submit" value="Regn ut antall dager til bursdag"></form>`;
}