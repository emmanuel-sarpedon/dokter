export async function getFields(): Promise<Fields> {
  return fetch("/api/fields").then((res) => res.json());
}
