import axios from "axios";

export const getWeather = async (token = "", city = "") => {
  // 2. Делаем запрос на апишку и возвращаем результат

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
