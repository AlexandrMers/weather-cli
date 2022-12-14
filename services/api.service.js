import axios from "axios";
import emoji from "node-emoji";

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return emoji.get("sun_with_face");
    case "02":
      return "đ¤ī¸";
    case "03":
      return emoji.get("barely_sunny");
    case "04":
      return emoji.get("barely_sunny");
    case "09":
      return "đ§ī¸";
    case "10":
      return "đĻī¸";
    case "11":
      return "đŠī¸";
    case "13":
      return "âī¸";
    case "50":
      return "đĢī¸";
  }
};

export const getWeather = async (token = "", city = "") => {
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
