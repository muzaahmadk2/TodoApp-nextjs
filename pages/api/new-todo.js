import { MongoClient, ObjectId } from "mongodb";

// api/new-meetup

async function Handler(req, res) {
  
  if (req.method === "POST") {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        "mongodb+srv://muzaahmadk:pDxdGtJBV62rPT83@cluster0.4w55fjn.mongodb.net/todos?retryWrites=true&w=majority"
      );
      const db = client.db();

      const todosCollection = db.collection("todos");

      const result = await todosCollection.insertOne(data);

      console.log(result);
      client.close();

      res.status(200).json({ message: "todo Inserted!!" });
    } catch (error) {
      res.status(400).json({ message: "error!!" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const id = req.body; // Extract the ID from the request query

      if (!id) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const client = await MongoClient.connect(
        "mongodb+srv://muzaahmadk:pDxdGtJBV62rPT83@cluster0.4w55fjn.mongodb.net/todos?retryWrites=true&w=majority"
      );
      const db = client.db();

      const todosCollection = db.collection("todos");

      // Use ObjectId to create a valid MongoDB ID
      const todoId = new ObjectId(id);

      const result = await todosCollection.deleteOne({ _id: todoId });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }

      console.log(result);
      client.close();

      res.status(200).json({ message: "Todo deleted!!" });
    } catch (error) {
      res.status(400).json({ message: "error!!" });
    }
  }
}
export default Handler;
