import z from "zod";

const pattern = z.object({
	name: z.string().transform((val) => val.length),
	age: z.number(),
	magics: z.array(z.string()),
});

const result = pattern.parse({
	name: "matheus",
	age: 90,
	magics: ["flecha", "fogo"],
});

console.log(result);
