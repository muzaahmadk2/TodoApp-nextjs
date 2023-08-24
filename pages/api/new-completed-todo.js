import { MongoClient } from "mongodb";

// api/new-meetup

async function Handler(req, res) {
  
  try {
    if (req.method === "POST") {
      
      const data = req.body;

      const client = await MongoClient.connect(
        "mongodb+srv://muzaahmadk:pDxdGtJBV62rPT83@cluster0.4w55fjn.mongodb.net/completedTodos?retryWrites=true&w=majority"
      );
      const db = client.db();

      const completedTodosCollection = db.collection("completedTodos");

      const result = await completedTodosCollection.insertOne(data);
      
      console.log(result);
      client.close();

      res.status(200).json({ message: "completed todo Inserted!!" });
    }
  } catch (error) {
    res.status(400).json({ message: "error!!" });
  }
}
export default Handler;
