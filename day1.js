// const buy=[10,20,40,50,5,2];
const discount1=20/100;
const discount2=30/100;
const discount3=50/100;
const discount4=60/100;
const tax=10/100;
let detailBook=["",
{bookName:"Naruto ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:11000},
{bookName:"Naruto Shipudden ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:15000},
{bookName:"Naruto Road To Ninja ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:20000},
{bookName:"Naruto The Last ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:25000},
{bookName:"Naruto Shipudden Movie 1 ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:30000},
{bookName:"Naruto Shipudden Movie 2 ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:35000},
{bookName:"Naruto Movie 1 ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:50000},
{bookName:"Boruto ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:55000}];
//  const buy=["",11000,15000,20000,25000,30000,35000,50000,55000] ; 
var resDis=["  "];
var hasArr=["",
"Amount of Discount: "
,"Price after discount: ","Amount of tax:"
, "Price after tax: "];
var space="       "
// var v1=20;
// var v2=30;



function result(detailBook,discount1,discount2,discount3,discount4,tax)
{
    var taxH;
    var discountR;
    var hsl;
    var resultH=0;
    var taxx="10%";
 
    // const discountR;
    // const hsl=0;
   
    for(let j=1;j<detailBook.length;j++)
    {

        console.log(j+"."+"Book Name: "+detailBook[j].bookName+"\n"+
        "-Author Name: "+detailBook[j].authorName+"\n  "+
        "-Release Date: "+detailBook[j].rilis+"\n "+"-Price before discount:"+"IDR "+detailBook[j].price+",00")
        
        console.log("+============================================+")
        for(var x=1;x<hasArr.length;x++)
        {

            if(detailBook[x].price>= 10000 && detailBook[x].price<=19000)
            {
                cek=" 20%";
                
                discountR=discount1*detailBook[x].price;
                hsl=detailBook[x].price-discountR;

                taxH=hsl-tax;
                resultH=hsl;

                resDis.push(cek,hsl,taxx,taxH);

                
            //  console.log("You've got 20%, and don't forget for the tax 10%");
            }
            else if(detailBook[x].price>= 20000 && detailBook[x].price<=29000)
            {
                cek=" 30%";
                
                discountR=discount2*detailBook[x].price;
                hsl=detailBook[x].price-discountR;

                taxH=hsl-tax;
                resultH=hsl;

                resDis.push(cek,hsl,taxx,taxH);

                
            //  console.log("You've got 20%, and don't forget for the tax 10%");
            }
            else if(detailBook[x].price>= 30000 && detailBook[x].price<=39000)
            {
                cek=" 50%";
                
                discountR=discount3*detailBook[x].price;
                hsl=detailBook[x].price-discountR;

                taxH=hsl-tax;
                resultH=hsl;

                resDis.push(cek,hsl,taxx,taxH);

                
            //  console.log("You've got 20%, and don't forget for the tax 10%");
            }
            else if(detailBook[x].price>= 40000 && detailBook[x].price<=60000)
            {
                cek=" 60%";
                
                discountR=discount4*detailBook[x].price;
                hsl=detailBook[x].price-discountR;

                taxH=hsl-tax;
                resultH=hsl;

                resDis.push(cek,hsl,taxx,taxH);

                
            //  console.log("You've got 20%, and don't forget for the tax 10%");
            }
            else{
                console.log("sorry bro!, nothing discount for you currently")
                // break;
            }
    
            //output
            console.log([x]+"."+hasArr[x]+""+resDis[x]);
        
            
    //    [i]+"."++cek+
    //    [i]+"."++taxx+
    //    [i]+"."++taxH);
        }
        console.log(space);
    }

    // console.log("Hasil: "+resDis);
    // console.log("Discount: "+resultH);
    // console.log("Buy: "+buy);
    return resultH;
}

 result(detailBook,discount1,discount2,discount3,discount4,tax);

 
// console.log("hasil:"+taxH)
