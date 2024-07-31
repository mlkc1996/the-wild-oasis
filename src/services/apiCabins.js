import { Cabin } from "../features/cabins/Cabin.model";
import supabase, { supabase_url } from "./supabase";
import { v4 as uuidv4 } from "uuid";
export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded.`);
  }

  cabins.sort((a, b) => a.id - b.id);

  return cabins;
};
export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted.`);
  }
};

export const createOrUpdateCabin = async (cabin) => {
  const {
    id,
    regular_price,
    max_capacity,
    discount,
    description,
    name,
    image,
  } = cabin;

  let image_url = image;
  let file_name = "";

  if (typeof image !== "string") {
    file_name = `${uuidv4()}.${/[^.]+$/.exec(image.name)}`;
    image_url = `${supabase_url}/storage/v1/object/public/canbin-images/${file_name}`;
  }

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([
      {
        regular_price,
        max_capacity,
        discount,
        description,
        name,
        image: image_url,
      },
    ]);
  } else {
    query = query.update(cabin).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created.`);
  }

  if (file_name) {
    try {
      await uploadImage(file_name, image);
    } catch (err) {
      if (!id) {
        await deleteCabin(data.id);
      }
      throw new Error(
        "Cabin image could not be uploaded, and new cabin could not be added."
      );
    }
  }

  return { ...data, updated: !!id };
};

const uploadImage = async (file_name, file) => {
  const { data, error } = await supabase.storage
    .from("canbin-images")
    .upload(file_name, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(error);
    throw new Error(`Cabin image could not be uploaded.`);
  }
};
