import express from 'express';
import z from 'zod';
import { jsonplaceholderResponse } from './schemas/jsonplaceholderResponse';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
	res.json({ pong: true });
});

server.get('/posts', async (req, res) => {
	const request = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await request.json();

	const result = jsonplaceholderResponse.safeParse(data);

	if (!result.success) {
		res.status(500).json({ error: 'Ocorreu um ERRRO interno' });
		return;
	}
	let totalPosts = result.data.length;

	res.json({ total: totalPosts });

	console.log(result);
});

server.listen(3000, () => {
	console.log('Rodando: http://localhost:3000/');
});
