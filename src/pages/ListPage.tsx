import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { getInitialMemes } from "@/utils/api.ts";

interface Meme {
  id: string;
  name: string;
  image: string;
  likes: number;
}

export const ListPage: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getInitialMemes().then((data) => {
      const stored = localStorage.getItem("memes");
      if (stored) {
        setMemes(JSON.parse(stored));
      } else {
        setMemes(data);
        localStorage.setItem("memes", JSON.stringify(data));
      }
    })
      .catch((error: any) => setError(error.message));
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-medium text-gray-600">
        Завантаження мемів...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 text-lg font-medium">
        Помилка завантаження мемів: {error}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Мемчики дня 😎
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memes.map((meme) => (
          <Link to={`/memes/${meme.id}`} key={meme.id}>
            <Card
              isPressable
              shadow="md"
              className="transition-all hover:shadow-xl hover:scale-[1.02]"
            >
              <CardBody className="overflow-hidden p-0">
                <Image
                  alt={meme.name}
                  src={meme.image}
                  className="w-full h-full object-cover aspect-[4/5]"
                  radius="lg"
                />
              </CardBody>
              <CardFooter className="flex flex-col items-start gap-1 p-3">
                <span className="font-semibold text-base text-gray-800 truncate">
                  {meme.name}
                </span>
                <span className="text-sm text-gray-500">
                  ❤️ {meme.likes} лайків
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};