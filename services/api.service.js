import axios from "axios";

export const getWeather = async (token = "", city = "") => {
  if (!city) {
    throw Error(
      "Не передан город. Воспользуйтесь установкой города командой: -s [CITY]"
    );
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};
