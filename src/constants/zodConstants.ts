import { z } from "zod";

export const loginValidator = z.object({
  username: z.string().min(1, { message: "Enter a Username" }),
  password: z.string().min(1, { message: "Enter a Password" }),
});

export const baseMediaFormValidator = z.object({
  id: z.string().length(11).optional(),
  name: z.string().min(1, { message: "Enter a Name" }),
  newWatchDate: z.preprocess(
    (data) => (data === "" ? undefined : data),
    z
      .string()
      .regex(/^20[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1])$/, {
        message: "Enter a Valid Date",
      })
      .optional()
      .transform((data) => (data === "" ? undefined : data))
  ),
  watchDatesToRemove: z
    .array(
      z
        .string()
        .regex(/^20[0-9]{2}-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1])$/, {
          message: "Invalid Removal Date",
        })
    )
    .optional(),
  image: z
    .string()
    .refine(
      (data) => {
        const [format, imgStr] = data.split(";base64,");
        const fileExtension = format.split("/")[1];
        return (
          ["jpg", "jpeg", "png"].includes(fileExtension) &&
          /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(
            imgStr
          )
        );
      },
      { message: "Invalid Image" }
    )
    .optional(),
});

export const animeMediaFormValidator = baseMediaFormValidator.extend({
  genres: z.string().regex(/^([a-zA-Z ]+\/)*[a-zA-Z ]+$/, {
    message: "Enter a Valid List of Genres",
  }),
  rating: z
    .number()
    .min(1, { message: "Enter a Rating between 1 and 5" })
    .max(5, { message: "Enter a Rating between 1 and 5" }),
  infoLink: z.string().regex(/^[0-9]+$/, { message: "Enter a Valid MAL Code" }),
});
