// Pestaña Hoy · frases de salud, ampliación ×5 (se añaden a los conjuntos existentes). Una línea = una frase
// Sin diagnósticos, medicamentos ni promesas de tratamiento. Si algo no va bien, primero un profesional
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hoy tu cuerpo puede estar pidiéndote descanso.
Hoy el pequeño cansancio puede acumularse y pesar.
Hoy tu energía puede agotarse rápido.
Hoy incluso las tareas de siempre pueden parecer demasiado.
Hoy tu cuerpo y tu mente pueden ir desacompasados.
Hoy tu estado está bajo.
Hoy puede notarse la falta de sueño.
Tu cuerpo puede reaccionar con sensibilidad al tiempo o a los cambios de tu entorno.
Hoy la tensión tiende a acumularse en el cuerpo.
Hoy la recuperación necesita más tiempo.
Pasarte hoy puede arrastrar el cansancio hasta mañana.
Hoy puedes coger frío con facilidad.
Hoy tu concentración puede nublarse rápido.
Un día para usar el cuerpo con moderación.
Hoy cuidado con pequeños golpes o torceduras.
Hoy las comidas pueden volverse irregulares.
Hoy el cansancio mental puede notarse en el cuerpo.
Hoy necesitas más descanso que actividad.
Sientes el cuerpo pesado y quizá no te apetezca moverte.
Un día para repartir tu energía.
Hoy tu estado puede cambiar mucho entre la mañana y la tarde.
Hoy el cansancio puede notarse en tu cara.
Hoy la tarea principal es proteger tu resistencia.
Hoy tomarte un descanso es, en realidad, adelantar.
`),
    L(`
Hoy tu cuerpo mantiene su ritmo habitual.
Hoy tu estado no oscila mucho.
Hoy tu cuerpo se mantiene en equilibrio.
Un buen día para pasar la jornada sin esfuerzo.
La suerte en la salud es normal, así que hoy los hábitos marcan tu estado.
Hoy basta con cuidar las comidas y el sueño.
Tu cuerpo sigue el paso a tu velocidad de siempre.
Puedes terminar el día sin mucho cansancio.
Hoy cuerpo y mente encuentran un equilibrio tranquilo.
Hoy te va bien la actividad ligera.
Tu estado es estable, un buen día para mantener tu rutina.
Hoy la salud fluye en calma.
Un buen día para revisar tus hábitos diarios.
Tu energía se mantiene en un nivel cómodo.
Mientras no te pases, es un día fácil.
Hoy las rutinas regulares dan fruto.
Hoy las señales de tu cuerpo están tranquilas.
Un buen día para mantener tu ejercicio habitual.
Hoy no hay grandes cambios en el flujo de tu salud.
Un buen día para hacer tus cosas escuchando a tu cuerpo.
Hoy la energía que gastas y la que recuperas más o menos cuadran.
Un buen día para quitarte el cansancio con antelación.
Los pequeños movimientos a lo largo del día protegen tu estado.
Tu cuerpo está en buena forma, así que puedes moverte según lo previsto.
`),
    L(`
Hoy la fuerza llena tu cuerpo.
Hoy tu estado se ilumina.
Hoy puedes sentirte ligero desde la mañana.
Cuanto más activo estés, más energía tendrás.
La recuperación es fuerte, así que hoy el cansancio se va rápido.
Hoy crece el gusto por moverte.
La energía sobra y el día se hace largo.
Hoy cuerpo y mente se sienten renovados.
Hoy puedes notar con claridad los beneficios del ejercicio.
Hoy el aire de fuera se siente especialmente fresco.
Hoy mejoran a la vez la concentración y la resistencia.
Un buen día para probar una actividad nueva.
Hoy el bienestar se te nota en la cara.
Hoy tu cuerpo está en buen equilibrio.
Hoy la sensación de descanso tras dormir dura mucho.
Tu vitalidad ilumina a la gente de tu alrededor.
Sientes el cuerpo ligero y tus pasos son animados.
Un buen día para empezar un hábito saludable.
Hoy ni el trabajo físico te cansa con facilidad.
Hoy tu cuerpo colabora bien.
La energía se reparte por igual y el día resulta fácil.
Las actividades que te hacen sudar también levantan el ánimo.
Te sientes bien, así que trabajar y descansar salen bien.
Hoy la energía de la salud está abierta de par en par.
`),
  ],
  more: [
    L(`
Hoy cierra los ojos y descansa unos minutos entre tarea y tarea.
En los días pesados, baja la intensidad y céntrate en estirar.
Una ducha caliente alivia mucho la tensión.
Con solo no mirar pantallas hasta tarde esta noche ya te recuperas.
Empieza por no saltarte comidas y comer despacio.
Cuanto más cansado estés, más conviene beber agua antes que cafeína.
Aplazar con educación los planes que son demasiado es una forma de cuidarte.
Mira dónde pisas y ve despacio en escaleras o suelos resbaladizos.
Hoy protege el calor de tu cuerpo con ropa abrigada.
Si tienes la mente cansada, descansa escuchando música que te guste.
Acostarte un poco antes hace más ligero el mañana.
Hoy pon el descanso por delante de las tareas de casa que vienes aplazando.
`),
    L(`
Incluso caminar un poco más hoy alegra a tu cuerpo.
Mantener horarios de comida regulares estabiliza tu estado.
Crea el hábito de cambiar de postura una vez por hora.
Suelta la espalda y los hombros rígidos con estiramientos suaves.
Ten una botella de agua cerca y bebe a menudo.
Bajar las luces antes de dormir tiende a hacer el sueño más profundo.
Los días normales son buenos para revisar tus hábitos.
Añade una verdura o una fruta más a tu día.
Elige una cosa que le guste a tu cuerpo y hazla hoy.
Un poco de sol mejora el ánimo y el ritmo.
Hoy haz andando parte del trayecto al trabajo.
En un día libre, mover el cuerpo un poco ayuda.
`),
    L(`
En los días buenos, empieza el ejercicio que vienes aplazando.
Fijar una rutina nueva mientras te sientes ligero ayuda a que dure.
Aumenta tu actividad, pero calienta siempre antes.
Mientras tengas buena energía, fija un objetivo de salud.
Haz del día algo agradable con actividad al aire libre o un paseo.
Duerme hoy tan a fondo como sudes.
Aunque te sobre energía, no olvides hidratarte.
Buscar un compañero de ejercicio hace más fácil mantenerlo.
Apuntar lo bien que te sientes te ayuda a encontrar tu ritmo.
En los días ligeros, hasta ordenar y limpiar puede ser divertido.
Mientras estés con energía, planea con antelación comidas sanas.
Cuanto más te muevas hoy, más clara tiende a sentirse tu mente.
`),
  ],
  why: {
    excess: L(`
La energía de {el} se inclina hacia un lado, así que {organ} puede cansarse con facilidad.
Se suma más energía de {el} a la que ya abunda, así que no fuerces {organ}.
Hoy la energía de {el} se desborda, así que deja descansar {organ} y no te pases.
Hoy la energía de {el} va alta, así que presta atención a {organ}.
Se acumula mucha energía de {el}, así que {organ} puede estar sensible.
Hoy la energía de {el} desequilibra la balanza, así que reduce los hábitos que cargan {organ}.
Hoy se llena la energía de {el}, así que {organ} puede cansarse con facilidad.
Llega un exceso de energía de {el}, así que trata con suavidad {organ}.
Hoy la energía de {el} se hace fuerte, así que da descanso a {organ}.
Hoy se amontona la energía de {el}, así que alivia con antelación el cansancio de {organ}.
Hoy aumenta la energía de {el}, así que no sobrecargues {organ}.
La energía de {el} llega toda de golpe, así que escucha las señales de {organ}.
`),
    lack: L(`
Llega la energía de {el} que te faltaba, así que el equilibrio de tu cuerpo tiende a asentarse.
Hoy se completa la energía de {el}, así que tu estado tiende a estabilizarse.
Se repone la energía de {el} que faltaba, así que tu cuerpo tiende a sentirse a gusto.
Hoy llega la energía de {el} y llena el hueco.
Hoy se repone la energía de {el}, así que la recuperación tiende a ser más fácil.
Entra la energía de {el} que estaba vacía, y tu cuerpo la recibe bien.
Se suma energía de {el}, así que tus cinco elementos tienden a igualarse.
Con la energía de {el} completa, un ritmo normalmente débil tiende a revivir.
Hoy llega la energía de {el}, así que tu cuerpo tiende a sentirse ligero.
Se añade la energía de {el} que faltaba, así que el descanso te repara bien.
Llega la energía de {el}, un buen día para equilibrar cuerpo y mente.
Hoy se completa la energía de {el}, un buen día para empezar un hábito saludable.
`),
    chung: L(`
Tu lugar del yo (la rama del Día) recibe un choque, así que tu estado puede subir y bajar.
Hoy tu rama del Día se sacude, así que puedes cansarte más de lo normal.
Un choque golpea tu rama del Día, así que el sueño o el ritmo diario pueden desajustarse.
Tu lugar del yo recibe un choque, así que puede crecer la tensión en el cuerpo.
Tu rama del Día está en conflicto, así que muchos desplazamientos pueden acumular cansancio.
Hoy tu rama del Día recibe un choque, así que deja sin falta huecos de descanso entre planes.
Tu lugar del yo se sacude, así que el cansancio mental puede llegar al cuerpo.
Con un choque en tu rama del Día, los cambios repentinos de agenda pueden agotarte.
Hoy tu rama del Día se sacude, así que cuidado con hacerte daño por las prisas.
Tu lugar del yo recibe un choque, así que necesitas más descanso de lo normal.
Hoy un choque golpea tu rama del Día, así que evita el ejercicio intenso.
Hoy tu rama del Día está en conflicto, así que lo mejor es calmar el cuerpo.
`),
    hyeong: L(`
Está presente la energía del Castigo, así que hoy las prisas pueden acabar en golpes.
Hoy llega el Castigo, así que ten cuidado con las herramientas afiladas.
Por la energía del Castigo pueden ocurrir pequeñas lesiones, así que muévete despacio.
Con el Castigo cerca, calienta sin falta antes de hacer ejercicio.
Está presente la energía del Castigo, así que la tensión puede agarrotar el cuerpo.
Llega el Castigo, así que mira dónde pisas en escaleras y calles.
La energía del Castigo está en el aire, así que no mantengas mucho rato posturas forzadas.
Con el Castigo cerca, deja más margen al conducir.
Por la energía del Castigo, el cansancio acumulado puede llevar a descuidos.
Hoy llega el Castigo, así que ten cuidado al levantar cosas pesadas.
Está presente la energía del Castigo, así que cuerpo y mente pueden estar a flor de piel.
Con el Castigo cerca, hoy pon la seguridad por delante.
`),
    none: L(`
Hoy tus cinco elementos se mantienen en equilibrio, un día correcto.
La energía de la salud apenas se sacude, así que bastan tus hábitos de siempre.
La energía de tu cuerpo está en calma, un buen día para mantener tu ritmo.
Los cinco elementos fluyen parejos, así que el día tiende a pasar cómodo.
Hoy no hay grandes cambios en la energía de la salud, un buen día para revisarte.
La energía de tu cuerpo está en calma, así que te va la actividad ligera.
El flujo de los elementos es llano, así que solo no te pases.
La energía de la salud está tranquila, así que mantén sueño y comidas regulares.
Tu energía es estable, un buen día para seguir con tu ejercicio habitual.
Los elementos están en equilibrio, así que las señales de tu cuerpo también están tranquilas.
Hoy hay poco cambio en la salud, un buen momento para afianzar buenos hábitos.
La energía se reparte por igual en tu cuerpo, así que el día tiende a resultar fácil.
`),
  },
  tip: L(`
Después de comer, da un paseo corto en lugar de tumbarte enseguida.
Una vez al día, mira al cielo y respira hondo.
Lávate manos y pies con agua tibia antes de dormir.
Mantén la espalda recta al sentarte.
Agranda un poco el texto de tu pantalla.
Fija horas para beber agua.
Abre la ventana para ventilar la habitación al despertar.
Cambia los snacks por fruta o frutos secos.
Sube uno o dos pisos por la escalera en lugar del ascensor.
Baja las luces una hora antes de dormir.
Gira despacio el cuello y los hombros.
Toma un poco de sol a la hora de comer.
Reduce un poco la comida salada hoy.
Mastica despacio y bien.
Gira suavemente los tobillos y las muñecas.
Una vez al día, muévete al ritmo de una canción que te encante.
Airea al sol la almohada y la manta.
Evita la cafeína a última hora del día.
Guarda el móvil en el bolsillo mientras caminas.
Cierra los ojos y céntrate solo en tu respiración durante un minuto.
Si tu bolso pesa mucho, aligera la carga.
Toma una comida con una sopa caliente.
Haz estiramientos suaves antes de dormir.
Mantén constante la hora de tu despertador.
Entra en calor con un baño o un baño de pies.
Ajusta la altura de tu silla de trabajo.
Bájate una parada antes al volver a casa y camina.
Mira una vez hoy tu número de pasos.
Si tienes frío, ponte varias capas finas.
Haz hoy una pausa con tu té favorito.
Pasa más tiempo de pie y erguido.
Descansa cinco minutos con los ojos cerrados después de comer.
Escribir el plan de mañana antes de dormir tranquiliza la mente.
Cambia el ambiente de tu habitación con un aroma agradable.
Los fines de semana, despiértate a la misma hora en lugar de recuperar sueño.
Empieza hoy un pequeño hábito para tu cuerpo.
`),
  // Última línea en los días de salud baja: un horóscopo no sustituye al médico (con redacción rotativa)
  tipLow: L(`
Si el mismo síntoma vuelve una y otra vez, consulta a un médico antes que a cualquier horóscopo.
Si una molestia se alarga, habla con un profesional antes de fiarte de un horóscopo.
Si notas un dolor o una molestia fuera de lo normal, lo mejor es que te revisen en una consulta.
Un horóscopo solo es una guía, así que si algo no va bien, ve primero al médico.
Si el cansancio no se te pasa en varios días, pide a un profesional que revise cómo estás.
`),
  act: [
    L(`
Quita una cosa de los planes de hoy y descansa en ese tiempo.
Fija una hora para acostarte y pon una alarma.
Cierra los ojos y descansa diez minutos después de comer.
Toma hoy una comida caliente.
Suelta despacio el cuello y los hombros durante tres minutos.
Da un paseo suave en lugar de hacer ejercicio intenso.
Reduce los planes de la tarde y descansa en casa.
Intenta beber ocho vasos de agua.
Relájate con un medio baño o una ducha caliente.
Deja el móvil fuera de la cama al dormir.
Si sientes el cuerpo pesado, acorta la lista de tareas de hoy.
Respira hondo y despacio cinco veces.
`),
    L(`
Levántate y estira una vez por hora.
Fija un objetivo de pasos para hoy.
Fija horas de comida y cúmplelas.
Estira diez minutos por la tarde.
Haz un plan corto de ejercicio para esta semana.
Cambia un snack por algo sano.
Ordena la cama y acuéstate temprano.
Llena una botella de agua y tenla en la mesa.
Toma el sol en un paseo a la hora de comer.
Pon un recordatorio para corregir la postura.
Apunta lo que has comido hoy.
Da una vuelta por tu barrio esta tarde.
`),
    L(`
Camina o haz ejercicio 20 minutos más de lo habitual.
Sigue una clase o un vídeo de ejercicio nuevo.
Suda un poco subiendo escaleras.
Queda con un amigo para hacer ejercicio.
Fija un objetivo de salud para esta semana.
Disfruta de una actividad al aire libre como la bici o una ruta suave.
Cocina con ingredientes sanos.
Crea una rutina de estiramientos por la mañana.
Registra la actividad de hoy en una app de ejercicio.
Prueba un movimiento que antes no te salía.
Aprovecha tu buena energía para ordenar o limpiar la casa.
Comprueba la fecha de tu próxima revisión médica.
`),
  ],
};
