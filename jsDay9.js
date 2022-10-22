const express= require('express');
const app= express();
const jwt = require('jsonwebtoken');



app.use((req,res,next)=>{
  res.setHeader('Content-Type','text/html');
  next();
});


function kodeToken()
{ return jwt.sign({
  data: 'foobar'
}, 'secret', { expiresIn: 60 * 60 })


};

function authentakasi(req,res,next){
let savetoken=req.headers.authorization.split(' ')[1];
  
 jwt.verify(savetoken, 'secret');
next ();

}

app.get('/login', (req, res) => {
 
  const tokenn = kodeToken();
  res.json(tokenn);
});
app .use (authentakasi)

app.get('/' ,(req, res) => {
    
   
  res.send(songSheeran(songList));
})

app.get('/songList' ,(req, res) => {
    
   
    res.send(songSheeran(songList));
  })

 

  app.get('/genre',(req, res) => {
    
    res.send(genreS(songL));
  });

  app.get('/playlist', (req, res) => {
    
  
    res.send(songLe(songL));
  })

let arrayKali=[];
let tmbhUnder=0;

tmbh=0;
let minutesLess=10;
let songList;
songList=[
    {artis:"Ed Sheeren",albumSong:"Joker",nameSong:"The Joker and The Queen",genre:"POP",rilis:"11 Maret 2021",timePlaying:7,priceSong:300000},
    {artis:"Kendrick Lamar",albumSong:"Joker",nameSong:"DNA",genre:"RAP",rilis:"12 Februari 2022",timePlaying:2,priceSong:600000},
    {artis:"Alan Walker",albumSong:"Joker",nameSong:"Alone",genre:"EDM",rilis:"12 Februari 2010",timePlaying:10,priceSong:500000},
    {artis:"Alan Walker",albumSong:"Joker",nameSong:"Unity",genre:"EDM",rilis:"12 Desember 2022",timePlaying:10,priceSong:500000},
    {artis:"Travis Scott",albumSong:"Astro World",nameSong:"Sicko Mode",genre:"RAP",rilis:"12 Februari 2010",timePlaying:4,priceSong:500000},
    {artis:"Alan Walker",albumSong:"Joker",nameSong:"One my way",genre:"EDM",rilis:"12 Februari 2010",timePlaying:10,priceSong:500000},
    {artis:"Alan Walker",albumSong:"Joker",nameSong:"Darkside",genre:"EDM",rilis:"12 Februari 2015",timePlaying:16,priceSong:500000},
    {artis:"Taylor Swift",albumSong:"Joker",nameSong:"Red",genre:"POP",rilis:"12 Februari 2016",timePlaying:20,priceSong:500000},
    {artis:"Taylor Swift",albumSong:"Joker",nameSong:"Belong me",genre:"POP",rilis:"12 Februari 2010",timePlaying:30,priceSong:500000},
    {artis:"Logic",albumSong:"Joker",nameSong:"Soul food",genre:"RAP",rilis:"12 Februari 2016",timePlaying:40,priceSong:500000},

    ];
let songL=[...songList];

function songSheeran(songList)
{
    
        let singer=songL.filter(nyanyi=>nyanyi.artis=="Ed Sheeren")
        console.log("+------------------------------------------------+");
        console.log("| Artist:")
        console.log("+------------------------------------------------+");
        console.log(singer);

    return singer;

}

function genreS(songL)
{

    let tipe=songL.filter(ganra=>ganra.genre=="EDM")
    console.log("+------------------------------------------------+");
    console.log("| Genres:")
    console.log("+------------------------------------------------+");
    console.log(tipe);

    return tipe;
}



function songLe(songL)
{

    console.log ('display under ...minutes');


    let kaliUnder;
    let minFilter= songL.filter(timesFilter=>timesFilter.timePlaying<minutesLess);
    for( let z=0;z<minFilter.length;z++)
  {
    kaliUnder=60*minFilter[z].timePlaying;
    arrayKali.push(kaliUnder);
    
  }
  for (let y=0;y<arrayKali.length;y++)
  {
    tmbhUnder+=arrayKali[y];
  }
 
    console.log('times under:',minFilter);
    let spreadUnder=[...minFilter, {time_total: tmbhUnder }]

        
    return spreadUnder;
}

songLe(songL);



app.listen(6000);

