//Amount of Purchased book
let stokTake=5;
let st=0;

function bookPurchased(stokTake,st)
{
    const discount1=20/100;
    const discount2=30/100;
    const tax=10/100;

    let detailBook=[{bookName:"Naruto ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",stok:5}];
    var resDis=[];
    let price=6000;
    var hasArr=["Total Price: ","Amount of purchased book: ","Amount of Discount: ","Price after discount: ","Amount of tax:", "Price after tax: "];
    var space="       "
    
   
    let jmBook;
    let taxH;
    let discountR;
    let hsl;
    var taxx="10%";

        for(let j=0;j<detailBook.length;j++)
        {

            console.log(j+"."+"Book Name: "+detailBook[j].bookName+"\n"+
            "-Author Name: "+detailBook[j].authorName+"\n  "+
            "-Release Date: "+detailBook[j].rilis+"\n "+
            "-Price before discount:"+"IDR "+price+",00"+
            "\n"+"-Stock:"+detailBook[j].stok)
        }
            console.log("+====================================================+")
           
             
          st=5-stokTake;
          jmBook=stokTake*price;
          resDis.push( jmBook);

          
        
                var st1=st;
                console.log("Stock available currently:"+st);
                console.log("\n");
                

                    for(var x=0;x<hasArr.length;x++)
                    {
                        if (st<1){
                            console.log("Sorry bro!, we are out of stock , come again tomorrow")
                            break;
                        }
                        else{

                            if(  jmBook>= 10000 &&   jmBook<=20000)
                            {
                                cek=" 20%";
                                
                                discountR=discount1*  jmBook;
                                hsl=  jmBook-discountR;

                                taxH=hsl-tax;
                                resultH=hsl;
 

                                resDis.push(stokTake,cek,hsl,taxx,taxH);

                                
                            }
                            else if(  jmBook>= 20000 &&   jmBook<=70000)
                            {
                                cek=" 30%";
                                
                                discountR=discount2*  jmBook;
                                hsl=  jmBook-discountR;

                                taxH=hsl-tax;
                                resultH=hsl;

                                resDis.push(stokTake,cek,hsl,taxx,taxH);

                            }
                           
                            else{
                                console.log("sorry bro!, nothing discount for you currently")
                            }
                    ut
                            
                            console.log([x]+"."+hasArr[x]+""+resDis[x]);
                    
                    }

            }
} 

bookPurchased(stokTake,st);
        

