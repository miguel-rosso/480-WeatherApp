export const es = {
  translation: {
    // Idiomas
    languages: {
      english: 'Inglés',
      spanish: 'Español',
    },

    // Ciudades
    cities: {
      london: 'Londres',
      toronto: 'Toronto',
      singapore: 'Singapur',
    },

    // Pantalla principal
    weather: {
      title: 'Clima',
      current: 'Clima Actual',
      forecast: 'Pronóstico Diario',
      hourlyForecast: 'Pronóstico por Hora',
      humidity: 'Humedad',
      humidityLow: 'Baja',
      humidityNormal: 'Normal',
      humidityHigh: 'Alta',
      wind: 'Viento',
      windLight: 'Brisa ligera',
      windModerate: 'Viento moderado',
      windStrong: 'Viento fuerte',
      feelsLike: 'Sensación térmica',
      feelsLikeSimilar: 'Similar',
      feelsLikeWarmer: 'Más cálido',
      feelsLikeCooler: 'Más frío',
      pressure: 'Presión',
      pressureLow: 'Presión baja',
      pressureNormal: 'Normal',
      pressureHigh: 'Presión alta',
      cloudiness: 'Nubosidad',
      cloudinessClear: 'Cielo despejado',
      cloudinessPartly: 'Parcialmente nublado',
      cloudinessMostly: 'Muy nublado',
      cloudinessOvercast: 'Cubierto',
      visibility: 'Visibilidad',
      visibilityExcellent: 'Excelente',
      visibilityGood: 'Buena',
      visibilityModerate: 'Moderada',
      visibilityPoor: 'Pobre',
      sunrise: 'Amanecer',
      sunset: 'Atardecer',
      sunSchedule: 'Sol',
      showMore: 'Ver más',
      showLess: 'Ver menos',
      temperature: '{{temp}}°C',
      max: 'Máx',
      min: 'Mín',
      loading: 'Cargando datos del clima...',
      error: 'No se pudo cargar el clima',
      refresh: 'Desliza para actualizar',
    },

    // Pantalla de pronóstico diario
    dailyForecast: {
      title: 'Pronóstico Diario',
      dayForecast: 'Pronóstico del Día',
      temperature: 'Temperatura',
      temperatureRange: 'Rango de Temperatura',
      precipitation: 'Precipitación',
      chanceOfRain: 'Probabilidad de lluvia',
      rainExpected: 'Se espera lluvia durante el día',
      noRainExpected: 'No se espera lluvia',
      noData: 'No hay datos disponibles',
      feelsLike: 'Sensación Térmica',
      humidity: 'Humedad',
      windSpeed: 'Viento',
      visibility: 'Visibilidad',
      cloudCover: 'Nubosidad',
      weather: 'Clima',
      precipitationTotal: 'Precipitación',
      dailySummary: 'Resumen',
    },

    // Días de la semana
    days: {
      monday: 'Lun',
      tuesday: 'Mar',
      wednesday: 'Mié',
      thursday: 'Jue',
      friday: 'Vie',
      saturday: 'Sáb',
      sunday: 'Dom',
    },
    
    // Días de la semana completos
    daysFull: {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo',
    },
    
    // Errores
    error: {
      title: 'Error',
      dayNotAvailable: 'Este día no está disponible en el pronóstico',
    },

    // Formulario de contacto
    contact: {
      title: 'Contacto',
      subtitle: 'Completa el formulario con tus datos',
      name: 'Nombre completo',
      namePlaceholder: 'Ingresa tu nombre',
      birthdate: 'Fecha de nacimiento',
      birthdatePlaceholder: 'Ingresa tu fecha de nacimiento',
      city: 'Ciudad',
      cityPlaceholder: 'Ingresa tu ciudad',
      email: 'E-mail',
      emailPlaceholder: 'ejemplo@correo.com',
      phone: 'Teléfono',
      phonePlaceholder: '+34 600 000 000',
      submit: 'Enviar',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      willHireMe: '¿Vais a contratarme?',
      yes: 'Sí',
      no: 'No',
      // Validaciones
      errorAllFields: 'Por favor, completa todos los campos y activa el switch',
      errorInvalidEmail: 'Por favor, introduce un email válido',
      errorInvalidPhone: 'Por favor, introduce un teléfono válido',
      errorInvalidDate: 'Por favor, introduce una fecha válida (DD/MM/AAAA)',
      requiredField: 'Este campo es obligatorio',
      successTitle: '✅ Formulario válido',
      successName: 'Nombre',
      successBirthdate: 'Fecha de Nacimiento',
      successCity: 'Ciudad',
      successEmail: 'Email',
      successPhone: 'Teléfono',
    },

    // Weather descriptions (OpenWeatherMap codes)
    weatherDescriptions: {
      // Thunderstorm (2xx)
      thunderstormWithLightRain: 'tormenta con lluvia ligera',
      thunderstormWithRain: 'tormenta con lluvia',
      thunderstormWithHeavyRain: 'tormenta con lluvia intensa',
      lightThunderstorm: 'tormenta ligera',
      thunderstorm: 'tormenta',
      heavyThunderstorm: 'tormenta intensa',
      raggedThunderstorm: 'tormenta irregular',
      thunderstormWithLightDrizzle: 'tormenta con llovizna ligera',
      thunderstormWithDrizzle: 'tormenta con llovizna',
      thunderstormWithHeavyDrizzle: 'tormenta con llovizna intensa',
      
      // Drizzle (3xx)
      lightIntensityDrizzle: 'llovizna ligera',
      drizzle: 'llovizna',
      heavyIntensityDrizzle: 'llovizna intensa',
      lightIntensityDrizzleRain: 'llovizna con lluvia ligera',
      drizzleRain: 'llovizna con lluvia',
      heavyIntensityDrizzleRain: 'llovizna con lluvia intensa',
      showerRainAndDrizzle: 'chubascos con llovizna',
      heavyShowerRainAndDrizzle: 'chubascos intensos con llovizna',
      showerDrizzle: 'chubascos de llovizna',
      
      // Rain (5xx)
      lightRain: 'lluvia ligera',
      moderateRain: 'lluvia moderada',
      heavyIntensityRain: 'lluvia intensa',
      veryHeavyRain: 'lluvia muy intensa',
      extremeRain: 'lluvia extrema',
      freezingRain: 'lluvia helada',
      lightIntensityShowerRain: 'chubascos ligeros',
      showerRain: 'chubascos',
      heavyIntensityShowerRain: 'chubascos intensos',
      raggedShowerRain: 'chubascos irregulares',
      
      // Snow (6xx)
      lightSnow: 'nieve ligera',
      snow: 'nieve',
      heavySnow: 'nieve intensa',
      sleet: 'aguanieve',
      lightShowerSleet: 'chubascos ligeros de aguanieve',
      showerSleet: 'chubascos de aguanieve',
      lightRainAndSnow: 'lluvia y nieve ligera',
      rainAndSnow: 'lluvia y nieve',
      lightShowerSnow: 'chubascos ligeros de nieve',
      showerSnow: 'chubascos de nieve',
      heavyShowerSnow: 'chubascos intensos de nieve',
      
      // Atmosphere (7xx)
      mist: 'neblina',
      smoke: 'humo',
      haze: 'bruma',
      sandDustWhirls: 'remolinos de arena/polvo',
      fog: 'niebla',
      sand: 'arena',
      dust: 'polvo',
      volcanicAsh: 'ceniza volcánica',
      squalls: 'turbonadas',
      tornado: 'tornado',
      
      // Clear (800)
      clearSky: 'cielo despejado',
      
      // Clouds (80x)
      fewClouds: 'pocas nubes',
      scatteredClouds: 'nubes dispersas',
      brokenClouds: 'muy nuboso',
      overcastClouds: 'nublado',
    },
  },
};
