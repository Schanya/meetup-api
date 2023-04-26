import { hashSync, compareSync } from 'bcrypt';

export function hash(text: string) {
	return hashSync(text, 10);
}

export function compare(data: string, encrypted: string) {
	return compareSync(data, encrypted);
}
