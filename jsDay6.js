const express= require('express');
const app= express();

const checkAuth = (req, res, next) => {
 
    const auth = req.headers["authorization"];

    const userpass = auth.split(" ")[1];

    const text = Buffer.from(userpass, "base64").toString("ascii");
    const username = text.split(":")[0];
    const password = text.split(":")[1];
  
    if (username == "halo" && password == 123) 
    {
      return next();
    } else {
      return res.json("Try again bro!");
    }
  }

app.use((req,res,next)=>{
    res.setHeader('Content-Type','text/html');
    next();
});

app.use(checkAuth);

const checkAuthh = (req, res, next)=>{
  
    console.log("hasilnyo: "+ bookPurchased())
    res.send( bookPurchased());


}

app.use(checkAuthh);

let additionalPrice=20/100;
  let discountR;
  let hsl;
  const tax=10/100;
  let taxH;
  const discount1=20/100;
  const discount2=30/100;
  let latePrice=0;
  let cred=0;
  let cek=""; 
  let stokTake=2;
  let termCredit=[1,2,3,4,5,6,7,8,9,12];
  let st=0;  
  let resDis=[];

  let stcrdt=[];
  let jmBook;
  let priceTerm=[];
  let creditResult;
  let hasilUtang;
  let detailBook={bookName:"Naruto ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",price:2000000,stok:5};
      
async function bookPurchased()
    {
        
        let bln="";
      
        
      
        let taxx="10%";
      

      
        for(let x=0;x<termCredit.length;x++)
        {
            st=5-stokTake;
            jmBook=stokTake*detailBook.price;
                  
            
            if (st<1){
                console.log("Sorry bro!, we are out of stock , come again tomorrow");
                break;
            }
            else if(  jmBook>= 500000 &&   jmBook<=1900000)
                {
                   
                        cek=" 20%";
                        discountR=discount1*  jmBook;
                        hsl=  jmBook-discountR;
                        taxH=hsl-tax;
                        asyncronous1(taxH,cred,termCredit);
                        // cred=taxH/termCredit[x];
                        latePrice=priceTerm[0]+additionalPrice;
                        // taxTotal.push(latePrice);
                  
                }
                else if(  jmBook>= 2000000 &&   jmBook<=25000000)
                {
                    cek=" 30%";
                    
                    discountR=discount2*  jmBook;
                    hsl=  jmBook-discountR;
                    taxH=hsl-tax;
                    resultH=hsl;
                    // cred=taxH/termCredit[x];
                    asyncronous2(taxH,cred,termCredit);
                    latePrice=priceTerm[0]+additionalPrice;
                    
                }
               
                else{
                    console.log("sorry bro!, nothing discount for you currently");
                }      

                
                if (termCredit[x]==2)
                {
                    bln="January,February ";
                    
                    
                }
                else if (termCredit[x]==1)
                {
                    bln="January ";
                
                }
            
                else if (termCredit[x]==3)
                {
                    bln="January,February,March ";
                
                }
                else if (termCredit[x]==4)
                {
                    bln="January,February,March,May ";
                
                }
                else if (termCredit[x]==5)
                {
                    bln="January,February,March,May,June ";
                
                }
                else if (termCredit[x]==6)
                {
                    bln="January,February,March,May,June,July ";
                
                }
                else if (termCredit[x]==7)
                {
                    bln="January,February,March,May,June,July,August ";
                
                }
                else if (termCredit[x]==8)
                {
                    bln="January,February,March,May,June,July,August,September ";
                
                }
                else if (termCredit[x]==9)
                {
                    bln="January,February,March,May,June,July,August,September,October ";
                
                }
                else if (termCredit[x]==12)
                {
                    bln="January,February,March,May,June,July,August,September,October,November,Desember ";
                
                }
                else{
                    console.log("data not avalaible");
                }
                // stcrdt.push({term_of_condition_due: termCredit[x],months: bln,price_term: priceTerm[x],tax_admin:additionalPrice,tax_total: latePrice});
                // creditResult= new Promise(
                //     function(resolve){
                //        setTimeout(function(){resolve(stcrdt);},3000).toString();
                
                //     });

        }
        stcrdt.push({term_of_condition_due: termCredit[x],months: bln,price_term: priceTerm[x],tax_admin:additionalPrice,tax_total: latePrice});
        creditResult= new Promise(
            function(resolve){
               setTimeout(function(){resolve(stcrdt);},3000).toString();
        
            });

            
        creditResult= new Promise(
            function(resolve){
               setTimeout(function(){resolve(stcrdt);},3000).toString();
        
            });

        resDis.push( {stock_currently_available: st,total_price:jmBook,amoun_of_purcased_book:stokTake,amount_of_discount:cek,price_after_discount:hsl,amount_of_tax:taxx,price_after_tax:taxH});
        console.log (detailBook);
        let titleDay3=[...resDis];
        console.log('\n');
        console.log (resDis);
        console.log('\n');
        hasilUtang= await creditResult;
        console.log(hasilUtang);
    //    console.log('\n')
                          
              return hasilUtang;                          
    }
    // console.log(stcrdt);

 // second function
 function asyncronous1(taxH,cred,termCredit){
    for (let i=0;i<termCredit.length;i++){
        cred=taxH/termCredit[i];
       
    }
    priceTerm.push(cred);
   return priceTerm;
}

function asyncronous2(taxH,cred,termCredit){
    for (let i=0;i<termCredit.length;i++){
        cred=taxH/termCredit[i];
        
    }
    priceTerm.push(cred);
   return priceTerm;
}


app.listen(3000);

bookPurchased()   ;



           
      




// module.exports= bookPurchased;
        

