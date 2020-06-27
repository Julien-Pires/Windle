import { SvgProps } from 'react-native-svg';

import dayBrokenClouds from '../../../assets/icons/weather/conditions/day/broken-clouds.svg';
import dayClear from '../../../assets/icons/weather/conditions/day/clear.svg';
import dayFewClouds from '../../../assets/icons/weather/conditions/day/few-clouds.svg';
import dayFreezingRain from '../../../assets/icons/weather/conditions/day/freezing-rain.svg';
import dayHeavyRain from '../../../assets/icons/weather/conditions/day/heavy-rain.svg';
import dayLightSnow from '../../../assets/icons/weather/conditions/day/light-snow.svg';
import dayOvercastClouds from '../../../assets/icons/weather/conditions/day/overcast-clouds.svg';
import dayRain from '../../../assets/icons/weather/conditions/day/rain.svg';
import dayShowerRain from '../../../assets/icons/weather/conditions/day/shower-rain.svg';
import daySnow from '../../../assets/icons/weather/conditions/day/snow.svg';
import dayStorm from '../../../assets/icons/weather/conditions/day/storm.svg';
import dayTornado from '../../../assets/icons/weather/conditions/day/tornado.svg';
import nightBrokenClouds from '../../../assets/icons/weather/conditions/night/broken-clouds.svg';
import nightClear from '../../../assets/icons/weather/conditions/night/clear.svg';
import nightFewClouds from '../../../assets/icons/weather/conditions/night/few-clouds.svg';
import nightFreezingRain from '../../../assets/icons/weather/conditions/night/freezing-rain.svg';
import nightHeavyRain from '../../../assets/icons/weather/conditions/night/heavy-rain.svg';
import nightLightSnow from '../../../assets/icons/weather/conditions/night/light-snow.svg';
import nightOvercastClouds from '../../../assets/icons/weather/conditions/night/overcast-clouds.svg';
import nightRain from '../../../assets/icons/weather/conditions/night/rain.svg';
import nightShowerRain from '../../../assets/icons/weather/conditions/night/shower-rain.svg';
import nightSnow from '../../../assets/icons/weather/conditions/night/snow.svg';
import nightStorm from '../../../assets/icons/weather/conditions/night/storm.svg';
import nightTornado from '../../../assets/icons/weather/conditions/night/tornado.svg';

export interface ConditionIcons {
    BrokenClouds: React.FC<SvgProps>,
    Clear: React.FC<SvgProps>,
    FewClouds: React.FC<SvgProps>,
    FreezingRain: React.FC<SvgProps>,
    HeavyRain: React.FC<SvgProps>,
    LightSnow: React.FC<SvgProps>,
    OvercastClouds: React.FC<SvgProps>,
    Rain: React.FC<SvgProps>,
    ShowerRain: React.FC<SvgProps>,
    Snow: React.FC<SvgProps>,
    Storm: React.FC<SvgProps>,
    Tornado: React.FC<SvgProps>
}

export const dayConditions : ConditionIcons = {
    BrokenClouds: dayBrokenClouds,
    Clear: dayClear,
    FewClouds: dayFewClouds,
    FreezingRain: dayFreezingRain,
    HeavyRain: dayHeavyRain,
    LightSnow: dayLightSnow,
    OvercastClouds: dayOvercastClouds,
    Rain: dayRain,
    ShowerRain: dayShowerRain,
    Snow: daySnow,
    Storm: dayStorm,
    Tornado: dayTornado
}

export const nightConditions : ConditionIcons= {
    BrokenClouds: nightBrokenClouds,
    Clear: nightClear,
    FewClouds: nightFewClouds,
    FreezingRain: nightFreezingRain,
    HeavyRain: nightHeavyRain,
    LightSnow: nightLightSnow,
    OvercastClouds: nightOvercastClouds,
    Rain: nightRain,
    ShowerRain: nightShowerRain,
    Snow: nightSnow,
    Storm: nightStorm,
    Tornado: nightTornado
}
