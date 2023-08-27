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

      const insertedData = {
        id:result.insertedId,
        ...data, //include other fields from request
      };

      client.close();

      res.status(200).json({ message: "todo Inserted!!",data: insertedData });
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

  if (req.method === "PUT") { // Change method to PUT
    try {
      const id = req.body.id; // Extract the ID from the request body
      
      const status = req.body.status; // Assuming you have a newTodoData object with the fields to update
      console.log(status)
  
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
  
      const result = await todosCollection.updateOne(
        { _id: todoId },
        { $set: {status: status} } // Use $set to update specific fields in the document
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      console.log(result);
      client.close();
  
      res.status(200).json({ message: "Todo updated!!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

}
export default Handler;
