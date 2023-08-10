export interface WeatherAPIData {
  main: {
    temp: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

export interface WeatherData {
  temp: number;
  description: string;
  windSpeed: number;
  name: string;
  title: string;
}
