
// let genreSong;
let songLes;
// let songL;
let da=[];
let sv=[];
let tmbh;
let stm=[];
tmbh=0;
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
    // songList=[
    //     {artis:"Ed Sheeren",albumSong:"Joker",nameSong:"The Joker and The Queen",genre:"POP",rilis:"11 Maret 2021",timePlaying:7,priceSong:300000},
    //     {artis:"Kendrick Lamar",albumSong:"Joker",nameSong:"DNA",genre:"RAP",rilis:"12 Februari 2022",timePlaying:2,priceSong:600000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Alone",genre:"EDM",rilis:"12 Februari 2010",timePlaying:10,priceSong:500000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Unity",genre:"EDM",rilis:"12 Desember 2022",timePlaying:10,priceSong:500000},
    //     {artis:"Travis Scott",albumSong:"Astro World",nameSong:"Sicko Mode",genre:"RAP",rilis:"12 Februari 2010",timePlaying:4,priceSong:500000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Perfect",genre:"EDM",rilis:"12 Februari 2010",timePlaying:10,priceSong:500000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Perfect",genre:"EDM",rilis:"12 Februari 2010",timePlaying:16,priceSong:500000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Perfect",genre:"EDM",rilis:"12 Februari 2010",timePlaying:20,priceSong:500000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Perfect",genre:"EDM",rilis:"12 Februari 2010",timePlaying:30,priceSong:500000},
    //     {artis:"Alan Walker",albumSong:"Joker",nameSong:"Perfect",genre:"EDM",rilis:"12 Februari 2010",timePlaying:40,priceSong:500000},
    
    //     ];
    // let songong=songList;
    //  songL=[...songong];
    //  da.push(songList);

    // let { artis,albumSong,nameSong,rilis,timePlaying,priceSong}=songL;
    
        console.log(" Song List");
        for(let i=0;i<songL.length;i++)
        {
            console.log("+------------------------------------------------+");
            console.log("|"+i+"|"+" Artis Name: "+songList[i].artis+"\n"+
            "+------------------------------------------------+"+"\n"+
            "| Album Name: "+songList[i].albumSong+"\n"+
            "| Name Song: "+songList[i].nameSong+"\n"+
            "| Genres: "+songList[i].genre+"\n"+
            "| Release Date: "+songList[i].rilis+"\n"+
            "| Time Playing: "+songList[i].timePlaying+"\n"+
            "| Price Song:"+songList[i].priceSong);
                // console.log(i+"."+songList[i].artis+songList[i].albumSong+songList[i].nameSong);
        }

        // function checkAdult(artis) {
        //     return artis == "Ed Sheeren";
        //   }
        let singer=songL.filter(nyanyi=>nyanyi.artis=="Ed Sheeren")
        console.log("+------------------------------------------------+");
        console.log("| Artist:")
        console.log("+------------------------------------------------+");
        console.log(singer);

    return songL;

}

songSheeran(songL);

console.log("hasilt: "+songL.length);


console.log("\n");
function genreS(songL)
{

    //  console.log("hasilfun: "+songL.length);
    console.log(" Genres List");
        for(let i=0;i<songL.length;i++)
        {
            console.log("+------------------------------------------------+");
            console.log("|"+i+"|"+" Artis Name: "+songL[i].artis+"\n"+
            "+------------------------------------------------+"+"\n"+
            "| Album Name: "+songL[i].albumSong+"\n"+
            "| Name Song: "+songL[i].nameSong+"\n"+
            "| Genres: "+songL[i].genre+"\n"+
            "| Release Date: "+songL[i].rilis+"\n"+
            "| Time Playing: "+songL[i].timePlaying+"\n"+
            "| Price Song:"+songL[i].priceSong);
        }
    // console.log("hasil: "+genreSong.length);
    let tipe=songL.filter(ganra=>ganra.genre=="EDM")
    console.log("+------------------------------------------------+");
    console.log("| Genres:")
    console.log("+------------------------------------------------+");
    console.log(tipe);
}
console.log('\n');

genreS(songL);

function songLe(songL)
{
      //  console.log("hasilfun: "+songL.length);
      console.log(" Playlist: ");
      for(let i=0;i<songL.length;i++)
      {
          console.log("+------------------------------------------------+");
          console.log("|"+i+"|"+" Artis Name: "+songL[i].artis+"\n"+
          "+------------------------------------------------+"+"\n"+
          "| Album Name: "+songL[i].albumSong+"\n"+
          "| Name Song: "+songL[i].nameSong+"\n"+
          "| Genres: "+songL[i].genre+"\n"+
          "| Release Date: "+songL[i].rilis+"\n"+
          "| Time Playing: "+songL[i].timePlaying+"\n"+
          "| Price Song:"+songL[i].priceSong);
      }
  // console.log("hasil: "+genreSong.length);
  let less=songL.filter(ganraa=>ganraa.genre=="EDM")
  
  console.log("+------------------------------------------------+");
  console.log("|  Playlist Genres:");
  console.log("+------------------------------------------------+");
  console.log(less);
  let les=less;
    let kr;
    
  console.log("Length playlist: "+les.length);
//   console.log("time playing: "+less[].timePlaying);
    let hsl;
  for( let a=0;a<les.length;a++)
  {
    kr=60*les[a].timePlaying;
    sv.push(kr);
    
  }
  for (let b=0;b<sv.length;b++)
  {
    tmbh+=sv[b];
  }

  stm.push(tmbh);
  
  console.log("Amount of Duration: "+sv);
  console.log("Time playing playlist: "+tmbh);

    for (let c=0;c<stm.length;c++)
        {
            if (stm[c]<3600)
            {
                console.log ("This playlist song is less then 1 hours ");
            }
            else 
            {
                console.log("Sorry bro!, your playlist more then 1 hours");
              break;
            }
        }
        
    return tmbh;
}

songLe(songL);

