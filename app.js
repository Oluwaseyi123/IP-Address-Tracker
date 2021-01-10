let latitude;
let longitude;
let myMap = L.map('mapid');
function showMap(){
    myMap.setView([latitude, longitude], 13)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: false,
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
         zoomOffset: -1,
         accessToken: config.MY_API_TOKEN
    }).addTo(myMap);

    L.marker([latitude, longitude]).addTo(myMap);  
 }

class GetIpAddress{
      api_key = config.SECRET_API_KEY;
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
function displayInfo(res){
    const ip = document.querySelector('.ip')
    const location = document.querySelector('.location')
    const timezone = document.querySelector('.timezone')
    const isp = document.querySelector('.isp')
    ip.textContent = res.ip
    location.textContent = `${res.location.region}, ${res.location.country}`
    timezone.textContent = res.location.timezone
    isp.textContent = res.isp
}
function checkIpAddress(){
    const getIpAddress = new GetIpAddress()
    getIpAddress.getIp().then( res => {
        let ipAddress = document.querySelector('.ip-address')
       
        longitude = res.location.lng
        latitude = res.location.lat
        displayInfo(res)
        showMap()
        ipAddress.value = ''
        
    }).catch((err) => {
        console.log(err)
    })
}
checkIpAddress()

const ctaBtn = document.querySelector('.cta-btn').addEventListener('click', checkIpAddress)

