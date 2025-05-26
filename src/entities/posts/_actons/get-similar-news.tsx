"use server";

import { dataBase } from "@/shared/lib/db_conect";

export async function getSimilarNews(currentNewsSlug: string) {
  const currentPost = await dataBase.news.findUnique({
    where: { slug: currentNewsSlug },
    select: { tags: { select: { id: true } } },
  });

  // Если текущий пост не найден или у него нет тегов
  if (!currentPost || !currentPost.tags || currentPost.tags.length === 0) {
    return [];
  }

  const tagIds = currentPost.tags.map((tag) => tag.id); // Извлекаем ID тегов

  const similarNews = await dataBase.news.findMany({
    where: {
      slug: { not: currentNewsSlug },
      tags: {
        some: { id: { in: tagIds } }, // Ищем записи, у которых хотя бы один тег совпадает
      },
    },
    orderBy: {
      createdAt: "desc", // Альтернативная сортировка (можно заменить, если поддерживается другая логика)
    },
    take: 10, // Возвращаем максимум 5 записей
  });

  return similarNews;
}
