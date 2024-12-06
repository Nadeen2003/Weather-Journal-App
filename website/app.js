/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const myApi = '0962d871945d7ef5b3e916c1d3f11e42&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

const getroute = async (baseURL, zip, myApi) => {
    const response = await fetch(baseURL+zip+'&appid='+myApi);
    try {
        const data  = await response.json();
        return data;
    } catch (error) {
        console.log('error'+error);
    }
}

const postroute = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  try {
    const newdata = await response.json();
    return newdata;
  }catch (error){
    console.log('error',error);
  }
};


const retrieveData  = async () =>{
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = allData.content;
    document.getElementById('date').innerHTML =allData.date;
  }catch (error){
    console.log("error", error);
  }
};


function Generate() {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  
  getroute(baseURL, zip, myApi)
  .then(function (tempdata) {
    const temp = tempdata.main.temp;
    postroute('/add', { date: newDate, temp: temp, content: content });
  })
  .then(retrieveData)
}
  

document.getElementById('generate').addEventListener('click', Generate);
