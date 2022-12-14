import { useEffect, useState } from "react";
import API_KEY from "./env";
import { Weather } from "./weatherType";

const useWeather = () => {
  const [weather, setWeather] = useState<Weather>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const updateWeather = async () => {
    setLoading(true);
    try {
      const response = fetch(
        "https://weatherapi-com.p.rapidapi.com/current.json?q=Grenoble",
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      const res = (await (await response).json()) as Weather;
      setWeather(res);
    } catch (err) {
      console.error(err);
      setError("Fail to fetch weather");
    }
    setLoading(false);
  };

  useEffect(() => {
    updateWeather();
  }, []);

  return { weather, loading, error, refetch: updateWeather };
};

export default useWeather;
