import { dataBase } from "@/shared/lib/db_connect";

export const checkModelsExisting = async (
  models: {
    model: string;
    url: string;
    prev_img: string;
  }[],
) => {
  const modelNotExists: {
    model: string;
    url: string;
    prev_img: string;
  }[] = [];
  for (const model of models) {
    const isModelAlreadyExist = await dataBase.carsModels.findUnique({
      where: { short_name: model.model },
    });
    if (!isModelAlreadyExist) {
      modelNotExists.push(model);
    }
  }
  return modelNotExists;
};
