import {
  Table as HeroTable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@heroui/react";
import { Link } from "react-router-dom";
import { Mem } from "../utils/api.ts";

interface Props {
  memes: Mem[];
  onEdit: (meme: Mem) => void;
}

const columns = [
  { name: "МЕМ", uid: "name" },
  { name: "ДІЇ", uid: "actions" }
];

export const MemeTable = ({ memes, onEdit }: Props) => {
  const renderCell = (meme: Mem, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <Link
            to={`/memes/${meme.id}`}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 hover:text-blue-600 transition-colors"
          >
            <h2 className="font-medium text-gray-800">{meme.name}</h2>
            <span className="text-sm text-gray-400">❤️ {meme.likes}</span>
          </Link>
        );
      case "actions":
        return (
          <Button
            size="sm"
            color="primary"
            className="rounded shadow hover:brightness-110 transition"
            onPress={() => onEdit(meme)}
          >
            Редагувати
          </Button>
        );
      default:
        return meme[columnKey as keyof Mem];
    }
  };

  return (
    <HeroTable aria-label="Meme table from API" isStriped removeWrapper>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            className="uppercase text-sm font-semibold tracking-wide text-gray-600"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={memes}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell className="py-3">{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </HeroTable>
  );
};
