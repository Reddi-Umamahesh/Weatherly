let url = "http://api.weatherapi.com/v1/current.json?key=264dc6dbc12f49c0a0a103449243001&q=";
let url2 = "https://api.giphy.com/v1/gifs/search?q=weather+";
let image = document.querySelector('img');
let src;
let loc = document.querySelector('input');


let p = document.querySelector('p');
let search = document.querySelector('.search');
let list = document.querySelector('ul');
let er = document.querySelector('.error');
let main = document.querySelector('.data');
let info;
let data;
let humidity = document.createElement('li');
let day = document.createElement('li');
let lastupdated = document.createElement('li');
let temp_c = document.createElement('li');
let temp_f = document.createElement('li');
let wind_dir = document.createElement('li');
let wind = document.createElement('li');
let climate = document.createElement('li');
let precip = document.createElement('li');
let cloud = document.createElement('li');
let con = document.querySelector('.con');
let city = document.querySelector('.city');
let time = document.querySelector('.time');
let zone = document.querySelector('.zone');
let gify = document.querySelector('.giphy');


search.addEventListener('click',async()=>{
    image.src = '';
    er.innerText = '';
    
    console.log("button clicked");
    info = await getInfo(loc.value);
    console.log(info.data);
    let temp = info.data;
    data = temp.current;
    console.log(data);
    let location = temp.location;
    let cond= data.condition;
    
    city.innerText = location.name;
    con.innerText = `,${location.country}`;
    zone.innerText = `[tz:${location.tz_id}]`;
    time.innerText = `(${location.localtime})`;

    let ch = document.createElement('li');
    temp_c.innerText = `Temperature: ${data.temp_c} C* [${data.temp_f} fh]`;
  
    humidity.innerText = `Humidity: ${data.humidity} `;
    wind_dir.innerText = `Wind Direction: ${data.wind_kph}kmph ${data.wind_dir} `;
    climate.innerText = `Condition: ${cond.text}`;
    cloud.innerText = `Cloud: ${data.cloud}`;
    precip.innerText = `Precip: ${data.precip_in}`;
    getgiphy(cond.text);
    list.appendChild(climate);
    list.appendChild(temp_c);
    list.appendChild(cloud);
    list.appendChild(precip);
    list.appendChild(humidity);
    list.appendChild(wind_dir);


})
// &api_key=RT3ULR4Xjd45iKauqZ93dLCYe5xhOVZG&limit=2
async function getgiphy(condition){
    try {
        if(condition=='Partly cloudy'){
            condition = 'clouded';
        }
        let u = `${condition}&api_key=RT3ULR4Xjd45iKauqZ93dLCYe5xhOVZG&limit=2`
        let img = await axios.get(url2+u);
        console.log(img);
        let d1 = img.data;
        let data = d1.data;
        let imgs  = data[0].images;
        let org = imgs.original;
        src = org.url;
        console.log(src.toString());
        image.src = src;
    } catch (error) {
        console.log(error);
    }
}

async function getInfo(loc){
    try {
        let info = await axios.get(url+loc)
        return info;
    } catch (Error) {
        list.innerText = '';
        city.innerText = '';
        con.innerText = '';
        time.innerText = '';
        zone.innerText = '';
        er.innerHTML = `<b>Area not found please try another one</b>`
        ;
    }
}