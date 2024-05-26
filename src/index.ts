import express from 'express';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
dotEnv.config();

//middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Database connection
const connect = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(process.env.MONGODB as string);
		console.log('Connected to mongoDB.');
	} catch (error) {
		throw error;
	}
};
mongoose.connection.on('disconnected', () => {
	console.log('mongoDB disconnected!');
});

// Server Creation
const port = process.env.PORT || 5000;
app.listen(port, () => {
	connect();
	const myApp = `App is running on port : ${port}`;
	console.log(myApp);
});
