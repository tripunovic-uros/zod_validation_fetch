import { z } from "zod";

const jwtSchema = z.object({
  access_token: z.string().jwt(),
}); //.passthrough() //if we want to passthrough uknown keys

type JWT = z.infer<typeof jwtSchema>;

const apiErrorSchema = z.object({
  error: z.string(),
  error_description: z.optional(z.string()),
});

const fetchAccessToken = async (
  flag: boolean,
): Promise<
  JWT | "Server down" | "Invalid api call" | "Unexpected api error"
> => {
  try {
    const res = await fetch(`localhost:3000/endpoint?flag=${flag}`);
    const json = await res.json();

    if (jwtSchema.safeParse(json).success) {
      return json.access_token;
    }

    const not_ok = apiErrorSchema.safeParse(json);
    if (not_ok.success) {
      console.error(res.status, not_ok.data);
      return "Invalid api call";
    }

    return "Unexpected api error";
  } catch (error) {
    console.error(error);
    return "Server down";
  }
};

//Status code 200
console.log("\x1b[38;5;46m%s\x1b[0m", await fetchAccessToken(true));
//Status code greater than 299
console.log("\x1b[38;5;214m%s\x1b[0m", await fetchAccessToken(false));
