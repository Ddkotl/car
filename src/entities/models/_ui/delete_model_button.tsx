"use client";

import { useAppSession } from "@/entities/user/session";
import { Button } from "@/shared/components";
import { useRouter } from "next/navigation";
import { deleteModelBySlug } from "../_actions/delete_model_by_slug";

export const DeleteModelButton = ({ slug }: { slug: string }) => {
  const session = useAppSession();
  const router = useRouter();
  if (!session) {
    return null;
  }
  if (session.data?.user.role !== "ADMIN") {
    return null;
  }

  const handleDelete = async () => {
    await deleteModelBySlug(slug);
    router.push("/brands");
  };
  return (
    <Button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-md">
      Delete Current Model
    </Button>
  );
};
