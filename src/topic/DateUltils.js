export function beautyDate(dateTime) {
    const strMonth = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม",
        "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    if (dateTime) {
        const str = dateTime.split("T");
        const date = str[0];
        const time = str[1].split(".")[0];

        const tempDate = date.split("-");
        const year = tempDate[0];
        const month = strMonth[tempDate[1] - 1];
        const day = tempDate[2];
        return  day + " " + month + " " + year + " เวลา " + time;
    }

}