const express= require('express');
const app= express();
// const d3= require('./jsDay3');

const checkAuth = (req, res, next) => {
    //get the authorization header that was sent by the client
    const auth = req.headers["authorization"];
  
    /*
    auth = "Basic <encoded username:password>"
    get userpass via split and access index 1
    */
    const userpass = auth.split(" ")[1];
  
    //decode userpass to "username:password"
    const text = Buffer.from(userpass, "base64").toString("ascii");
  
    //get username and password individually
    const username = text.split(":")[0];
    const password = text.split(":")[1];
  
    if (username == "halo" && password == 123) 
    {
      //auth successful, access to the route is granted
      return next();
    } else {
      //username and password is wrong, auth unsuccessful
      return res.json("Try again bro!");
    }
  }

app.use((req,res,next)=>{
    res.setHeader('Content-Type','text/html');
    next();
});

app.use(checkAuth);

app.get('/', (req, res) => {
    // d3(4,0,4)
    res.send(
       
        bookPurchased()
        );
      });
        

      
function bookPurchased()
    {
        let stokTake=4;
        let termCredit=4;
        let st=0;  

        const discount1=20/100;
        const discount2=30/100;
        const tax=10/100;
        let cred=0;
        let bln="";
        let blan=[];
        let detailBook={bookName:"Naruto ",authorName:"Musashi Kishimoto",rilis:"February 12 2022",stok:5};
        let bokDet={...detailBook};
        let resDis=[];
        let price=800000;
        let hasArr=["Total Price: ","Amount of purchased book: ","Amount of Discount: ","Price after discount: ","Amount of tax:", "Price after tax: "];
        let crdit=["Months: ","Term of condition due permont: ","Price Term: "];
        let stcrdt=[];
        let jmBook;
        let taxH;
        let discountR;
        let hsl;
        let taxx="10%";
    
        let {bookName,authorName,rilis,stok}=bokDet;
        
        // console.log("Book Name: "+bookName+"\n"+
        //  "Author Name: "+authorName+"\n"+
        // "Release Date: "+rilis+"\n"+
        // "Price before discount:"+"IDR "+price+",00"+
        // "\n"+"Stock:"+stok);
          
        // console.log("+====================================================+");
               
                 
        st=5-stokTake;
        jmBook=stokTake*price;
              
        resDis.push( jmBook);
    
    
        // console.log("Stock available currently:"+st);
        // console.log("\n");
                    
    
                        for(let x=0;x<hasArr.length;x++)
                        {
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
                                    resultH=hsl;
                                    cred=taxH/termCredit;
     
    
                                    resDis.push(stokTake,cek,hsl,taxx,taxH);
                                   
    
                                    
                                }
                                else if(  jmBook>= 2000000 &&   jmBook<=25000000)
                                {
                                    cek=" 30%";
                                    
                                    discountR=discount2*  jmBook;
                                    hsl=  jmBook-discountR;
                                    taxH=hsl-tax;
                                    resultH=hsl;
                                    cred=taxH/termCredit;
                                    resDis.push(stokTake,cek,hsl,taxx,taxH,termCredit,cred);
                                   
                                }
                               
                                else{
                                    console.log("sorry bro!, nothing discount for you currently");
                                }
                                
                                
                                
                                // console.log([x]+"."+hasArr[x]+""+resDis[x]);
                        }   
                         
                      
                            // console.log("\n");
    
                            for(let k=0;k<crdit.length;k++)
                            {
                                if (termCredit==2)
                                {
                                    bln="January,February ";
                                    
                                    
                                }
                                else if (termCredit==1)
                                {
                                    bln="January ";
                                
                                }
                            
                                else if (termCredit==3)
                                {
                                    bln="January,February,March ";
                                
                                }
                                else if (termCredit==4)
                                {
                                    bln="January,February,March,May ";
                                
                                }
                                else if (termCredit==5)
                                {
                                    bln="January,February,March,May,June ";
                                
                                }
                                else if (termCredit==6)
                                {
                                    bln="January,February,March,May,June,July ";
                                
                                }
                                else if (termCredit==7)
                                {
                                    bln="January,February,March,May,June,July,August ";
                                
                                }
                                else if (termCredit==8)
                                {
                                    bln="January,February,March,May,June,July,August,September ";
                                
                                }
                                else if (termCredit==9)
                                {
                                    bln="January,February,March,May,June,July,August,September,October ";
                                
                                }
                                else if (termCredit==12)
                                {
                                    bln="January,February,March,May,June,July,August,September,October,November,Desember ";
                                
                                }
    
    
                                else{
                                    console.log("data no avalaible");
                                }
                              
    
                                stcrdt.push([{months: bln,term_of_condition_due: termCredit,price_term: cred}]);
                          
                                console.log(stcrdt);
                              
                            }
    
    
                          
              return stcrdt;              
                      
    }

   

    
 

app.listen(3000);




           
      




// module.exports= bookPurchased;
        

