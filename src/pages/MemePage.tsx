import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Image } from "@heroui/react";

interface Meme {
  id: string;
  name: string;
  image: string;
  likes: number;
}

export default function MemePage() {
  const { id } = useParams<{ id: string }>();
  const [meme, setMeme] = useState<Meme | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("memes");

    if (stored && id) {
      try {
        const parsed: Meme[] = JSON.parse(stored);
        const found = parsed.find((m) => String(m.id) === id);
        if (found) {
          setMeme(found);
        } else {
          setMeme(null);
        }
      } catch (err) {
        console.error("Помилка при читанні мемів з localStorage:", err);
        setMeme(null);
      }
    }
  }, [id]);

  if (!meme) {
    return (
      <div className="text-center text-red-500 mt-10">
        Мем не знайдено 🙈
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-md">
      <Button color="primary" onPress={() => navigate(-1)}
              className="mb-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Назад
      </Button>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{meme.name}</h1>
      <Image
        src={meme.image}
        alt={meme.name}
        className="rounded-lg shadow-lg w-full h-auto mb-4"
      />
      <p className="text-lg text-gray-600">❤️ {meme.likes} лайків</p>
    </div>
  );
}
