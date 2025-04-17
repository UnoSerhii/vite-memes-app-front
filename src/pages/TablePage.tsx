import { useEffect, useState } from "react";
import { getInitialMemes, Mem, updateMem } from "../utils/api.ts";
import { MemeTable } from "../components/MemeTable";
import { EditMemeModal } from "../components/EditMemeModal";

export const TablePage = () => {
  const [memes, setMemes] = useState<Mem[]>([]);
  const [selectedMeme, setSelectedMeme] = useState<Mem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getInitialMemes().then((data) => {
      setMemes(data);
      localStorage.setItem("memes", JSON.stringify(data));
    })
      .catch(() => {
        const stored = localStorage.getItem("memes");
        if (stored) {
          setMemes(JSON.parse(stored));
        }
      });
  }, []);

  const handleEditClick = (meme: Mem) => {
    setSelectedMeme({ ...meme });
    setIsModalOpen(true);
  };

  const handleMemeChange = (updated: Mem) => {
    setSelectedMeme(updated);
  };

  const handleSave = async () => {
    if (!selectedMeme) return;
    const updatedMemes = memes.map((m) => (m.id === selectedMeme.id ? selectedMeme : m));
    setMemes(updatedMemes);
    localStorage.setItem("memes", JSON.stringify(updatedMemes));
    setIsModalOpen(false);
    await updateMem(selectedMeme.id, selectedMeme);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Довідник Мемів ✍️
      </h1>

      <MemeTable memes={memes} onEdit={handleEditClick} />

      <EditMemeModal
        meme={selectedMeme}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onChange={handleMemeChange}
        onSave={handleSave}
      />
    </div>
  );
};
