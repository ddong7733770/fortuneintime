// Comentarios ampliados por área (pestaña Hoy: dinero · amor · trabajo/estudio · salud / Hana: el flujo del amor de hoy)
// Se añaden a los conjuntos base: flow, more, why, caution·chance·tip, act. Niveles [0 bajo · 1 medio · 2 bueno]
export const FORTUNE_DOM = {
  wealth: {
    flow: [
      ['Hoy es fácil detectar las fugas en tus gastos.', 'Hoy pon más peso en conservar el dinero que en ganarlo.', 'Hoy el flujo del dinero se toma un breve descanso.', 'Las tentaciones de gasto pueden parecer mayores que de costumbre.'],
      ['El dinero fluye más o menos a su ritmo habitual.', 'Un día que probablemente pase sin grandes ganancias ni pérdidas.', 'Hoy gastas según lo planeado y ganas según lo planeado.', 'La suerte con el dinero es intermedia; cómo la gestiones marca la diferencia.'],
      ['Hoy los asuntos de dinero van bastante bien.', 'Hoy las pequeñas ganancias se acumulan con gusto.', 'Hoy es fácil ver oportunidades de dinero.', 'Hoy el trabajo con números tiende a salir bien.'],
    ],
    more: [
      ['Pueden colarse gastos inesperados, así que guardar un pequeño colchón te da tranquilidad.', 'Incluso las rebajas que normalmente ignorarías merecen una segunda mirada hoy.', 'Cuando las preocupaciones de dinero te meten prisa, el juicio se nubla con facilidad, así que decide con calma.'],
      ['Basta con equilibrar costes fijos e ingresos y el día pasa sin problemas.', 'Sin grandes cambios, pero los pequeños hábitos con el dinero pueden mover el flujo de este mes.', 'Decide de antemano adónde irá el dinero que entre y el día se sentirá más ordenado.'],
      ['Si tienes liquidaciones o dinero que te deben, reclamarlo hoy tiende a salir bien.', 'También hay margen para dinero inesperado, como un ingreso extra o una bonificación.', 'Haz planes de ahorro mientras el flujo es bueno y esta energía durará más.'],
    ],
    why: {
      pyeon: ['Llega la energía de la Riqueza Inesperada, así que destacan las oportunidades de dinero en movimiento y de tratos.', 'Hoy se mueve la Riqueza Inesperada, así que vale la pena esperar un ingreso extra o una ganancia sorpresa.'],
      jeong: ['Llega la energía de la Riqueza Estable, así que las recompensas tienden a corresponder a tu esfuerzo honesto.', 'Hoy la Riqueza Estable gana fuerza, así que el dinero estable como el sueldo y las liquidaciones fluye bien.'],
      bad: ['Llega la estrella de la Riqueza, pero te pesa, así que es mejor soltar las grandes ambiciones.', 'Hoy la energía de la Riqueza entra como una carga, así que proteger importa más que ganar.'],
      rob: ['Se cuela la energía del Rival, así que el dinero se escapa con facilidad entre la gente.', 'Hoy se mueve el Rival, así que cuidado con prestar dinero o con los gastos compartidos.'],
      output: ['La energía de la Expresión convierte hoy el talento en dinero con facilidad.', 'La Expresión cobra vida, así que tus habilidades e ideas conectan con facilidad con los ingresos.'],
      doc: ['Llega la energía del Recurso, que trae un flujo de dinero a través de documentos o contratos.', 'Hoy se mueve el Recurso, así que ordenar papeles tiende a resolver asuntos de dinero.'],
      none: ['Hoy la estrella de la Riqueza está en calma, así que basta con frenar el gasto no planeado.', 'Hoy la energía del dinero apenas se mueve, así que seguir tus hábitos mantiene las cosas en orden.'],
    },
    caution: ['Activa las alertas de pago con tarjeta para notar las fugas enseguida.', 'Si un amigo te propone una inversión, hoy solo escucha y decide más tarde.', 'Comprueba si pagas suscripciones que no usas.', 'En compraventas de segunda mano o transferencias, revisa dos veces los datos de la otra persona.', 'Evita pagar a plazos hoy.', 'No respondas a peticiones urgentes de dinero hasta comprobarlas directamente.'],
    tip: ['Anotar incluso los gastos pequeños empieza a revelar el flujo.', 'Empieza el pequeño hábito de apartar lo que no gastaste hoy.', 'Ordena los recibos de tu cartera o de la app. Verás adónde va el dinero.', 'Escribe por separado lo que necesitas y lo que quieres.', 'En lugar de un presupuesto mensual, fija uno solo para hoy.', 'Busca ventajas que hayas olvidado, como puntos o cupones.'],
    act: [
      ['Empieza por aplazar un día cualquier pago grande.', 'Revisa tus gastos y reajusta el presupuesto de esta semana.', 'Hoy mantén cortas las conversaciones sobre dinero.'],
      ['Revisa lo que queda del presupuesto de este mes.', 'Encuentra un gasto fijo que puedas recortar.', 'Haz una lista de lo que te deben y de lo que debes. Tu mente se sentirá más ligera.'],
      ['Resuelve la liquidación o la petición de presupuesto que aplazaste.', 'Un buen día para montar un plan de ahorro.', 'Prueba a negociar un precio o ajustar condiciones.'],
    ],
  },
  love: {
    flow: [
      ['Hoy incluso los comentarios pequeños pueden herir con facilidad.', 'Hoy los malentendidos llegan con facilidad en las relaciones.', 'Hoy tu ritmo puede sentirse desacompasado con el de alguien.', 'Hoy un solo mensaje puede sacudir tu corazón.'],
      ['Las relaciones siguen cómodas, sin grandes cambios.', 'La suerte en el amor es estable, así que mantén tu ritmo de siempre.', 'Hoy hay más comodidad que mariposas.', 'Hoy el tiempo con gente conocida te llena el corazón.'],
      ['Hoy entra una energía bienvenida para el amor.', 'Hoy las conversaciones fluyen y los corazones se acercan con facilidad.', 'Vale la pena esperar un encuentro nuevo o un avance en una relación.', 'Hoy tus sentimientos llegan en la medida en que los expresas.'],
    ],
    more: [
      ['Intenta leer su intención antes que su tono y evitarás discusiones innecesarias.', 'Cuando suban las emociones, deja pasar un poco de tiempo antes de responder.', 'En lugar de rumiar el dolor a solas, compártelo con ligereza.'],
      ['Hoy la pequeña amabilidad cotidiana se siente más grande que cualquier evento especial.', 'Un buen momento para mirar tu relación y pensar en lo que agradeces.', 'Si estás soltero, el tiempo sin prisas cuidándote puede atraer tu próximo vínculo.'],
      ['Buen momento para decir lo que normalmente no puedes.', 'Dejas una buena impresión con facilidad en reuniones y presentaciones.', 'Con pareja, un lugar o una experiencia nueva añade chispa.'],
    ],
    why: {
      star: ['{star} entra con fuerza, así que el flujo de los vínculos cobra vida.', '{star} llega hoy, así que la distancia con quien te gusta se acorta con facilidad.'],
      bad: ['La estrella de los vínculos llega como energía pesada, así que hoy es fácil pasarse en las relaciones.', 'La energía de los vínculos pesa, así que equilibra la atracción con la prudencia.'],
      dohwa: ['Llega la energía de la Flor de Durazno, así que las miradas se posan en ti con facilidad.', 'Hoy se mueve la Flor de Durazno, así que tu encanto se nota con naturalidad.'],
      dayHap: ['El lugar de tu pareja (la rama del Día) está en armonía, así que los lazos cercanos se fortalecen.', 'La armonía toca tu rama del Día, así que el tiempo juntos fluye cómodo.'],
      dayChung: ['El lugar de tu pareja (la rama del Día) recibe un choque, así que cuanto más cercana es la persona, más cuidado con tus palabras.', 'Hoy tu rama del Día vacila, así que los planes con tu pareja pueden cruzarse.'],
      stemHap: ['Una energía se une con tu Maestro del Día, así que puedes sentirte atraído por alguien o conectar con esa persona.', 'Hoy tu Maestro del Día está en unión, así que la puerta a los vínculos se abre con facilidad.'],
      none: ['La estrella de los vínculos está en calma, un buen día para fortalecer lo que tienes.', 'Hoy es para mantener cálida una relación conocida más que para buscar vientos nuevos.'],
    },
    caution: ['Hoy evita las conversaciones que remueven el pasado.', 'No juzgues los sentimientos por la velocidad de respuesta.', 'Hoy compararle con otros hiere con especial facilidad.', 'No le des vueltas a historias sin confirmar.', 'Si se encienden las emociones, está bien seguir la conversación mañana.', 'No juzgues mal basándote solo en lo que ves en redes sociales.'],
    chance: ['Una charla con alguien que te escribe después de tiempo puede ir muy bien.', 'Una propuesta ligera de comer juntos crea un buen flujo.', 'Hoy está bien mostrar lo que sientes.', 'Puede nacer un vínculo en un grupo de aficiones o de estudio.', 'Elogia sus puntos fuertes de forma concreta.', 'Un pequeño regalo o una nota escrita a mano puede emocionar mucho.'],
    tip: ['Con solo preguntar primero por su día, una relación se suaviza.', 'Tu cara y tu mirada dicen más que las palabras.', 'No te guardes un simple «gracias».', 'Un paseo corto juntos puede valer más que una charla larga.', 'Cuidarte a ti es donde empieza una buena relación.', 'Baja un poco las expectativas y las pequeñas alegrías se sentirán más grandes.'],
    act: [
      ['Hoy ten una conversación en la que escuches en lugar de zanjar.', 'Comparte el dolor con suavidad, con frases del tipo «yo sentí…».', 'Tómate un tiempo a solas para ordenar tus sentimientos.'],
      ['Envía un mensaje corto para saludar a alguien cercano.', 'Haz un pequeño plan que podáis hacer juntos.', 'Di el gracias que no habías llegado a decir.'],
      ['Escribe tú primero a la persona que tienes en mente.', 'Elige un sitio nuevo para tu cita.', 'Si te invitan a una reunión, ve.'],
    ],
  },
  work: {
    flow: [
      ['Hoy el trabajo puede no salir según lo planeado.', 'Hoy los pequeños errores llegan con facilidad, así que revisar dos veces importa.', 'El trabajo puede sentirse más lento de lo habitual.', 'Pueden surgir momentos en que cueste concentrarse en el trabajo o el estudio.'],
      ['Hoy el trabajo y el estudio fluyen con estabilidad.', 'Un buen día para avanzar las tareas paso a paso.', 'Hoy los resultados corresponden a tu destreza habitual.', 'El día probablemente se cierre sin sorpresas.'],
      ['Un día para esperar buenos resultados en el trabajo.', 'La concentración es alta, así que hoy el estudio y el trabajo son eficientes.', 'Hoy tus opiniones son bien recibidas.', 'Un flujo decente para empezar algo nuevo.'],
    ],
    more: [
      ['Revisa los hechos dos veces antes de tomar decisiones importantes.', 'Si se solapan los plazos, empieza por reordenar tus prioridades.', 'Hoy reducir errores es una victoria mayor que probar algo nuevo.'],
      ['Con solo mantener tu rutina puede ser un buen día.', 'Despacha las pequeñas tareas aplazadas y mañana será más ligero.', 'Compartir información con los colegas hace que el trabajo vaya más fluido.'],
      ['Si llevas tiempo preparando algo, hoy es buen momento para mostrarlo.', 'Incluso las tareas difíciles muestran una salida cuando las enfrentas de frente.', 'Lo que logres hoy tiende a contar bien en las evaluaciones.'],
    ],
    why: {
      kwan: ['La energía de la Autoridad gana fuerza, así que tu sentido de la responsabilidad se valora bien.', 'Hoy llega la Autoridad, así que las cosas con los superiores tienden a ir bien.'],
      kwanBad: ['La Autoridad entra con peso, así que la presión y la tensión del trabajo pueden crecer.', 'La Autoridad pesa mucho, así que hoy la responsabilidad se amontona sobre ti.'],
      output: ['La energía de la Expresión cobra vida, así que tu expresión y tus ideas destacan.', 'Se mueve la Expresión, un buen día para producir resultados.'],
      study: ['Llega la energía del Recurso, así que el aprendizaje y la comprensión llegan rápido.', 'El Recurso gana fuerza, un buen día para centrarte en estudiar para exámenes o certificaciones.'],
      monthChung: ['Tu rama del Mes (lugar del trabajo) recibe un choque, así que los cambios de agenda o los traslados llegan con facilidad.', 'Hoy tu lugar del trabajo vacila, así que prepárate para cambios repentinos en el trabajo.'],
      rob: ['La energía de los Pares se hace fuerte, así que la competencia o los choques de opinión llegan con facilidad.', 'Se mueven los Pares, así que hoy crecen las ganas de proteger tu parte.'],
      none: ['Hoy las estrellas del trabajo están en calma, así que lo mejor es hacerlo todo en el orden fijado.', 'Hoy la constancia crea resultados más que los grandes cambios.'],
    },
    caution: ['Revisa destinatarios y adjuntos antes de enviar correos.', 'Apunta las instrucciones que recibas de palabra.', 'Comprueba de antemano que tu agenda no se solape.', 'Pregunta en lugar de adivinar lo que no sabes.', 'Revisa al día siguiente las decisiones tomadas estando cansado.', 'Asegúrate de hacer copia de seguridad de los archivos importantes.'],
    tip: ['Termina la tarea difícil a primera hora de la mañana.', 'Concentrarte 25 minutos y descansar 5 le sienta bien a hoy.', 'Despejar tu mesa también te despeja la cabeza.', 'Apunta en una línea lo que aprendiste hoy.', 'Si alguien te ayudó, deja un breve agradecimiento.', 'Escribe de antemano tres tareas para mañana.'],
    act: [
      ['Hoy céntrate en terminar el trabajo en curso más que en tareas nuevas.', 'Haz una lista de comprobación para los puntos en que sueles fallar.', 'Pide ayuda pronto donde la necesites.'],
      ['Revisa otra vez los objetivos de esta semana.', 'Comparte un breve estado de avance con tus colegas.', 'Termina de ordenar los materiales que aplazaste.'],
      ['Saca la propuesta o la idea que has preparado.', 'Resuelve hoy las presentaciones o entregas importantes.', 'Un buen momento para empezar un estudio nuevo o preparar una certificación.'],
    ],
  },
  health: {
    flow: [
      ['Hoy el cansancio se acumula con facilidad, así que no te exijas de más.', 'Un día para escuchar las señales de tu cuerpo.', 'Hoy puedes cansarte con más facilidad de lo habitual.', 'Un día para prestar atención a tu estado.'],
      ['La salud fluye con estabilidad.', 'Hoy tu cuerpo se mantiene más o menos como siempre.', 'Salvo que te excedas, un día cómodo.', 'Hoy una rutina regular protege tu estado.'],
      ['Hoy tu cuerpo se siente ligero y animado.', 'Un buen día para empezar ejercicio o actividades.', 'Estás en buena forma y puedes pasar el día con energía.', 'Hoy cuerpo y mente encuentran el equilibrio con facilidad.'],
    ],
    more: [
      ['Si te falta sueño, haz de acostarte temprano tu prioridad.', 'Hoy a tu cuerpo le sienta mejor una comida ligera y caliente que una pesada.', 'Si notas rígidos los hombros o el cuello, suéltalos de vez en cuando.'],
      ['Basta con beber suficiente agua y mantener comidas regulares.', 'Hoy un paseo ligero o unos estiramientos mantienen estable tu estado.', 'Si llevas mucho rato sentado, levántate una vez cada hora.'],
      ['Buen momento para empezar el ejercicio que aplazaste.', 'Aprovecha tu buen estado para subir un poco tu actividad.', 'Un buen día para crear un nuevo hábito saludable.'],
    ],
    why: {
      excess: ['La energía {el} se desborda, así que conviene no forzar {organ}. No te exijas de más.', 'Hoy se suma más energía {el}, que ya abunda, así que cuida un poco más {organ}.'],
      lack: ['Hoy se completa la energía {el}, así que el equilibrio de tu cuerpo se recupera con facilidad.', 'Se repone la energía {el} que te faltaba, así que tu estado se estabiliza.'],
      chung: ['Tu rama del Día recibe un choque, así que el cansancio se acumula o tu estado vacila con facilidad.', 'Hoy tu propio lugar vacila, así que evita una agenda sobrecargada.'],
      hyeong: ['Hay energía de Fricción, así que cuidado con pequeñas lesiones y golpes.', 'Hoy hay Fricción en juego, así que calienta bien antes de hacer ejercicio.'],
      none: ['Un día estable en que los Cinco Elementos apenas vacilan.', 'Hoy la energía de tu cuerpo fluye de forma pareja.'],
    },
    tip: ['Reduce el uso del móvil antes de dormir.', 'Entra en calor con una taza de té.', 'Solo con subir por las escaleras ya haces buen ejercicio.', 'Si tienes los ojos cansados, mira a lo lejos a menudo.', 'Empieza el día con estiramientos suaves.', 'Come fruta y verdura de temporada.'],
    act: [
      ['Quita hoy una cosa de tu agenda y asegura un rato de descanso.', 'Haz de acostarte temprano el objetivo de hoy.', 'No ignores las señales de tu cuerpo.'],
      ['Da un paseo de 10 minutos después de comer.', 'Bebe agua más a menudo, de forma consciente.', 'Haz unos estiramientos suaves por la noche.'],
      ['Camina o haz ejercicio un poco más de lo habitual.', 'Un buen día para probar un ejercicio nuevo.', 'Planea algunas comidas saludables.'],
    ],
  },
};

// Hana: el flujo del amor de hoy (luminoso y cálido)
export const HANA_TODAY = {
  flow: [
    ['Hoy tu corazón se cansa un poco con facilidad.', 'Hoy puede que te sientas decepcionado si las reacciones no están a la altura de lo que esperabas.', 'Hoy la energía de los vínculos está un poco baja.', 'Hoy puede que te sientas inquieto sin motivo.', 'Hoy una sola palabra se te queda en la cabeza mucho rato.', 'Hoy la gente puede agotarte un poco.'],
    ['Hoy tu corazón se asienta con calma.', 'Hoy lo mejor es pasar tiempo con gente con la que estás a gusto.', 'El flujo del amor de hoy es tranquilo.', 'Hoy lo conocido atrae más que lo nuevo.', 'Un buen día para mirar tus relaciones con perspectiva.', 'Hoy le van las conversaciones tranquilas.'],
    ['¡Hoy podría pasar algo que te dé mariposas!', 'Hoy tu encanto se nota con naturalidad.', 'Hoy las conversaciones fluyen con facilidad.', 'Hoy parece que un vínculo está cerca.', 'Hoy tus sentimientos llegan bien.', 'Parece que hoy habrá mucho por lo que sonreír.'],
  ],
  more: [
    ['Cuando pase, no te culpes. Está bien tomárselo como la energía del día.', 'Puede que la otra persona también tenga un mal día. Dale un momento.', 'Si sientes el corazón pesado, tómate un descanso con tu música favorita.', 'Cuando se te acumulen los pensamientos, hablar con un amigo de confianza ayuda.', 'El dolor de hoy parecerá mucho más pequeño mañana.', 'No tienes que forzar una sonrisa. Hoy cuídate primero tú.'],
    ['Incluso sin grandes eventos, los días así hacen sólida una relación.', 'Hoy prueba a fijarte en una de sus pequeñas costumbres.', 'Si estás soltero, es el día perfecto para tener tiempo para ti.', 'Aunque los mensajes escaseen, no significa que los sentimientos se hayan enfriado. No te preocupes.', 'Sigue como siempre y muestra un poco de gratitud.', 'La comodidad también es una cara importante del amor.'],
    ['Si hay algo que dudabas en decir, hoy es un buen día para decirlo.', 'Si conoces a alguien nuevo, dejarás una gran primera impresión.', 'Si tienes pareja, es un gran día para crear un recuerdo especial.', 'Esa señal de interés que recibiste hoy puede que no sea imaginación tuya.', 'Tu sonrisa es tu mejor arma hoy.', 'Atrévete y acércate un paso más.'],
  ],
  why: {
    star: ['{star} entra hoy como energía que te ayuda, así que los vínculos llegan a buen puerto.', '{star} brilla hoy, así que el corazón de alguien puede girarse hacia ti.'],
    bad: ['La estrella de los vínculos entra un poco pesada, así que es fácil dejarse llevar por su ritmo.', 'Hoy la energía de los vínculos pesa, así que revisa primero tu propio corazón.'],
    dohwa: ['Llega la Flor de Durazno, así que hoy atraerás miradas sin intentarlo.', 'Gracias a la energía de la Flor de Durazno, el ambiente se inclina hacia ti con facilidad.'],
    dayHap: ['La armonía toca el lugar de tu pareja, así que el tiempo juntos es cómodo y cálido.', 'Entra la armonía en tu rama del Día, así que estáis en sintonía.'],
    dayChung: ['El lugar de tu pareja recibe un choque, así que es fácil discutir por pequeñeces.', 'Hoy tu rama del Día vacila, así que las horas de quedar o los planes pueden cruzarse.'],
    stemHap: ['Tu Maestro del Día está en unión, así que es fácil conocer a alguien que te entienda sin más.', 'Hoy tu Maestro del Día se une, así que en la conversación surgen puntos en común con facilidad.'],
    none: ['Hoy la estrella de los vínculos descansa, así que está bien volcar tu cariño en la gente que tienes al lado.', 'Hoy va de cuidar tu relación actual más que de encontrar una nueva.'],
  },
  caution: ['Aunque quieras mirar su móvil o sus redes sociales, aguanta hoy.', 'Palabras como «da igual» o «déjalo» se malinterpretan con facilidad hoy.', 'Mejor no sacar relaciones pasadas hoy.', 'No juzgues a alguien solo por lo que dice un amigo.', 'Si estás cansado, recortar planes es amable con los dos.', 'Si estás molesto, ordénalo una vez antes de decirlo.'],
  chance: ['Si alguien te gusta, proponle tomar un café sin darle importancia.', 'Responde un poco más cálido a los mensajes que recibas hoy.', 'Si un amigo se ofrece a presentarte a alguien, ve.', 'Dile a tu pareja una cosa que hoy agradeciste.', 'Puede que conectes con alguien en un grupo de aficiones.', 'Ponte la ropa que tenías ganas de estrenar. Te subirá el ánimo.'],
  tip: ['Con solo mirarle a los ojos y sonreír es suficiente.', 'Un simple «tiene sentido» abre corazones.', 'Hoy da las gracias a quienes te apoyan.', 'Mejor mensajes cálidos que largos.', 'La gente que se quiere a sí misma también recibe bien el amor.', 'No tienes que apresurarte; el amor llegará. De verdad.'],
  act: [
    ['Hoy hazte un pequeño regalo.', 'Escribir lo que sientes como un diario te ayuda a ordenarlo.', 'Sube el ánimo charlando con un amigo con el que estés a gusto.'],
    ['Pregunta qué tal a alguien con quien no hablas desde hace tiempo.', 'Elige una película o un sitio al que os gustaría ir juntos.', 'Hoy escucha su historia hasta el final.'],
    ['Empieza una conversación con la persona que te atrae.', 'Si es una cita, elige una ruta distinta de la habitual.', 'Ve a una reunión y habla con gente nueva.'],
  ],
};
