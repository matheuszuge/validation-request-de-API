import express from 'express';
import z from 'zod';

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/ping', (req, res) => {
	res.json({ pong: true });
});

server.post('/user', (req, res) => {
	const userSchema = z.object({
		name: z.string().min(2),
		email: z.string().email(),
		age: z.number().min(18).max(120),
	});

	const result = userSchema.safeParse(req.body);
	if (!result.success) {
		res.json({ error: 'Dados inválidos' });
		return;
	}

	const { name, email, age } = result.data;
	//processo
	console.log('processando...');
	console.log(name, email, age);

	res.status(201).json({ result: 'tudo ok' });
});

server.listen(3000, () => {
	console.log('Rodando: http://localhost:3000/');
});
