import { dbConnect } from "@/app/api/_utils";
import { warn } from "console";
import { Model, Types } from "mongoose";
export type Selector =
  | string
  | string[]
  | Record<string, number | boolean | object>;
/**
 * Generates a findOne query function for a given model.
 *
 * @template ModelType - The type of the model.
 * @template PropsType - The type of the query properties.
 * @param {ModelType} model - The model to generate the query for.
 * @returns {Function} - The generated query function.
 */
export const generateFindOneQuery = <ModelType extends Model<any>, PropsType>(
  model: ModelType
) => {
  /**
   * Executes a database query based on the provided props and selector.
   * Use this function to retrieve a single document from the database.
   * @param props - The properties used to filter the query.
   *  Can be a document id, or a partial document object.
   * @param selector - The fields to select from the query results.
   * @returns A promise that resolves to the query results, or null if an error occurs.
   */
  const query = async (props: PropsType, selector?: Selector) => {
    try {
      await dbConnect();
      let results;
      if (typeof props === "string" || props instanceof Types.ObjectId) {
        results = model.findById(props);
      } else {
        results = model.findOne(props as any);
      }
      if (selector) {
        results.select(selector);
      }
      return await results.exec();
    } catch (error) {
      warn(error);
      return null;
    }
  };
  return query;
};

export const generateFindQuery = <ModelType extends Model<any>, PropsType>(
  model: ModelType
) => {
  /**
   * Executes a database query with the specified properties and optional selector.
   * @param props The properties to filter the query by.
   * @param selector The optional selector to specify the fields to include in the query results.
   * @returns A promise that resolves to the query results, or null if an error occurs.
   */
  const query = async (props: PropsType, selector?: Selector) => {
    try {
      await dbConnect();
      let results;
      results = model.find(props as any);
      if (selector) {
        results.select(selector);
      }
      return await results.exec();
    } catch (error) {
      warn(error);
      return null;
    }
  };
  return query;
};
