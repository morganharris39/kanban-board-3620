import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		const savedValue = localStorage.getItem(key);

		if (savedValue === null) {
			return initialValue;
		}

		try {
			return JSON.parse(savedValue) as T;
		} catch {
			return initialValue;
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as const;
}
