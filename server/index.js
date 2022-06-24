import express from "express";
import borderparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
const app = express();



app.use(borderparser.json({ limit: "30mb", extended: true }));
app.use(borderparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);

const Connection_url = encodeURI(
 
 'mongodb+srv://sabin:sabin@cluster0.gjwxg.mongodb.net/Memory?retryWrites=true&w=majority'
 );
const PORT = process.env.PORT || 8000;
// app.listen(PORT,()=>console.log('hello this is sabin'))

mongoose
  .connect(Connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("servering running on port")))
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);
