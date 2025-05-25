"use client";

import { useEffect, useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { Title, useDebounce } from "@/shared/components";
import { TagsList } from "./tags_list";

export function TagsSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 700);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setIsOpen(false);
      return;
    } else {
      setIsOpen(true);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-full max-w-[350px] xs1:max-w-[800px]">
      {/* Поле ввода */}
      <Input
        type="text"
        name="search"
        placeholder="🔍 Поиск тэга по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-lg text-center mx-auto md:ml-auto md:mr-0 "
      />

      {/* Затемнение фона при открытой модалке */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Затемнение */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/50 z-[60}"
              onClick={() => setIsOpen(false)}
            />

            {/* Модальное окно с результатами */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute  top-full mt-2 min-w-[70vw] max-w-[90vw] -translate-x-1/2 left-0 md:-left-full rounded-lg border p-4 shadow-lg bg-background border-foreground/20 z-[70]"
            >
              <Title size="lg" text="Результаты поиска:" className="mt-2" />
              <TagsList searchTerm={debouncedSearchTerm} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
