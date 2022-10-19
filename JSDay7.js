// const { text } = require('express');
const express= require('express');
const app= express();
// const { promises: fsPromises} = require('fs');
// const { finished } = require('stream');
let events = require('events');
let eventEmitter = new events.EventEmitter();
let fs= require('fs').promises;



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
app.get('/', (req, res) => {
    res.send(res.send( 'Your route is wrong!'))
  })

app.get('/promise_with_await',async (req, res) => {
    
    console.log('kutil');
    let a= promiseWithAwait('./promiseWithAwait.txt');
    console.log(a);
    // console.log(promiseWithAwait('./promiseWithAwait.txt'))
    res.send(await  promiseWithAwait('./promiseWithAwait.txt'))
  })


app.get('/promise_without_await',async (req, res) => {
    
    res.send(promiseWithoutAwait('./promiseWithoutAwait.txt'));
  })




  async function promiseWithAwait(filename){
    try{
        let teks=await fs.readFile(filename,'utf-8');

        const arr = teks.replace(" ", "");

        console.log(arr); //  ['One', 'Two', 'Three', 'Four']
    
        return arr;
      } catch (err) {
        console.log(err);
      }finally{
        console.log('nice bro!')
      }
    }
    
  function promiseWithoutAwait(filename){
    try{
        let eventHendler=function(){
            let fileTeks= fs.readFile(filename,'utf-8');
            // const kontent= fileTeks;
            fileTeks.then(function(data){
                console.log(data)
            })
            // console.log("halo coy");
             return fileTeks;
        }
        eventEmitter.on('halo',eventHendler);

        eventEmitter.emit('halo');

    }catch(err){
        console.log(err);
    }finally{
        console.log('congrutulate bro!');
    }
    

    }

    // promiseWithoutAwait('./promiseWithoutAwait.txt');
    


app.listen(4000);