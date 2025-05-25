export function cleanAndParseTags(inputString: string): string[] {
  try {
    // Убираем лишние символы
    let cleanedString = inputString
      .replace(/[^a-zA-Zа-яА-Я0-9,\s'\[\]]/g, "") // Убираем лишние символы
      .trim() // Убираем пробелы в начале и в конце строки
      .toLowerCase(); // Преобразуем в нижний регистр

    // Заменяем одинарные кавычки на двойные и убираем лишние пробелы
    cleanedString = cleanedString.replace(/,\s*/g, ",").replace(/'/g, '"');

    cleanedString = cleanedString.replace(/андроид/gi, "android");
    // Разделяем строку по запятым и пробелам, очищаем теги
    let tagArray = cleanedString
      .split(/[,]+/) // Разделяем по запятым
      .map((tag) => tag.trim()) // Убираем пробелы
      .filter((tag) => tag.length > 0 && tag.length < 25); // Убираем пустые строки

    // Если больше 3-х тегов, удаляем самые длинные
    if (tagArray.length > 3) {
      tagArray = tagArray
        .sort((a, b) => a.length - b.length) // Сортируем от короткого к длинному
        .slice(0, 3); // Берем первые 3 элемента
    }

    return tagArray;
  } catch (error) {
    console.error("Ошибка обработки строки:", error);
    return [];
  }
}
