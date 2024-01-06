//backend part

const http=require("http");
const fs= require("fs");
const requests= require("requests");
const homeFile= fs.readFileSync("index.html","utf-8");
const replaceVal= (tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
     temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
     temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
     temperature=temperature.replace("{%location%}",orgVal.name);
     temperature=temperature.replace("{%country%}",orgVal.sys.country);
     temperature=temperature.replace("{%tempStatus%}",orgVal.weather[0].main);

     return temperature;
};
const server = http.createServer((req,res)=>{
    if(req.url=="/")
    {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=e255b1b13339400994c1912cbd664b41')
        .on('data', function (chunk) {
            const objData= JSON.parse(chunk);
            const arrData= [objData];
            const realTimeData = arrData.map((val)=> replaceVal(homeFile,val)).join("");
            res.write(realTimeData);
           
     })
        .on('end', function (err) {
        if (err) return console.log('connection closed due to errors', err);
 
        res.end();
     });
    }
});

server.listen(2000,"127.0.0.1");

