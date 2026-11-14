// Tarjetas de dominio de la pestaña Hoy: frase guía (puntuación 1–5) · tareas (up/down) · lo que evitar, ampliación ×5 (se añaden)
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export const LEAD5 = {
  wealth: [
    L(`
Hoy el gasto se acumula. Paga solo lo imprescindible.
El dinero se escapa con facilidad. Deja las tarjetas en casa.
Perseguir pérdidas puede costar más. Para por hoy.
Las promesas de dinero se enredan con facilidad. Evita prestar.
La suerte con el dinero está casi en lo más bajo. Céntrate en conservar.
Puedes gastar por estado de ánimo. Vuelve a mirar el carrito mañana.
Hoy crecen las preocupaciones de dinero. Escribir los números las aligera.
Hoy aparecen fugas. Revisa primero los pagos automáticos.
Las cuentas fallan con facilidad. Revisa dos veces las transferencias.
Hoy la codicia sale cara. Aplaza los grandes tratos.
La cartera adelgaza con facilidad. Cocina en casa en lugar de comer fuera.
Las discusiones de dinero se encienden fácil. Haz una pausa cuando suban las emociones.
`),
    L(`
Hoy sale un poco más. Reajusta tu presupuesto.
Las tentaciones de gastar no paran. Aguanta un día.
Los pequeños pagos se acumulan. Apunta lo que gastaste.
El dinero se mueve despacio. Revisa lo que te deben.
Mejor para ahorrar que para gastar. Prueba un día sin gasto.
Tu juicio con el dinero puede nublarse. Fíate más de los números que de las palabras.
Los descuentos pueden tentarte. Pregúntate si de verdad lo necesitas.
El gasto adelanta a los ingresos. Repasa tus gastos fijos.
El dinero se toma un respiro. Aplaza las compras grandes.
Tienden a surgir gastos. Guarda algo de reserva.
Cuanto más ahorras, más te queda. Apunta lo que ahorraste.
Hoy las prisas te cuestan. Decide despacio.
`),
    L(`
El dinero está en calma. Gestiónalo como siempre.
Hoy entradas y salidas se equilibran. Ordena tu presupuesto.
Hoy lo normal es bueno. Revisa tu transferencia de ahorro.
El dinero fluye parejo. Planea el mes que viene.
Sin grandes cambios. Mantén tus pequeños hábitos de ahorro.
Un buen día para gastar según lo previsto. Compara antes de comprar.
El dinero está estable. Añade un poco a tu fondo de emergencia.
Las cosas van fluidas. Recoge tus puntos y ventajas.
El dinero se acumula en silencio. Anota en una línea el gasto de hoy.
Los hábitos se vuelven resultados. Recorta un gasto fijo.
Las cosas están equilibradas. Cuadra las fechas de ingresos y pagos.
Tu ritmo de siempre basta. Repasa tus suscripciones.
`),
    L(`
Pueden llegar buenas noticias de dinero. No te pierdas ningún mensaje.
Tu olfato para el dinero está fino. Apunta las buenas condiciones.
El esfuerzo tiene recompensa. Reclama hoy lo que te deben.
Las pequeñas ganancias se suman. Ahorra parte enseguida.
Los tratos van fluidos. Envía el presupuesto que aplazaste.
El dinero se inclina a tu favor. Prueba a negociar.
Hoy destacan las ventajas. Busca devoluciones olvidadas.
Las ideas de ingresos llegan fácil. Apúntalas ya.
Sube la suerte con el dinero. Sube tu objetivo de ahorro.
Las conversaciones de dinero van bien. Cierra las liquidaciones.
Un buen día para asegurar ganancias reales. Considera solo las inversiones necesarias.
Aparecen buenas oportunidades. Compara las condiciones con cuidado.
`),
    L(`
Hoy la suerte con el dinero está en su punto más alto. Pon en marcha lo que preparaste.
Hoy el dinero se reúne. Ahorra tanto como entre.
Se ve una gran cosecha. Ocúpate de contratos y liquidaciones.
La energía del dinero se desborda. No dejes pasar la oportunidad.
El esfuerzo se convierte en dinero. Presenta tu trabajo con seguridad.
Las negociaciones van bien. Di las condiciones que quieres.
Los ingresos tienden a crecer. Decide primero para qué son.
La puerta de la riqueza está abierta. Avanza con los tratos aplazados.
Tu olfato para el dinero brilla. Haz un plan a largo plazo.
Siguen llegando buenos tratos. De paso, construye confianza.
Pueden llegar ganancias inesperadas. Reparte también algo de gratitud.
La suerte con el dinero está en plena flor. Mantén los pies en el suelo y lleva registros.
`),
  ],
  love: [
    L(`
Hoy las emociones están afiladas. No saques conclusiones.
El dolor crece con facilidad. No adivines a solas.
Las palabras salen torcidas. Relee antes de enviar.
Tu corazón está cansado. Cuídate primero a ti.
Las discusiones se encienden fácil. Haz una pausa antes de responder.
Las ilusiones pueden quedarse cortas. Baja tus expectativas.
Los mensajes no dejan de cruzarse. Espera en lugar de presionar.
Los malentendidos se acumulan. Comprueba primero los hechos.
La relación pesa. Un poco de espacio está bien.
Afloran viejos recuerdos. Deja el pasado en paz.
Tu corazón vacila. Habla con un amigo de confianza.
El desgaste emocional es alto. Descansar temprano es la respuesta.
`),
    L(`
Expresarte resulta torpe. Sé breve y amable.
Vuestros ritmos no coinciden. Respeta sus tiempos.
Las cosas pequeñas escuecen. Déjalas pasar.
La suerte en el amor baja un poco. Evita comprometerte de más.
La espera se hace larga. Céntrate en tus cosas.
La charla se queda en la superficie. Cambia tu pregunta.
Te sientes impaciente. Mira el proceso, no el resultado.
Pasa un pequeño dolor. Piensa primero en lo que agradeces.
La relación está tranquila. Envía solo un saludo ligero.
Comparar sale solo. Mira solo tu propia relación.
El ánimo oscila. Aplaza las conversaciones importantes.
Las palabras resultan torpes. Muéstralo con hechos.
`),
    L(`
La relación resulta fácil. Disfruta de la charla ligera.
Hoy, dulzura cotidiana. Compartid una comida.
Lo conocido sienta bien. Di gracias en voz alta.
Tu corazón está en calma. Pregúntale por su día.
Todo sigue con suavidad. Cumple las promesas pequeñas.
Un día correcto para los vínculos. Escribe a un viejo amigo.
Un día tranquilo. Dad un paseo juntos.
Un buen día para mirar atrás. Recuerda los buenos momentos.
Las cosas se hacen más hondas en silencio. Escúchale hasta el final.
Hay sensación de estabilidad. Planea vuestra próxima cita.
Si estás soltero, céntrate en ti. Disfruta de una afición.
Hoy, una calidez cómoda. Haz un elogio ligero.
`),
    L(`
El interés va en las dos direcciones. Acércate con una sonrisa.
Las conversaciones encajan. Pregunta lo que te da curiosidad.
Crece la ilusión. Propón un plan.
Los corazones conectan fácil. Sé sincero con lo que sientes.
Aparecen vínculos nuevos. Ve a una reunión.
Os estáis acercando. Haced planes juntos.
Tu encanto se nota. Simplemente sé tú.
Los mensajes son bien recibidos. Responde con calidez.
El ambiente es bueno. Id a algún sitio nuevo.
Un vínculo está cerca. No rechaces presentaciones.
La sinceridad llega. Comparte tu gratitud.
Llegan buenas señales. Responde sin dudar.
`),
    L(`
La suerte en el amor está en plena flor. Comparte lo que sientes.
Hoy el amor brilla. Planea una cita especial.
Llega un vínculo. Ábrete a gente nueva.
Un buen día para declararte. Busca tu valor.
La relación se hace más honda. Hablad del futuro.
Tu encanto está en su punto más alto. Sé el centro de la reunión.
Los corazones se hacen uno. Pasad más tiempo juntos.
Lleno de ilusión. Haz un día para recordar.
Tú y tu pareja estáis en sintonía. Probad algo nuevo juntos.
Es fácil conocer a buena gente. Haz planes.
Hoy te quieren. Devuélvelo en la misma medida.
La puerta de los vínculos está abierta. Da tú el primer paso.
`),
  ],
  work: [
    L(`
El trabajo se atasca con facilidad. Hoy cíñete a lo básico.
Los errores pueden crecer. Revisa antes de entregar.
La presión es fuerte. Reparte el trabajo.
Los planes se desvían. Vuelve a fijar prioridades.
La concentración se dispersa. Apaga las notificaciones.
Las opiniones chocan. Ponlo todo por escrito.
La energía está baja. Aplaza las grandes decisiones.
Los resultados tardan. No te apresures.
El trabajo se acumula. Termina solo tres cosas.
Las evaluaciones te pesan. Céntrate en lo que puedes hacer.
Un día para aguantar. Con pasarlo sin problemas basta.
Muchas variables. Prepara un plan B.
`),
    L(`
Hace falta atención al detalle. Revisa cifras y fechas.
El ritmo es lento. Sé preciso.
El trabajo pesa un poco. Pide ayuda.
Los plazos están cerca. Termina lo que empezaste.
Cuidado con los errores. Usa una lista de comprobación.
La concentración flojea. Trabaja en tramos cortos.
Hace falta confirmar. Apunta las instrucciones.
Las tareas se solapan. Reajusta tu agenda.
Un día para terminar, no para empezar. Cierra lo pendiente.
Ve con cuidado. Lee hasta el final antes de firmar.
Guarda energía. Haz solo las tareas clave por la mañana.
Pueden surgir pequeños problemas. Haz copias de seguridad.
`),
    L(`
El trabajo fluye en calma. Sigue según lo previsto.
Un día correcto. Termina las tareas pequeñas aplazadas.
La constancia brilla. Mantén tu rutina.
Un buen día para ordenar. Despeja archivos y correos.
Tu nivel de siempre basta. Confía en ti.
Un buen día para repasar. Ordena lo que aprendiste.
El trabajo en equipo va bien. Comparte tus avances.
Las cosas fluyen parejas. Planea la semana que viene.
Un día estable. Refuerza lo básico.
Un día tranquilo. Céntrate en una tarea difícil.
Un día equilibrado. Separa trabajo y descanso.
Un buen día para revisar. Vuelve a mirar tus objetivos.
`),
    L(`
Hoy se ven los resultados. Compártelos.
Las ideas brillan. Habla en las reuniones.
La colaboración va bien. Propón trabajo conjunto.
El reconocimiento llega fácil. Mantén al día los informes.
La concentración es fuerte. Empieza por la tarea más difícil.
Llegan oportunidades. Levanta la mano.
Aprendes rápido. Empieza un curso nuevo.
Eres convincente. Pule tu propuesta.
El trabajo va fluido. Termina lo que aplazaste.
Las evaluaciones van bien. Presenta con seguridad.
El flujo es bueno. Fija tu próximo objetivo.
Llega ayuda. Di con claridad lo que necesitas.
`),
    L(`
Hoy la suerte en el trabajo está en su punto más alto. Haz tu tarea más importante.
Tu habilidad se nota. Da un paso al frente.
Un día de grandes resultados. Muestra todo lo que preparaste.
Tus decisiones brillan. Toma la decisión que venías aplazando.
Tu liderazgo cala. Guía al equipo.
Ideal para exámenes y entrevistas. Ten confianza.
Abundan las oportunidades. Asume un proyecto nuevo.
Los resultados se ven en números. Lleva registros.
Llega el reconocimiento. Reconoce también a quienes te ayudaron.
El trabajo se abre de par en par. Sube tu plan un nivel.
La energía se desborda. Acepta un reto difícil.
Estás en racha. Sigue así.
`),
  ],
  health: [
    L(`
Sientes el cuerpo pesado. Recorta planes sin miedo.
El cansancio es alto. Acuéstate temprano.
La energía está por los suelos. Aplaza los planes exigentes.
Tu cuerpo manda señales fuertes. El descanso va primero.
Te cansas con facilidad. Siéntate a descansar a menudo.
La recuperación es lenta. Calma el estómago con comida caliente.
Vas justo de energía. Haz solo ejercicio suave.
Se acumula la tensión. Respira hondo.
Las lesiones llegan fácil. Muévete despacio.
Necesitas dormir. Apaga pronto las pantallas.
Puedes coger frío. Abrígate.
Hoy el trabajo es descansar. Trátate con cariño.
`),
    L(`
Queda algo de cansancio. Haz pausas cortas a menudo.
Guarda energía. Evita comer de más.
Sientes el cuerpo rígido. Estírate.
Tu ritmo puede descuadrarse. Respeta las horas de comida.
Te cansas fácil. Bebe agua en lugar de cafeína.
Te sientes pesado. Sube despacio por la escalera en lugar del ascensor.
La concentración baja. Descansa la vista a menudo.
La energía está baja. Reduce los planes de la noche.
Usa el cuerpo con moderación. Evita los entrenamientos duros.
La tensión se queda. Date una ducha caliente.
Te falta sueño. Haz siestas cortas.
Un día para cuidar tu estado. Termina pronto.
`),
    L(`
Tu cuerpo está bien. Sigue con tu ejercicio.
Estás en equilibrio. Bebe agua a menudo.
Tu ritmo de siempre. Cuida el sueño y las comidas.
Un día fácil. Da un paseo ligero.
Tu cuerpo está firme. Cuida tu postura.
Un día estable. Añade una verdura más.
Hoy sin esfuerzo. Termina con un estiramiento.
Un día tranquilo. Revisa tus hábitos.
Tu estado es llano. Toma un poco de sol.
Hace falta constancia. Cumple tus pasos.
Tu cuerpo está en calma. Crea el hábito de acostarte pronto.
La salud está bien. Elige un snack sano.
`),
    L(`
Sientes el cuerpo ligero. Muévete más.
La recuperación es rápida. Ponte al día con el ejercicio.
La vitalidad fluye. Sal fuera.
Sube la energía. Prueba un ejercicio nuevo.
Tu cuerpo colabora. Sube por la escalera.
Te sientes bien. Fija un objetivo de salud.
Un día refrescante. Empieza con un paseo por la mañana.
La energía sobra. Planea ejercicio con un amigo.
Te sientes renovado. Come bien.
Ideal para la actividad. Disfruta de la bici o de una ruta.
Te estás haciendo más fuerte. Sube un poco la intensidad.
Un día de bienestar. Disfruta moviéndote.
`),
    L(`
Estás en plena forma. Acepta retos físicos.
La vitalidad se desborda. Muévete todo lo que quieras.
Te sientes capaz de volar. Empieza un ejercicio nuevo.
Lleno de energía. Disfruta de una buena sudada.
La recuperación está en su mejor momento. Ataca de una vez las tareas aplazadas.
La energía se desborda. Pasa más tiempo al aire libre.
Cuerpo y mente se sienten ligeros. Planea un viaje o una salida.
Tu resistencia brilla. Ve a por tu mejor marca.
La suerte en la salud está en plena flor. Empieza un buen hábito.
Tu cuerpo se mueve bien. Solo calienta y disfruta.
Fluye una energía viva. Muévete con la gente de tu alrededor.
Un día refrescante. Apunta lo bien que te sientes.
`),
  ],
};

export const TODO5 = {
  wealth: {
    up: L(`
Si te deben dinero, escribe hoy
Compara productos con buenas condiciones
Decide primero adónde va el dinero que entra
Apunta una idea de ingresos extra
Envía el presupuesto que aplazaste
Sube un poco tu objetivo de ahorro
Recoge tus puntos y ventajas
Prueba a negociar el precio
Busca algo que te puedan devolver
Mete un poco más en tu fondo de emergencia
Dedica 30 minutos a aprender sobre dinero
Da las gracias a tus clientes
Suma los ingresos de este mes
Haz un plan de ahorro a largo plazo
Compra a buen precio algo que necesitabas
Haz una lista de cosas que puedes vender
Vuelve a poner precio a tus habilidades
Revisa con cuidado los datos de la liquidación
Ahorra enseguida parte de lo que ganes
Agradece a quien te pasó un buen consejo
Planea el dinero que te sobre este mes
Ordena tus papeles de dinero
Prepárate para hablar de tu sueldo o tus tarifas
Apunta las ganancias de hoy
`),
    down: L(`
Hoy espera un día antes de pagar
Repasa tu lista de pagos automáticos
Anota el gasto de hoy en tu presupuesto
Ordena los recibos de tu cartera
Vuelve a fijar el presupuesto de esta semana
Fija una franja sin gasto
Apaga las alertas de las apps de compras
Usa solo efectivo o tarjeta de débito
Apunta lo que te deben y lo que debes
Compra solo lo que está en la lista
Revisa con antelación el extracto de la tarjeta
Cocina en casa en lugar de comer fuera
Despréndete de lo que no usas
Revisa dos veces la cuenta antes de enviar dinero
Comprueba cuándo terminan las pruebas gratuitas
Apunta los gastos fijos de este mes
Cuenta hasta diez cuando llegue un impulso
Revisa los plazos que te quedan
Acordad de antemano los gastos de grupo
Limítate a hacer foto de lo que quieres comprar
Revisa las facturas del móvil o del seguro
Activa las alertas de saldo
Compara precios primero
Pasa aunque sea poco a tu ahorro
`),
    no: L(`
Avalar préstamos
Invertir por rumores
Comprar para animarte
Pedir préstamos con prisa
Caprichos de edición limitada
Pagar por enlaces desconocidos
Pagar depósitos por adelantado
Hacer malabares con tarjetas
Gastar para presumir
Cuentas de copas por el ambiente
Ofertas de ganancias garantizadas
Compras grandes sin comparar
Gastos a escondidas
Apuestas dejadas a la suerte
Transferencias con prisa
Tratos sin contrato
`),
  },
  love: {
    up: L(`
Propón un plan a alguien que te atrae
Elige una ruta de cita distinta
Haz una pregunta más cuando hable
Haz un elogio concreto
Compartid fotos que os hicisteis juntos
Prepara un pequeño regalo
Ve a una presentación
Habla con tu pareja de los próximos planes
Sonríe y saluda tú primero
Di brevemente que te gusta
Propón dar un paseo juntos
Comed juntos su comida favorita
Deja una nota escrita a mano
Únete a un grupo con tus intereses
Pregúntale tú primero por su día
Elegid una película para ver juntos
Agradece un momento concreto
Intercambia contacto con alguien nuevo
Envía a tu pareja un mensaje de ánimo
Fijad un pequeño objetivo juntos
Vístete como tú y sal
Saluda a alguien a quien querías escribir
Prueba su afición con esa persona
Planea un día para recordar
`),
    down: L(`
Hoy no metas prisa a su respuesta
Revisa tu mensaje una vez más antes de enviarlo
Escribe lo que te dolió y habladlo mañana
Reserva una hora solo para ti
Imagina una vez las cosas desde su lado
Apártate cuando suban las emociones
Habla con un amigo de confianza
Descansa temprano para calmarte
Si debes una disculpa, dila tú primero
Suelta un poco las expectativas
Envía solo un saludo corto y amable
Entiende que está ocupado
Cierra un rato las redes sociales
Recuerda un buen momento
Hablad en persona
Haz una cosa que te cuide
Pasea por algún sitio tranquilo
Comparte lo que sientes empezando por «yo»
Hoy escucha en lugar de concluir
Cumple una promesa pequeña
Escribe lo que sientes en un diario
Dale tiempo para pensar
Descansa con una taza de té caliente
Di primero una cosa que agradeces
`),
    no: L(`
Contar mensajes
Mirar su móvil
Escribir con copas de más
Ponerle a prueba
Compararte con otras parejas
Criticarle en público
Conclusiones unilaterales
El sarcasmo
Exceso de regalos
Hablar de ex
Publicar sentimientos en redes
Desaparecer en silencio
Forzar una respuesta
Cambiar planes sin avisar
Culpar a sus amigos
Sacar conclusiones precipitadas
`),
  },
  work: {
    up: L(`
Comparte el plan que preparaste
Empieza por la tarea más difícil
Ofrécete para un proyecto nuevo
Informa brevemente de los resultados
Apúntate a un curso que querías hacer
Intercambia ideas con compañeros
Pule las diapositivas de tu presentación
Fija tu próximo objetivo en números
Da las gracias a un compañero que te ayudó
Termina hoy una tarea aplazada
Habla tú primero en la reunión
Propón tú primero trabajo conjunto
Ensaya entrevistas o exámenes como si fueran reales
Apunta los resultados de hoy
Prueba una herramienta nueva
Pide consejo a alguien con más experiencia
Actualiza tu portafolio
Reserva dos horas de concentración
Mejora una forma de trabajar
Habla con un posible mentor
Avanza un poco más en el estudio
Entrega hoy la propuesta
Anima al equipo con una palabra amable
Planea con antelación las tareas de mañana
`),
    down: L(`
Usa una lista de comprobación antes de entregar
Apunta las instrucciones que recibes
Reduce la lista de hoy a tres tareas
Busca solapamientos en tu agenda
Haz copia de seguridad de los archivos importantes
Pregunta enseguida cuando te atasques
Lee los correos en voz alta antes de enviarlos
Concéntrate en tramos cortos
Trabaja con las notificaciones apagadas
Vuelve a comprobar el plazo
Empieza por lo que quedó de ayer
Pon los descansos en la agenda
Revisa dos veces cifras y fechas
Pasa a limpio las notas de la reunión enseguida
Pregunta a tus compañeros cómo van
Vuelve a revisar los adjuntos
Fija un plazo antes de aceptar trabajo
Aplaza las decisiones clave si estás cansado
Despeja la mesa antes de empezar
Corrige los errores enseguida
Ordena tus notas de trabajo
Calcula tiempo de sobra para desplazarte
Haz solo diez minutos de la tarea que temes
Apunta la lección de hoy
`),
    no: L(`
Firmar sin revisar
Correos emocionales
Demasiadas tareas a la vez
Estudiar todo a última hora
Criticar en público
Citar fuentes sin comprobar
Horas extra excesivas
Cotilleos
Revisar por encima
Pasar tu trabajo a otros
Promesas sin fecha
Compartir datos de seguridad
Trabajar sin guardar
Adivinar las instrucciones
Peleas de orgullo
Grandes decisiones impulsivas
`),
  },
  health: {
    up: L(`
Camina un poco más de lo habitual
Prueba un ejercicio nuevo
Empieza con un estiramiento por la mañana
Sube por la escalera
Camina al aire libre
Queda con alguien para hacer ejercicio
Cocina con ingredientes sanos
Sal a dar una vuelta en bici
Haz una ruta suave
Registra tu entrenamiento
Come verdura y fruta
Disfruta de una afición activa
Descansa bien después de sudar
Sube tu objetivo de pasos
Descansa al sol
Mueve el cuerpo mientras ordenas la casa
Planea una semana de ejercicio
Baila con música que te encante
Calienta a fondo
Comprueba la fecha de tu revisión médica
Prueba la natación o el yoga
Planea un paseo con un amigo
Desayuna
Levántate temprano y empieza el día
`),
    down: L(`
Quita un plan de hoy
Descansa un poco la vista después de comer
Date una ducha caliente
Fija una hora para acostarte
Deja el móvil fuera de la cama
Mantén horas de comida regulares
Suelta despacio el cuello y los hombros
Abrígate al salir
Ten una botella de agua cerca
Mastica despacio y bien
Prueba un baño de pies o un medio baño
Baja las luces y descansa
Limítate a estiramientos suaves
Aplaza los planes de la noche
Siéntate con la espalda recta
Da solo paseos lentos y suaves
Haz siestas cortas
Tómate una taza de té caliente
Respira hondo cinco veces
Cierra los ojos y escucha música
Acorta la lista de tareas de hoy
Lleva calzado cómodo
Si algo no va bien, consulta a un profesional
Sal pronto del trabajo y descansa
`),
    no: L(`
Picar de madrugada
Dietas drásticas
Ejercicio sin calentar
Pantallas hasta tarde
Saltarte comidas
Demasiada comida fría
Ignorar las señales del cuerpo
Muchas horas en la misma postura
Cafeína por la tarde
Dormir de más el fin de semana
Demasiados dulces
Comer con prisa
Levantar cargas pesadas
Dormir con el pelo mojado
Trabajar de más
Demasiado picante o grasa
`),
  },
};
