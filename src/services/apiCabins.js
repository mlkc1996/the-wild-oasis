import { Cabin } from "../features/cabins/Cabin.model";
import supabase, { supabase_url } from "./supabase";
import { v4 as uuidv4 } from "uuid";
export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error(`Cabins could not be loaded.`);
  }

  return cabins.map((cabin) => Object.assign(new Cabin(), cabin));
};
export const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be deleted.`);
  }
};

export const createCabin = async (cabin) => {
  const { regular_price, max_capacity, discount, description, name, image } =
    cabin;
  const file_name = `${uuidv4()}.${/[^.]+$/.exec(image.name)}`;
  const image_url = `${supabase_url}/storage/v1/object/public/canbin-images/${file_name}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        regular_price,
        max_capacity,
        discount,
        description,
        name,
        image: image_url,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created.`);
  }

  await uploadImage(file_name, image);

  return Object.assign(new Cabin(), data);
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
