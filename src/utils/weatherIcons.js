import { ReactComponent as SunnyIcon } from '../assets/sunny.svg';
import { ReactComponent as CloudyIcon } from '../assets/cloud.svg';
import { ReactComponent as RainyIcon } from '../assets/rainy.svg';
export const getWeatherIcon = (description) => {
  switch (description) {
    case 'clear sky':
      return <SunnyIcon className="w-12 h-12" />;
    case 'few clouds':
      return <CloudyIcon className="w-12 h-12" />;
    case 'rain':
      return <RainyIcon className="w-12 h-12" />;
    default:
      return <SunnyIcon className="w-12 h-12" />;
  }
};
