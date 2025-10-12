export const en = {
  translation: {
    // Idiomas
    languages: {
      english: 'English',
      spanish: 'Spanish',
    },
    
    // Ciudades
    cities: {
      london: 'London',
      toronto: 'Toronto',
      singapore: 'Singapore',
    },
    
    // Pantalla principal
    weather: {
      title: 'Weather',
      current: 'Current Weather',
      forecast: 'Daily Forecast',
      hourlyForecast: 'Hourly Forecast',
      humidity: 'Humidity',
      humidityLow: 'Low',
      humidityNormal: 'Normal',
      humidityHigh: 'High',
      wind: 'Wind',
      windLight: 'Light breeze',
      windModerate: 'Moderate wind',
      windStrong: 'Strong wind',
      feelsLike: 'Feels Like',
      feelsLikeSimilar: 'Similar',
      feelsLikeWarmer: 'Warmer',
      feelsLikeCooler: 'Cooler',
      pressure: 'Pressure',
      pressureLow: 'Low pressure',
      pressureNormal: 'Normal',
      pressureHigh: 'High pressure',
      cloudiness: 'Cloudiness',
      cloudinessClear: 'Clear sky',
      cloudinessPartly: 'Partly cloudy',
      cloudinessMostly: 'Mostly cloudy',
      cloudinessOvercast: 'Overcast',
      visibility: 'Visibility',
      visibilityExcellent: 'Excellent',
      visibilityGood: 'Good',
      visibilityModerate: 'Moderate',
      visibilityPoor: 'Poor',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      sunSchedule: 'Sun',
      showMore: 'Show more',
      showLess: 'Show less',
      temperature: '{{temp}}°C',
      max: 'Max',
      min: 'Min',
      loading: 'Loading weather data...',
      error: 'Unable to load weather data',
      refresh: 'Pull to refresh',
    },
    
    // Pantalla de pronóstico diario
    dailyForecast: {
      title: 'Daily Forecast',
      dayForecast: 'Day Forecast',
      temperature: 'Temperature',
      temperatureRange: 'Temperature Range',
      precipitation: 'Precipitation',
      chanceOfRain: 'Chance of rain',
      rainExpected: 'Rain expected during the day',
      noRainExpected: 'No rain expected',
      noData: 'No data available',
      feelsLike: 'Feels Like',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      visibility: 'Visibility',
      cloudCover: 'Cloud Cover',
      weather: 'Weather',
      precipitationTotal: 'Precipitation',
      dailySummary: 'Summary',
    },
    
    // Días de la semana
    days: {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    },
    
    // Días de la semana completos
    daysFull: {
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday',
      sunday: 'Sunday',
    },
    
    // Errores
    error: {
      title: 'Error',
      dayNotAvailable: 'This day is not available in the forecast',
    },

    // Formulario de contacto
    contact: {
      title: 'Contact',
      subtitle: 'Complete the form with your information',
      name: 'Full name',
      namePlaceholder: 'Enter your name',
      birthdate: 'Date of birth',
      birthdatePlaceholder: 'Enter your birth date',
      city: 'City',
      cityPlaceholder: 'Enter your city',
      email: 'E-mail',
      emailPlaceholder: 'example@email.com',
      phone: 'Phone',
      phonePlaceholder: '+34 600 000 000',
      submit: 'Submit',
      cancel: 'Cancel',
      confirm: 'Confirm',
      willHireMe: 'Are you going to hire me?',
      yes: 'Yes',
      no: 'No',
      // Validaciones
      errorAllFields: 'Please complete all fields and activate the switch',
      errorInvalidEmail: 'Please enter a valid email',
      errorInvalidPhone: 'Please enter a valid phone number',
      errorInvalidDate: 'Please enter a valid date (DD/MM/YYYY)',
      requiredField: 'This field is required',
      successTitle: '✅ Valid form',
      successName: 'Name',
      successBirthdate: 'Date of Birth',
      successCity: 'City',
      successEmail: 'Email',
      successPhone: 'Phone',
    },

    // Weather descriptions (OpenWeatherMap codes)
    weatherDescriptions: {
      // Thunderstorm (2xx)
      thunderstormWithLightRain: 'thunderstorm with light rain',
      thunderstormWithRain: 'thunderstorm with rain',
      thunderstormWithHeavyRain: 'thunderstorm with heavy rain',
      lightThunderstorm: 'light thunderstorm',
      thunderstorm: 'thunderstorm',
      heavyThunderstorm: 'heavy thunderstorm',
      raggedThunderstorm: 'ragged thunderstorm',
      thunderstormWithLightDrizzle: 'thunderstorm with light drizzle',
      thunderstormWithDrizzle: 'thunderstorm with drizzle',
      thunderstormWithHeavyDrizzle: 'thunderstorm with heavy drizzle',
      
      // Drizzle (3xx)
      lightIntensityDrizzle: 'light drizzle',
      drizzle: 'drizzle',
      heavyIntensityDrizzle: 'heavy drizzle',
      lightIntensityDrizzleRain: 'light drizzle rain',
      drizzleRain: 'drizzle rain',
      heavyIntensityDrizzleRain: 'heavy drizzle rain',
      showerRainAndDrizzle: 'shower rain and drizzle',
      heavyShowerRainAndDrizzle: 'heavy shower rain and drizzle',
      showerDrizzle: 'shower drizzle',
      
      // Rain (5xx)
      lightRain: 'light rain',
      moderateRain: 'moderate rain',
      heavyIntensityRain: 'heavy rain',
      veryHeavyRain: 'very heavy rain',
      extremeRain: 'extreme rain',
      freezingRain: 'freezing rain',
      lightIntensityShowerRain: 'light shower rain',
      showerRain: 'shower rain',
      heavyIntensityShowerRain: 'heavy shower rain',
      raggedShowerRain: 'ragged shower rain',
      
      // Snow (6xx)
      lightSnow: 'light snow',
      snow: 'snow',
      heavySnow: 'heavy snow',
      sleet: 'sleet',
      lightShowerSleet: 'light shower sleet',
      showerSleet: 'shower sleet',
      lightRainAndSnow: 'light rain and snow',
      rainAndSnow: 'rain and snow',
      lightShowerSnow: 'light shower snow',
      showerSnow: 'shower snow',
      heavyShowerSnow: 'heavy shower snow',
      
      // Atmosphere (7xx)
      mist: 'mist',
      smoke: 'smoke',
      haze: 'haze',
      sandDustWhirls: 'sand/dust whirls',
      fog: 'fog',
      sand: 'sand',
      dust: 'dust',
      volcanicAsh: 'volcanic ash',
      squalls: 'squalls',
      tornado: 'tornado',
      
      // Clear (800)
      clearSky: 'clear sky',
      
      // Clouds (80x)
      fewClouds: 'few clouds',
      scatteredClouds: 'scattered clouds',
      brokenClouds: 'broken clouds',
      overcastClouds: 'overcast clouds',
    },
  },
};
