export interface Mem {
  id: string;
  name: string;
  image: string;
  likes: number;

  [key: string]: any;
}

export const getInitialMemes = async (): Promise<Mem[]> => {
  try {
    const res = await fetch("https://vite-memes-app-backend-production.up.railway.app/api/memes");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні мемів:", error);
    return [];
  }
};

export const updateMem = async (id: string, body: Mem): Promise<Mem | null> => {
  try {
    const res = await fetch(`https://vite-memes-app-backend-production.up.railway.app/api/memes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні мемів:", error);
    return null;
  }
};