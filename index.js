const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();
const port = 5000;

// mongoDB
const uri =
	"mongodb+srv://StyleHut:52P6cUxnDY3fGmpw@cluster0.f4mgp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Express
async function run() {
	try {
		await client.connect();
		const database = client.db("Stylehut");
		const collection = database.collection("proh");
		// create a document to insert
		const doc = {
			title: "Record of a Shriveled Datum",
			content: "No bytes, no problem. Just insert a document, in MongoDB",
		};
		app.post("/hello", async (req, res) => {
			const result = await collection.insertOne(doc);
			console.log(
				`A document was inserted with the _id: ${result.insertedId}`
			);
		});
	} finally {
		await client.close();
	}
}
run().catch(console.dir);

// get app
app.get("/", (req, res) => {
	res.send("Stylist clothes for man is runnign");
});

// lestining port
app.listen(port, () => {
	console.log("Stylehut is started");
});
