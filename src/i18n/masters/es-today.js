// Frases cortas para la pestaña Hoy (conclusión → punto clave → detalles). Áreas: dinero · amor · trabajo · salud
export default {
  badge: [[80, 'Un gran día', 'good'], [68, 'Un buen día', 'good'], [52, 'Un día normal', 'mid'], [40, 'Un día para cuidarse', 'warn'], [0, 'Un día para descansar', 'warn']],
  lvl: { good: 'Bien', mid: 'Normal', warn: 'Cuidado' },
  sumTitle: 'Hoy en 3 líneas',
  sumBest: 'Mejor área',
  sumCare: 'Área a vigilar',
  sumNone: 'Nada importante que vigilar',
  sumHour: 'Mejor hora',
  domTitle: 'Fortuna por áreas',
  domHint: 'Toca para ver detalles',
  more: 'Leer más',
  less: 'Ver menos',
  basisFold: 'Base del saju de hoy',
  word: {
    wealth: ['Día de fugas', 'Día de ahorro', 'Día estable', 'Día de entradas', 'Día de abundancia'],
    love: ['Día de cruces', 'Día de cuidado', 'Día acogedor', 'Día de mariposas', 'Día radiante'],
    work: ['Día de aguante', 'Día de detalle', 'Día de orden', 'Día de reconocimiento', 'Día de liderar'],
    health: ['Día de descanso', 'Día tranquilo', 'Día estable', 'Día animado', 'Día a tope'],
  },
  care: { wealth: 'Ojo al gasto impulsivo', love: 'Ojo a tus palabras', work: 'Ojo a fallos y plazos', health: 'Ojo al exceso' },
  lead: {
    wealth: [
      ['Hoy el dinero se escapa con facilidad. Mantén la cartera cerrada.', 'Surgen gastos inesperados con facilidad. Pasa los pagos a mañana.', 'Hoy las preocupaciones de dinero pueden meterte prisa. Evita grandes decisiones.'],
      ['La tentación de gastar es alta. Deja las grandes decisiones para mañana.', 'Lo que entra sale con facilidad. Compra solo lo que necesites.', 'Hoy conservar es ganar. Vigila primero los gastos pequeños.'],
      ['El dinero fluye estable. Basta con gastar según lo planeado.', 'Nada sube ni baja mucho. Mantén tu hábito de ahorro.', 'Tu ritmo de siempre está bien. No aplaces las liquidaciones.'],
      ['Hoy puede llegarte dinero. Ocúpate de las liquidaciones.', 'Un buen flujo de dinero. Saca esa conversación de dinero que aplazaste.', 'Hoy se llenan las ganancias reales. No dejes pasar las pequeñas oportunidades.'],
      ['La suerte con el dinero está abierta de par en par. Aprovecha la oportunidad cuando llegue.', 'El dinero y la oportunidad llegan juntos. Bueno para contratos y liquidaciones.', 'Un día de gran cosecha. Aparta una parte de lo que entra.'],
    ],
    love: [
      ['Hoy los corazones se cruzan con facilidad. Cuando las emociones suben, habla menos.', 'Los malentendidos llegan con facilidad. Pregunta en vez de adivinar.', 'Las relaciones están sensibles. Tómate un tiempo para ti.'],
      ['Hoy las prisas lo desajustan todo. Mantén tu propio ritmo.', 'Expresarte puede resultar torpe. Sé breve y amable.', 'Las expectativas se adelantan con facilidad. Cumple primero las promesas pequeñas.'],
      ['Hoy hay más comodidad que mariposas. Disfruta de la dulzura cotidiana.', 'Las relaciones están en calma. Di una palabra de agradecimiento.', 'Un día tranquilo. Pasa tiempo con alguien cercano.'],
      ['Hoy los corazones conectan bien. Escribe tú primero.', 'Vienen mariposas. Haz un plan para quedar.', 'Un buen día para mostrar que alguien te gusta. Sé valiente.'],
      ['Hoy brilla tu encanto. Genial para confesiones y citas.', 'La suerte en el amor está abierta de par en par. Ve hacia quien te atrae.', 'Hoy el amor se hace más profundo. Crea un momento especial.'],
    ],
    work: [
      ['Hoy el trabajo se enreda con facilidad. Céntrate en lo básico.', 'Hoy la presión es fuerte. Aguantar también es una destreza.', 'Los errores crecen con facilidad. Revisa dos veces.'],
      ['Un día que pide cuidado. Revisa documentos y plazos.', 'Hoy las prisas te cuestan caro. Hazlo todo en orden.', 'Un día para terminar lo que está en marcha más que para empezar algo nuevo.'],
      ['Podrás con tus tareas sin problema. Despacha lo pendiente.', 'Tu destreza habitual basta. Apunta las tareas de mañana.', 'Un buen día para ordenar. Despeja tu mesa y tu agenda.'],
      ['Un buen día para el reconocimiento. Prepara informes y presentaciones.', 'El trabajo en equipo va bien. Pide ayuda.', 'Hoy se ven los resultados. Levanta la mano cuando llegue la oportunidad.'],
      ['El trabajo fluye bien. Haz hoy lo importante.', 'Tus habilidades brillan. Da un paso al frente.', 'Todo lo que emprendes da fruto. Haz un gran movimiento.'],
    ],
    health: [
      ['Hoy tu cuerpo se cansa primero. Descansar es tu tarea.', 'Tu estado baja. Recorta tu agenda.', 'Exigirte de más trae problemas. Acuéstate temprano.'],
      ['El cansancio se acumula con facilidad. Haz pausas a menudo.', 'Ahorra energía. Evita comer y beber en exceso.', 'Tu cuerpo se siente pesado. Suéltalo con estiramientos suaves.'],
      ['Tu estado es estable. Sigue con tu ejercicio habitual.', 'Tu cuerpo está en equilibrio. Bebe agua a menudo.', 'Nada fuera de lo normal. Solo cuida el sueño y las comidas.'],
      ['La recuperación es rápida. Muévete un poco más de lo habitual.', 'La energía sube. Prueba un ejercicio nuevo.', 'Tu cuerpo se siente ligero. Los paseos y el aire libre te sientan genial.'],
      ['Lleno de energía. Atrévete con algo físico.', 'Estado óptimo. Haz ese ejercicio que aplazaste.', 'Cuerpo y mente se sienten ligeros. Muévete cuanto quieras.'],
    ],
  },
  todo: {
    wealth: {
      up: ['Resuelve liquidaciones o reembolsos atrasados', 'Saca hoy el tema del dinero', 'Busca otra fuente de ingresos', 'Apunta las buenas ofertas', 'Aparta enseguida una parte de lo que entra', 'Compara precios una vez más'],
      down: ['Apunta antes de dormir lo que gastaste hoy', 'Deja reposar el carrito un día antes de pagar', 'Revisa tus suscripciones', 'Echa un vistazo a tus gastos fijos', 'Revisa tu flujo de caja', 'Anota solo lo que de verdad necesitas'],
      no: ['Grandes decisiones de inversión o préstamo', 'Compras impulsivas', 'Prestar dinero', 'Comprar a plazos'],
    },
    love: {
      up: ['Saluda tú primero', 'Agradece algo en voz alta', 'Haz planes para quedar', 'Fíjate en sus pequeños cambios', 'Ve a una reunión nueva', 'Muestra que te gusta'],
      down: ['Ordena tus sentimientos heridos antes de compartirlos', 'Escúchale hasta el final', 'Tómate un tiempo para ti', 'Relee los mensajes antes de enviarlos', 'Haz una pausa cuando suban las emociones', 'Cumple primero las promesas pequeñas'],
      no: ['Decisiones emocionales', 'Sacar el pasado', 'Presionar para que responda', 'Comparar'],
    },
    work: {
      up: ['Presenta hoy los informes importantes', 'Comparte tus ideas con decisión', 'Resuelve primero lo que pide trabajo en equipo', 'Levanta la mano cuando llegue una oportunidad', 'Haz lo difícil en tus horas de concentración', 'Apunta lo que aprendiste hoy'],
      down: ['Revisa dos veces documentos y plazos', 'Elige y apunta solo tres tareas', 'Pregunta enseguida cuando dudes', 'Termina primero lo que empezaste', 'Pon recordatorios a las citas clave', 'Ordena tu mesa y tus archivos'],
      no: ['Decisiones precipitadas', 'Prometer de más', 'Entregar sin revisar', 'Respuestas emocionales'],
    },
    health: {
      up: ['Da un paseo o haz algo de ejercicio suave', 'Toma un poco de sol', 'Empieza un ejercicio nuevo', 'Bebe agua a menudo', 'Empieza el día estirando', 'Pasa más tiempo al aire libre'],
      down: ['Acuéstate temprano', 'Deja pausas entre tus planes', 'Cuida tu estómago con comida caliente', 'Suelta a menudo hombros y cuello', 'Descansa la vista tras mucho rato de pantalla', 'Tómate un momento para respirar hondo'],
      no: ['Pasar la noche en vela', 'Comer y beber en exceso', 'Forzar demasiado el ejercicio', 'Demasiada cafeína'],
    },
  },
};
