export const getModelDeclension = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11)
    return "модель";
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  )
    return "модели";
  return "моделей";
};

export const getTransmissionDeclension = (
  count: number,
) => {
  if (count % 10 === 1 && count % 100 !== 11)
    return "трансмиссия";
  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  )
    return "трансмиссии";
  return "трансмиссий";
};
