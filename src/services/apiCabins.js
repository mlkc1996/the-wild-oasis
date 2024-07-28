import { Cabin } from "../features/cabins/Cabin.model";
import supabase from "./supabase";

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
  const { regular_price, max_capacity, discount, description, name } = cabin;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ regular_price, max_capacity, discount, description, name }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be created.`);
  }

  return Object.assign(new Cabin(), data);
};
