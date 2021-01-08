let myMap = L.map('mapid').setView([51.505, -0.09], 13)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoib2x1d2FzZXlpMSIsImEiOiJja2V2eXhyOW4xdTBsMnduMGoyYTcyaTRwIn0.ERCgBbMvExyRSDh991amwA'
}).addTo(myMap);

const ctaBtn = document.querySelector('.cta-btn')
ctaBtn.addEventListener('click', checkIpAddress)
class GetIpAddress{
    api_key = 'at_i7kFwYf8ZCGWRa3RJWWF0ThX6R9pZ';
    async getIp(){
        let ipAddress = document.querySelector('.ip-address').value
        const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_i7kFwYf8ZCGWRa3RJWWF0ThX6R9pZ&ipAddress=${ipAddress}`, 
        {
            "method": "GET",
        })
        const responseJSON = await response.json()
        return responseJSON;
    }

}

function checkIpAddress(){
    const getIpAddress = new GetIpAddress()

    const ip = document.querySelector('.ip')
    const location = document.querySelector('.location')
    const timezone = document.querySelector('.timezone')
    const isp = document.querySelector('.isp')
    getIpAddress.getIp().then((res) => {
        console.log(res)
       
        ip.textContent = res.ip
        location.textContent = `${res.location.region}, ${res.location.country}`
        timezone.textContent = res.location.timezone
        isp.textContent = res.isp
        

    }).catch((err) => {
        console.log(err)
    })
}