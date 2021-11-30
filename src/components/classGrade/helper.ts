export type GenericArray = <T>(list: T[], startIndex: number, endIndex: number) => T[];

export const reorder: GenericArray = (list, startIndex: number, endIndex: number) => {
	const result = [...list];

	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);

	return result;
};