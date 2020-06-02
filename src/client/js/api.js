export default async function addTrip(url = '', data = {}) {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            depCity: data.depCity,
            arrCity: data.arrCity,
            depDateTimestamp: data.depDateTimestamp,
            arrDateTimestamp: data.arrDateTimestamp,
        })
    })

    try {
        const tripData = await req.json();
        return tripData;
      } catch (error) {
        console.log("error", error);
    }
}