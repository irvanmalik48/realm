/**
 * @param array the array to be mapped
 * @param callback the callback function to be called on each item of the array
 * @returns data of type U[]
 */
export async function asyncMap<T, U>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  const results: U[] = [];

  for (let i = 0; i < array.length; i++) {
    results.push(await callback(array[i], i, array));
  }

  return results;
}
