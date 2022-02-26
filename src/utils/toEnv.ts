// write a function taht converts json to env variables
export const toEnv = (json: string): string => {
  const parsed = JSON.parse(json);
  const envs: string[] = [];

  Object.keys(parsed).forEach((key) => {
    envs.push(`${key}=${parsed[key]}\n`);
  });

  return envs.join("");
};
