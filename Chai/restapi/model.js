const express=require('express');
const mongoose=require('mongoose');
const app=express();

async function main(){
    try {
      mongoose
        .connect("mongodb://127.0.0.1:27017/testdb")
        .then(() => {
          return console.log("Done Bhai ");
        })
        .catch((err) => {
          console.log(err);
        });

      const studentSchema = new mongoose.Schema({
        Name: {
          type: String,
        },
        password: {
          type: String,
          required: true,
        },

        adddress: {
          type: Number,
        },
      });
    } catch (error) {}
}

const Student=mongoose.model("Student",studentSchema);

const student=await Student.create({
    Name:"Yash",password:"23as2",adddress:123121
});

const students=  await Student.find({})