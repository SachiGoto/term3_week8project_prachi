import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

// connecting to the local host
// const db = mysql.createConnection ({
//   host: 'localhost',
//   port: 3306,
//   user:'root',
//   password:'',
//   database:'products'

// });

// connecting to the local host
const db = mysql.createConnection ({
  host: 'localhost',
  port: 8889,
  user:'root',
  password:'root',
  database:'products'

});



const server = express();
server.use(cors());
server.use(express.json());

db.connect(error =>{
    if(error)
    console.log('Sorry cannot connect to db :', error);
    else
    console.log('Connected to mysql db');
  })
  
  // server.get('/productsapi',(req,res)=>{
  
    // Select from the product table
    //stored procedures for allproducts
  //   let allproductsSP = "SELECT * FROM product"
  //   let query = db.query(allproductsSP,(error,data,fields) => {
      
  //     if(error){
  //       res.json({ ErrorMessage:error })
        
  //     }
  //     else{
     
  //     res.json(data);
  //   }
  
  //   })
  // })
  
  //display all products
  server.get('/productssp', (req, res) => {
    let allproductSP = "CALL `All_products`()";
    // let  allproductsSP  = "SELECT * FROM All_products"
    db.query(allproductSP, (error, data, fields) => {
      if(error){
        res.json({ ErrorMessage: error });
        // console.log(error);
      }
      else{
        res.json(data[0]);
      }
      
    })
  })

  //productbyID
  // This one was not tested so I did the testing and I changed a few things.

// new version
  server.get("/productssp/:id", (req, res) => {
    let ByID = " CALL `getProductbyID`(?);";
    let productbyid = req.params.id;
    db.query(ByID, [productbyid],(error, data)=>{
        if (error) {
            console.log(error);
        } else {
          res.json(data[0][0]);
        }
    });
});

//  old version
//   server.get("/productssp/:id", (req, res) => {
//     let ByID = "CALL `All_products`()";
//     let productbyid = req.params.id;
//     db.query(ByID, (error, data) => {
//         if (error) {
//             console.log(error);
//         } else {
//             res.json(data[0].find(x => x.ID == productbyid));
//         }
//     });
// });


 //admin all products
  // server.get('/admin', (req, res) => {
  //   let allproducts = "CALL `Alladminproduct`()";
    
  //   db.query( allproducts, (error, data, fields) => {
  //     if(error){
  //       res.json({ ErrorMessage: error });
  //       // console.log(error);
  //     }
  //     else{
  //       res.json(data[0]);
  //     }
      
  //   })
  // })

 
  
  // LOGIN
server.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let loginQuery =  "CALL `login`(?,?)";
  db.query(loginQuery, [email, password], (error, data) => {
    if(error){
      res.json({ ErrorMessage: error});
    }
    else{
      if(data[0].length === 0){
        res.json({ data: data[0], login: false, message: "Sorry, you have provided wrong credentials"})
      }
      else{
        res.json({ 
            ID: data[0].ID, 
            email: data[0].email,
            data: data[0],
            login: true, 
            message: "Login successful"});
            // create the Auth Key
      }

      
    }
  })

});


// editproduct
// You missed a few things here so I fixed it up 

// CALL `editproduct`(@p0, @p1, @p2, @p3, @p4, @p5)

server.put('/edit',(req, res)=>{
// order in database: description, ID, price, productTitle, product_image, stockAvailability

let description = req.body.description;
let price = req.body.price;
let productTitle = req.body.productTitle;
let stockAvailability = req.body.stockAvailability
let ID = req.body.ID;
let product_image = req.body.product_image
let display = req.body.display

let query = "CALL `editproduct`(?, ?, ?, ?, ?, ?,?)"

db.query(query, [description, ID, price, productTitle, product_image, stockAvailability, display], (error, data, fields)=>{
  if(error){
    res.json({ErrorMessage:error});
  }else{
    res.json({
      message:"update successful!",
      edit:true,
      data:data
    })
  }
})
})



// old version 
// ------------------------------------------

//1. there are only four question marks for calling stored procedures but in your sp, you created 6 parameteres. 
//2. be aware of the order of information. Your argument starts from description, ID, price, productTitle, product_image, stockAvailability. So when you connect valued from client side, you must pass those values in matching order with the database! 

// These are very important! be careful! 
// server.put('/editproduct', (req, res) => {
//   let description = req.body.description;
//   let ID = req.body.ID;
//   let price = req.body.price;
//   let productTitle = req.body.productTitle;
//   let stockAvailability = req.body.stockAvailability;
//   let query = "CALL `editproduct`(?, ?, ?,?)";
//   db.query(query, [description,ID, price, productTitle,stockAvailability], (error, data) => {
//     if(error){
//       res.json({ edit: false, message: error });
//     }
//     else{
//       res.json({ edit: true, message: "Product successfully edited"});
//     }
//   })
// });

//display edited product
server.put('/editeddisplay', (req, res) => {
  let ID = req.body.ID;
  let display = req.body.display;
  let query = "CALL `editeddisplay`(?,?)";
  db.query(query,[ID,display], (error, data) => {
      if (error) {
          res.json({ editeddisplay: false, message: error });
      } else {
          res.json({ data: data[0], editeddisplay: true, message: "Edited product successfully displayed" })
      }
  })
})


// Addnewproduct
// testing didn't pass. I found some flaws in stored procedures and the code so I changed a bit for you :)
// id is auto incremented and in the stored procedure, there is no parameter for id so,no need to provide id in query here.

server.post("/addnewproduct", (req, res)=>{
     
let description = req.body.description;
let price = req.body.price;
let productTitle = req.body.productTitle;
let stockAvailability = req.body.stockAvailability
// let ID = req.body.ID;
let product_image = req.body.product_image
let display = req.body.display

let query =  "CALL `addoneproduct`(?, ?, ?, ?, ?, ?)";
db.query(query, [productTitle, product_image, description, price, stockAvailability, display], (error, data) => {
  if (error) {
      res.json({
          insert: false,
          message: error
      })
  } else {
      res.json({
          data: data[0],
          insert: true,
          message: "New product successfully added."
      })
  }
})

})



// ----------- old version

server.post("/addnewproduct", (req, res) => {
  let description = req.body.description;
  let ID = req.body.ID;
  let price = req.body.productTitle;
  let productTitle = req.body.price;
  let stockAvailability = req.body.stockAvailability;
  
  let query = 'CALL `addoneproduct`(?, ?, ?, ?)';
  db.query(query, [description,ID, price, productTitle,stockAvailability], (error, data) => {
      if (error) {
          res.json({
              insert: false,
              message: error
          })
      } else {
          res.json({
              data: data[0],
              insert: true,
              message: "New product successfully added."
          })
      }
  })
})

//productby id
// this api was not tested so I tested and changed req.params.ID to req.params.id. 
// But then I noticed that there is another api for selecting products by id so I commented this whole thing out.
// server.get('/product/:id', (req, res) => {
//   let ID = req.params.id;
//   let getbyID = "CALL `getProductbyID`(?)";
//   db.query(getbyID, [ID], (error, data) => {
//       if (error) {
//           res.json({ ID: false, message: error })
//       } else {
//           if (data[0].length === 0) {
//               res.json({ ID: false, message: "No such product ID exist" })
//           } else {
//               res.json({ ID: true, message: "success", productData: data[0] })
//           }
//       }
//   })
// })

//delete product
server.delete('/deleteproduct/:id', (req, res) => {
  let ID = req.params.id;
  let deleteID = "CALL `deletebyID`(?)";
  db.query(deleteID, [ID], (error, data) => {
      if (error) {
          res.json({ deletebyID: false, message: error });
      } else {
          res.json({ deletebyID: true, message: "Product deleted successfully" });
      }
  })
})



server.get('/onlineproducts' , (req, res) =>{
  let online = "CALL `diplayonline`()";
  db.query(online , (error, data) => {
    if (error) {
      res.json({ ID: false, message: error })
  } 
  else {
     res.json(data[0])
     
  }
})
})

 




  server.listen(4600, function() {
    console.log('Server is successfully running on port 4600');
    
})