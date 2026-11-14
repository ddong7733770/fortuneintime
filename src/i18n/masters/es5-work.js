// Pestaña Hoy · frases de trabajo y estudio, ampliación ×5 (se añaden a los conjuntos existentes). Una línea = una frase
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hoy el orden de las tareas puede enredarse una y otra vez.
Hoy tienden a colarse peticiones inesperadas.
Hoy tu concentración se dispersa con facilidad.
Hoy el esfuerzo puede no dar resultados enseguida.
Hoy la presión de los plazos puede sentirse pesada.
Hoy los pequeños errores pueden sumar trabajo.
Hoy las opiniones distintas pueden frenar el trabajo.
Hoy el flujo del trabajo va pesado.
Hoy las tareas previstas pueden quedarse a medias.
Hoy lo que estudias puede no quedarse bien.
Hoy las respuestas que esperas pueden llegar tarde.
Hoy tu carga de trabajo puede parecer mayor de lo normal.
Hoy las decisiones se retrasan y pueden frustrarte.
Hoy las prisas pueden obligarte a rehacer cosas.
Hoy el trabajo pide aguante.
Hoy los pequeños malentendidos pueden enredar el trabajo.
Hoy los dispositivos o los programas pueden fallar.
Hoy las evaluaciones pueden pesarte en la mente.
Hoy los cambios de agenda pueden romper tu ritmo.
Hoy mantenerse firme funciona mejor que probar cosas nuevas.
Hoy el cansancio puede bajar tu concentración en el trabajo.
Hoy pueden surgir momentos en que necesites ayuda.
Hoy los resultados pueden no destacar, y eso puede decepcionar.
Hoy la precisión importa más que la velocidad.
`),
    L(`
Hoy el trabajo fluye en su orden previsto.
Hoy el flujo del trabajo va como de costumbre.
Hoy el estudio y el trabajo avanzan sin esfuerzo.
Un buen día para sacar cosas adelante sin sorpresas.
Hoy tu ritmo de trabajo se mantiene firme.
Hoy el avance tiende a ajustarse a tu plan.
Hoy basta con hacer bien tu parte.
Hoy las tareas se acumulan y se ordenan en silencio.
Hoy los hábitos de cada día crean resultados.
Hoy la constancia brilla más que los grandes logros.
Un buen día para equilibrar trabajo y estudio.
Hoy tú y tus compañeros vais bastante al paso.
El ritmo del trabajo es justo y tu mente está tranquila.
Un buen día para tachar tareas pequeñas una a una.
El trabajo de hoy se mueve dentro de lo que esperas.
Un buen día para ordenar y revisar.
Hoy la jornada tiende a pasar sin grandes altibajos.
Un día tranquilo para repasar lo que has aprendido.
Un buen día para reforzar las bases de tu trabajo.
Hoy los resultados salen a tu nivel habitual.
El trabajo fluye parejo, un buen día para hacer planes.
Hoy basta con seguir con lo que estás haciendo.
Hoy las reuniones y los informes tienden a cerrarse con fluidez.
Un buen día para mantener la línea entre trabajo y descanso.
`),
    L(`
Hoy el trabajo coge velocidad.
Hoy las ideas llegan con facilidad.
Hoy el esfuerzo tiende a convertirse en resultados visibles.
Hoy tu concentración dura mucho.
Hoy la colaboración va sobre ruedas.
Hoy incluso las tareas difíciles pueden mostrar una pista.
Hoy tu papel tiende a destacar.
Hoy lo que estudias se queda enseguida.
Hoy tus propuestas tienden a ser bien recibidas.
Hoy las evaluaciones o las presentaciones pueden tener buena acogida.
Hoy el flujo del trabajo se inclina a tu favor.
Un buen día para despachar de una vez las tareas aplazadas.
Hoy pueden llamar a tu puerta nuevas oportunidades.
Hoy las decisiones se toman rápido.
Hoy puede llegar la ocasión de que reconozcan tus habilidades.
El trabajo fluye tan bien que el día se hace corto.
Hoy pide ayuda y alguien te echará una mano con gusto.
Hoy puedes acercarte un paso a tu objetivo.
Un buen día para mostrar tus habilidades en exámenes o entrevistas.
Hoy los resultados del trabajo pueden verse en números.
Un buen día para mostrar liderazgo.
Hoy aprendes más rápido.
Hoy la dirección de tu trabajo se ve clara.
Hoy tu energía va directa a tu trabajo.
`),
  ],
  more: [
    L(`
Hoy pon tu energía en proteger las tareas que ya tienes en lugar de aceptar más.
Si te atascas, apártate un momento y vuelve a mirar; suele aparecer un camino.
Un día para revisar errores en el proceso más que en el resultado.
Si las instrucciones son vagas, una pregunta para aclararlas ahorra mucho tiempo.
Escribe lo que quede pendiente hoy al principio de la lista de mañana y tu mente se calmará.
Si estás cansado, pasar los juicios importantes a la tarde es una opción.
Una pequeña victoria cambia el flujo del día.
Si recibiste críticas, anota solo el contenido, no las emociones.
Cuantas más tareas se acumulan, más compensan cinco minutos para ordenarlas.
Hoy cumplir el plazo importa más que la perfección.
Pedir ayuda puede ser más rápido que resolverlo a solas.
En los días de cansancio, suelta los pensamientos de trabajo al salir.
`),
    L(`
Un buen día para reajustar la agenda de esta semana.
En los días sin grandes cambios, las pequeñas mejoras marcan una gran diferencia.
Encontrar una forma de reducir el trabajo repetitivo facilita el mañana.
Preguntar a tus compañeros cómo van suaviza la colaboración.
Si estás estudiando, hoy te va mejor repasar que avanzar en materia nueva.
El material que ordenes hoy será la base de la próxima tarea.
Dejar notas de trabajo te ayuda a hacer más rápido la misma tarea la próxima vez.
En los días normales, esbozar tu próximo objetivo funciona bien.
Si hay reunión, prepara una pregunta de antemano.
Ponerte pequeños plazos facilita la concentración.
Hoy lo más eficiente es seguir con tu forma de siempre.
Trazar una línea clara entre trabajo y descanso mejora la concentración de mañana.
`),
    L(`
En los días de buen flujo, ataca primero la tarea difícil que vienes aplazando.
Una idea que compartas hoy puede llevar a la siguiente oportunidad.
Si tienes una presentación o un informe, empieza con seguridad por lo esencial.
Si te ofrecen un papel nuevo, considéralo con buenos ojos.
Si estás estudiando, es un buen día para avanzar un poco más.
Mencionar a los compañeros que te ayudaron levanta el ánimo del equipo.
Si los resultados son buenos, apunta cómo llegaste a ellos.
La confianza que construyas hoy tiende a durar.
Si hay algo que negociar o coordinar, inténtalo hoy.
Un buen momento para empezar a aprender una habilidad que llevas tiempo queriendo.
Si te sobra energía, adelanta algo de la semana que viene.
Aunque se vean los resultados, no te saltes la revisión final.
`),
  ],
  why: {
    kwan: L(`
La Autoridad entra como energía que ayuda, así que ganas confianza en tu papel.
La Autoridad cobra vida, un buen momento para mostrar tu capacidad en un puesto de responsabilidad.
Gracias a la Autoridad, tiende a llegar el reconocimiento de tus superiores.
Hoy entra la Autoridad, así que seguir las normas te sienta bien.
Se mueve la Autoridad, así que pueden salir temas de ascensos o evaluaciones.
La Autoridad fluye bien, así que tu lugar en la organización se afianza.
Llega la Autoridad, así que el peso de tu papel puede convertirse en oportunidad.
La Autoridad brilla, así que puedes dejar buena impresión en ambientes formales.
La Autoridad es estable, así que hacer las cosas según las normas da buenos resultados.
La Autoridad gana fuerza, un buen día para asumir un papel de liderazgo.
Con la Autoridad aquí, cumplir promesas y plazos es tu mejor herramienta.
La Autoridad está viva, así que una actitud recta destaca en exámenes o entrevistas.
`),
    kwanBad: L(`
La Autoridad entra pesada, así que las responsabilidades pueden acumularse de golpe.
La Autoridad te pesa, así que puede crecer la presión por las evaluaciones.
La Autoridad te presiona, así que la presión del trabajo puede sentirse intensa.
La Autoridad actúa como carga, así que hoy ve con cuidado con tus superiores.
La Autoridad entra fuerte, así que las normas y las órdenes pueden agotarte.
Hoy se agolpa la Autoridad, así que las tareas pueden multiplicarse de repente.
La Autoridad es mucho para cargar, así que puede crecer el miedo a equivocarte.
Llega la Autoridad pero cuesta manejarla, así que reparte la carga.
Hoy la Autoridad pesa, así que evita comprometerte de más.
La Autoridad entra como carga, así que la tensión puede agarrotarte los hombros.
La Autoridad está fuerte, así que hoy basta con mantenerte firme.
Hoy la Autoridad pesa, así que no te exijas demasiado.
`),
    output: L(`
La Expresión cobra vida, así que los planes y las ideas llegan con facilidad.
Gracias a la Expresión, crece tu poder de convencer hablando y escribiendo.
Hoy entra la Expresión, un buen día para producir resultados.
Se mueve la Expresión, así que se te ocurren soluciones creativas.
La Expresión fluye bien, así que las presentaciones y los informes van con soltura.
La Expresión gana fuerza, así que el trabajo práctico sale pulido.
La Expresión brilla, un buen día para probar un enfoque nuevo.
Llega la Expresión, así que cuanto más expresas tus ideas, más puertas se abren.
La Expresión brilla, así que el trabajo creativo o de orden aplazado sale bien.
Con la Expresión cerca, enseñar a compañeros o a quienes empiezan también tiene peso.
La Expresión está viva, un buen día para convertir ideas en planes concretos.
Se mueve la Expresión, así que hoy deja que tus manos se muevan antes que tu cabeza.
`),
    study: L(`
Llega el Recurso, así que los conocimientos nuevos se asimilan con facilidad.
Gracias al Recurso, es un buen día para estudiar concentrado.
El Recurso cobra vida, así que la preparación de certificados o exámenes coge impulso.
Hoy entra el Recurso, así que los documentos y materiales se ordenan bien.
Se mueve el Recurso, así que los consejos de veteranos o superiores tienden a ayudar.
El Recurso fluye bien, así que te va el trabajo que pide pensar a fondo.
El Recurso gana fuerza, así que lo que no entendías puede encajar de pronto.
El Recurso es estable, un buen día para terminar el estudio que planeaste.
Llega el Recurso, un buen día para revisar contratos o documentos oficiales.
El Recurso brilla, así que los libros o las clases pueden inspirarte.
Con el Recurso cerca, es un buen día para construir tus bases con calma.
El Recurso está vivo, así que lo que aprendes se vuelve habilidad enseguida.
`),
    monthChung: L(`
Tu lugar del trabajo (la rama del Mes) recibe un choque, así que la dirección del trabajo puede cambiar de repente.
Tu rama del Mes se sacude, así que sé flexible con los cambios de agenda.
Tu lugar del trabajo recibe un choque, así que pueden surgir traslados o nuevas funciones.
Un choque golpea tu rama del Mes, así que tu forma habitual de trabajar puede tambalearse.
Tu lugar del trabajo se sacude, así que pueden surgir viajes o trabajo fuera.
Hoy tu rama del Mes recibe un choque, así que tener un plan B ayuda.
Un choque alcanza tu lugar del trabajo, así que pueden colarse peticiones repentinas.
Tu rama del Mes está en conflicto, así que decide solo después de comprobar.
Tu lugar del trabajo recibe un choque, así que pueden llegar noticias de cambios en la organización.
Tu rama del Mes se sacude, así que ayuda ver el cambio como una oportunidad.
Con un choque en tu lugar del trabajo, el orden de las tareas en curso puede cambiar.
Hoy un choque golpea tu rama del Mes, así que haz copia de los archivos importantes con antelación.
`),
    rob: L(`
Llega la energía de los Pares, así que puedes chocar con compañeros por opiniones.
Se mueven los Pares, así que el orgullo puede adelantarse en los momentos de competencia.
La energía de los Pares está fuerte, así que pueden crecer las ganas de hacerlo todo a tu manera.
Hoy entran los Pares, así que repartir el mérito puede molestarte.
Los Pares ganan fuerza, así que deja claros los papeles en el trabajo compartido.
Con los Pares en el aire, pueden compararte con gente de nivel parecido.
Llegan los Pares, así que empeñarte en ir por libre puede frenar el trabajo.
Con la energía de los Pares cerca, las opiniones del equipo necesitan coordinarse.
Hoy se mueven los Pares, así que la cooperación da más resultados que la competencia.
Con los Pares aquí, la ayuda de los compañeros puede acelerar las cosas.
Hoy la energía de los Pares está fuerte, así que suaviza tu tono.
Con los Pares presentes, repartir el mérito construye confianza.
`),
    none: L(`
Hoy la estrella del trabajo descansa, así que lo mejor es sacar paso a paso las tareas fijadas.
Hoy la energía del trabajo está en calma, así que te va más ordenar que expandir.
La estrella del trabajo está tranquila, así que basta con mantener tu rutina.
La energía del trabajo está quieta, un buen día para hacer los próximos planes.
Hoy el flujo del trabajo es llano, así que las pequeñas mejoras destacan.
La estrella del trabajo se queda quieta, un buen día para el orden aplazado.
La energía del trabajo está en calma, buena para centrarte en lo básico.
La estrella del trabajo no se mueve, así que no hace falta apresurar grandes decisiones.
La energía del trabajo está tranquila, así que la minuciosidad será tu mayor resultado.
La estrella del trabajo toma aire, un buen día para trabajar al ritmo de tu estado.
Hoy hay poco cambio en el trabajo, un buen momento para dedicarlo a aprender.
La energía del trabajo está en calma, buena para sincronizarte con tus compañeros.
`),
  },
  caution: L(`
Revisa dos veces las fechas y horas de entrega.
Repasa una vez más los materiales con cifras y unidades.
Apunta las notas de la reunión justo al terminar.
Comprueba los nombres y versiones de archivo antes de subirlos a carpetas compartidas.
No envíes respuestas con las emociones altas.
No prometas plazos de los que no estés seguro.
No te saltes revisiones solo porque tengas prisa.
Evita señalar los errores de otros en público.
No envíes contraseñas ni datos de seguridad por mensajería.
Aclara el alcance y el plazo antes de aceptar un trabajo.
Lee en voz alta una vez los correos importantes antes de enviarlos.
Hacer varias cosas a la vez tiende a causar errores.
No cites fuentes que no hayas comprobado.
Si las instrucciones de un superior no están claras, pregunta enseguida.
Comprueba el plazo de las peticiones que llegan justo antes de salir.
Ten cuidado de que los comentarios casuales no se malinterpreten.
Comprueba el orden de las páginas antes de imprimir o entregar.
Carga el portátil o el móvil con antelación.
Presta atención a la seguridad al recibir archivos de fuera.
Aleja el móvil mientras estudias.
Vuelve a comprobar el lugar y la hora de exámenes o entrevistas.
Hoy contén los juicios sobre el trabajo de otros.
Pon por escrito los contratos y los acuerdos.
Concentrarte mañana rinde más que hacer horas extra esta noche.
Guarda a menudo si tu trabajo no se guarda solo.
Comprueba por la mañana que la hora de las reuniones no ha cambiado.
Asegúrate de que no falte ningún documento necesario.
Comprueba una vez cómo van las tareas que delegaste.
Ten cuidado de no confundir los chats de grupo con los privados.
Apunta incluso las promesas pequeñas para no olvidarlas.
No tomes decisiones importantes estando agotado.
Mantente alerta sobre todo con las tareas conocidas.
No cuentes con que otra persona revise por ti.
No te guardes las quejas; plantéalas con calma en el momento adecuado.
Cuando se solapen agendas, fija primero las prioridades.
Calcula tiempo de sobra para el tráfico.
`),
  tip: L(`
Elige por la mañana tu tarea más importante.
Despeja tu mesa una vez antes de empezar.
Agrupa las tareas parecidas.
Apaga las notificaciones para crear un rato de concentración.
Antes de irte, resume en tres líneas el trabajo de hoy.
Divide las tareas difíciles en pasos pequeños.
Después de comer, empieza por las tareas más ligeras.
Ten en un solo sitio los materiales que más usas.
Busca enseguida los términos que no conozcas y apúntalos.
Cuando te atasques, intenta explicárselo a otra persona.
Vaciar la bandeja de entrada también despeja la cabeza.
Reconócete las pequeñas victorias de hoy.
Las sesiones de estudio cortas y frecuentes se quedan más tiempo.
Escribe en una línea lo que vas a decir antes de una reunión.
Pon también los descansos en tu agenda.
Las buenas preguntas llevan a buenos resultados.
Frena los errores repetidos con una lista de comprobación.
Cuando termines algo, apunta enseguida la siguiente tarea.
Aprender de los puntos fuertes de tus compañeros hace crecer tus habilidades.
Pon tu propio plazo el día antes de la entrega.
Decide qué puedes hacer en los ratos sueltos.
Ordena lo que aprendiste como si fueras a enseñarlo.
Cuando haya mucho, empieza por lo más fácil de arrancar.
Apunta los comentarios que recibas y aplícalos uno a uno.
No te quedes mucho tiempo en la misma postura; levántate a menudo.
Dale las gracias brevemente a un compañero que te ayudó hoy.
Pon tu objetivo de la semana en una nota adhesiva.
Empieza la tarea que temes diciéndote que solo serán diez minutos.
Ajusta el brillo de la pantalla para que no canse la vista.
Busca una franja tranquila y pon allí las tareas difíciles.
Una norma para nombrar archivos hace que sea fácil encontrarlos.
Apunta las buenas ideas en cuanto lleguen.
Al estudiar, fija un tiempo objetivo y usa un temporizador.
Divide la lista de hoy en lo que hay que terminar y lo que puede esperar.
Aprende un atajo de una herramienta que uses en el trabajo.
Tachar incluso las tareas pequeñas aumenta la motivación.
`),
  act: [
    L(`
Reduce la lista de hoy a tres tareas y termina solo esas.
Haz una lista de comprobación antes de entregar y ve marcando.
Decide a quién preguntar por la tarea en la que estás atascado.
Elige una cosa de la agenda de hoy que puedas aplazar.
Si te equivocaste, corrígelo enseguida.
Haz copia de seguridad de los archivos importantes.
Mete dos descansos cortos en tu jornada.
Reescribe como notas las instrucciones que recibiste.
Revisa tu calendario por si hay solapamientos.
Hoy termina el trabajo en curso antes de aceptar nada nuevo.
Escribe en papel el orden de las tareas antes de empezar.
Apunta una lección que hayas aprendido hoy.
`),
    L(`
Ordena por prioridad lo que queda de las tareas de esta semana.
Ponte al día brevemente con un compañero sobre los avances.
Busca una forma de reducir el trabajo repetitivo.
Vuelve a revisar los objetivos de estudio de este mes.
Despeja los correos y mensajes acumulados.
Prepara con antelación el orden del día de tu próxima reunión.
Ordena tus carpetas de trabajo.
Termina por la mañana la tarea que quedó de ayer.
Resume en una página lo que aprendiste.
Esboza con antelación la agenda de la semana que viene.
Actualiza tu manual o tus notas de trabajo.
Termina el día tachando lo que acabaste.
`),
    L(`
Comparte hoy el plan que has preparado.
Usa tus mejores horas de concentración para la tarea más difícil.
Levanta la mano para un papel o un proyecto nuevo.
Pon brevemente al día a tu superior sobre tus resultados.
Apúntate al certificado o al curso que vienes aplazando.
Propón tú primero la tarea que necesita colaboración.
Añade los resultados de hoy a tu portafolio.
Fija tu próximo objetivo como una cifra concreta.
Si tienes pronto una entrevista o un examen, practica como si fuera real.
Comparte información útil con tus compañeros.
Prueba una idea a la que llevas tiempo dando vueltas.
Pule las frases clave de tu presentación.
`),
  ],
};
