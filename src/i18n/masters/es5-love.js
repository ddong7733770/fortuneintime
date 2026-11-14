// Pestaña Hoy · frases de amor, ampliación ×5 (se añaden a los conjuntos existentes). Una línea = una frase
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hoy expresar lo que sientes puede salir torcido.
Hoy sus reacciones pueden parecerte más frías de lo normal.
Hoy las pequeñas heridas pueden hincharse con facilidad.
Hoy dar un pequeño paso atrás en las relaciones resulta más fácil.
Hoy la temperatura de una conversación puede sentirse distinta a cada lado.
Hoy puede que no recibas tanto cariño como esperabas.
Hoy las emociones se adelantan y las palabras pueden volverse afiladas.
Hoy la energía de los vínculos está baja.
Hoy puedes darle demasiadas vueltas a las cosas.
Hoy el momento de los mensajes no deja de fallar.
Tu corazón se cansa con facilidad y las relaciones pueden pesar.
Hoy puedes entender sus palabras de otra manera.
Hoy la preocupación llega antes que la ilusión.
Hoy pueden aflorar viejos recuerdos e inquietarte.
Hoy puedes sentirte pequeño dentro de la relación.
Hoy una sola promesa pequeña puede herirte.
En el amor, hoy cuanto más te apresuras, más se enreda.
Hoy calmar tu corazón importa más que mostrarlo.
Hoy las agendas apretadas pueden sentirse como distancia.
Hoy los cambios de humor se notan en la relación.
Hoy cuida de tu propio corazón antes que de vínculos nuevos.
Los pequeños malentendidos se acumulan, así que hoy cada palabra cuenta.
Hoy la espera se hace larga en las relaciones.
El flujo de los vínculos parece detenerse un rato.
`),
    L(`
Hoy tu relación sigue con su calidez de siempre.
Hoy el amor está tranquilo pero firme.
Un día de sentiros a gusto el uno con el otro, sin necesidad de nada especial.
La suerte en el amor está en calma, así que destaca la amabilidad cotidiana.
Sin grandes mariposas, pero tu corazón está en paz.
Hoy tu relación sigue su ritmo habitual.
Hoy la charla con alguien cercano fluye bien.
Hoy el flujo de los vínculos va parejo.
Un día tranquilo para compartir el día de cada uno.
Las olas emocionales son pequeñas y el día se mantiene sereno.
Un buen día para mirar tu relación actual.
Hoy la familiaridad es una fortaleza en el amor.
Hoy los vínculos que has mantenido se sienten más cálidos que los nuevos.
Un día relajado y sin grandes sorpresas en el amor.
Hoy tu corazón está en calma.
Hoy los pequeños gestos de cuidado llegan tal cual.
La energía de los vínculos es normal, pero las conversaciones van bien.
Hoy el tiempo juntos fluye con naturalidad.
Tu relación mantiene su lugar sin prisas.
La suerte en el amor fluye pareja y el día a día resulta cómodo.
Hoy tu relación puede hacerse más honda en silencio.
Si estás soltero, es un buen día para disfrutar de tu propio tiempo.
El flujo del amor está en calma, así que ordenar tus sentimientos resulta fácil.
Hoy los mensajes ligeros van y vienen con gusto.
`),
    L(`
Hoy tus sentimientos llegan con calidez.
Hoy las señales de interés van y vienen con facilidad.
Hoy la risa estalla a menudo en la conversación.
Hoy tu encanto se nota con naturalidad.
Hoy la energía de los vínculos brilla con fuerza.
Un buen día para mostrar que alguien te gusta.
Hoy los nuevos encuentros tienden a empezar con buen pie.
Hoy tu relación puede acercarse un paso.
Hoy tus ideas encajan con las suyas.
Hoy puede llegarte un mensaje emocionante.
Hoy la suerte en el amor está abierta de par en par.
Hoy el tiempo juntos se siente especial.
Hoy lo que querías decir sale con suavidad.
Hoy un vínculo puede llegar desde muy cerca.
Hoy la sinceridad de cada uno se ve con facilidad.
Hoy entra nueva vida en tu relación.
Hoy las primeras impresiones tienden a quedarse para bien.
Un buen día para compartir sentimientos que te hacían dudar.
Hoy las palabras amables se recuerdan mucho tiempo.
Hoy sopla viento a favor en el flujo de los vínculos.
Hoy puedes atraer miradas en las reuniones.
Hoy crece el interés mutuo.
Hoy pueden llegar buenas noticias en el amor.
Los corazones conectan y hoy las conversaciones se alargan.
`),
  ],
  more: [
    L(`
Cuando te sientes sensible, es mejor descansar un día que llegar a una conclusión.
Si algo te dolió, escríbelo hoy y reléelo mañana.
Puede que su silencio no tenga nada que ver contigo.
En los días emocionales, hablar en persona causa menos malentendidos que escribir.
Bajar hoy un poco tus expectativas aligera tu corazón.
Cuanto más tiempo adivinas a solas, más pesado tiende a volverse tu corazón.
Si la relación te pesa, cuídate primero a ti.
Las palabras dichas en días de cansancio llegan más duras de lo que pretendes.
No dejes que la pequeña discusión de hoy se alargue.
Cuando tu corazón vacile, habla con un amigo de confianza.
Pensar una vez más en su situación alivia el dolor.
No hace falta que hoy obtengas una respuesta.
`),
    L(`
En los días fáciles, decir gracias en voz alta fortalece el vínculo.
Una comida juntos puede significar más que cualquier evento especial.
Compartir vuestras agendas reduce los pequeños desencuentros.
Incluso en una relación conocida, un elogio ligero se siente fresco.
Si estás soltero, es un buen día para buscar un grupo de algo que te guste.
Hoy basta con escucharle hasta el final.
Las conversaciones de los días tranquilos pueden volverse una gran fuerza más adelante.
Envía un saludo ligero a alguien con quien no hablas desde hace tiempo.
Un buen día para hablar juntos de vuestros próximos planes.
Recuerda una cosa que le guste y más adelante lucirá.
Hoy lo mejor es mantener un ritmo que te resulte cómodo.
Buscad cosas pequeñas de las que reíros juntos.
`),
    L(`
Hoy tus sentimientos llegan bien, así que di lo que te hacía dudar.
Si conoces a alguien nuevo, sé tú mismo con naturalidad.
Si tienes pareja, pasad tiempo en algún sitio distinto del habitual.
Un buen día para proponer un plan informal a alguien que te gusta.
Puedes creerte tal cual las palabras amables que oigas hoy.
Guardar vuestros recuerdos en fotos o notas los conserva más tiempo.
Cuando el ambiente sea bueno, compartid lo que cada uno espera.
Si hay una presentación, ir con ligereza es buena idea.
Ser concreto en lo que agradeces llega más hondo.
Hoy escribir tú primero crea un buen flujo.
Si ves una oportunidad para que la relación avance, no la dejes pasar.
Es un día con suerte, así que deja que tu cara y tu tono muestren calma.
`),
  ],
  why: {
    star: L(`
{star} entra como energía que ayuda, así que los corazones conectan con facilidad.
{star} cobra vida, así que aparecen oportunidades para encuentros nuevos.
{star} llega hoy, un buen momento para mostrar interés.
{star} brilla con fuerza, así que entra calidez en las relaciones.
{star} se mueve, así que puedes conectar con alguien que te atrae.
{star} brilla hoy, así que las conversaciones fluyen con naturalidad.
{star} llega, así que el tiempo con tu pareja puede sentirse más especial.
{star} fluye bien, así que las presentaciones o las reuniones pueden traer a alguien.
{star} te apoya, así que el valor para acercarte tiende a dar fruto.
{star} está viva, un buen momento para pensar en el siguiente paso de tu relación.
{star} llega, así que hoy sus sentimientos se leen con facilidad.
Gracias a {star}, los primeros encuentros tienden a dejar buena impresión.
`),
    bad: L(`
La estrella de los vínculos entra pesada, así que tu corazón puede cansarse con facilidad.
La energía de los vínculos te pesa, así que puedes sentir carga en las relaciones.
La estrella de los vínculos llega pero te presiona, así que baja el ritmo.
La energía de los vínculos entra fuerte, así que puedes agotarte adaptándote a la otra persona.
La estrella de los vínculos actúa como carga, así que las expectativas y la realidad pueden separarse.
La energía de los vínculos se desborda, así que el desgaste emocional puede crecer hoy.
La estrella de los vínculos pesa, así que no apresures las decisiones.
La energía de los vínculos es mucho para cargar, así que puedes acabar sosteniendo la relación tú solo.
Llega la estrella de los vínculos, pero hoy protege primero tu propio corazón.
La energía de los vínculos pesa, así que recuerda que está bien decir que no.
Se agolpan las estrellas de los vínculos, así que tu corazón puede sentirse atareado.
La energía de los vínculos pesa, así que te van mejor los encuentros ligeros.
`),
    dohwa: L(`
Llega la Flor de Durazno, así que atraes miradas con naturalidad.
La Flor de Durazno cobra vida, así que las primeras impresiones salen especialmente bien.
Gracias a la Flor de Durazno, puedes acabar en el centro de las conversaciones.
Hoy entra la Flor de Durazno, así que el encanto se nota en tu tono y tu expresión.
Se mueve la Flor de Durazno, así que puedes conectar con alguien nuevo.
La Flor de Durazno brilla, así que el esfuerzo que pongas en tu aspecto compensa.
Llega la Flor de Durazno, así que pueden llegar más mensajes de lo habitual.
La Flor de Durazno fluye bien, así que puedes captar señales de interés.
La Flor de Durazno brilla, así que tu presencia crece entre la gente.
Con la Flor de Durazno cerca, tienes el poder de suavizar el ambiente.
La Flor de Durazno está viva, así que puedes mostrar también a tu pareja un lado nuevo.
Con la Flor de Durazno aquí, hoy te van las reuniones concurridas.
`),
    dayHap: L(`
Una armonía toca el lugar de tu pareja (la rama del Día), así que estás en sintonía con alguien cercano.
Tu rama del Día forma una armonía, así que el tiempo juntos resulta fácil.
Una armonía alcanza el lugar de tu pareja, así que os entendéis con más amplitud.
Tu rama del Día encuentra una armonía, un buen día para hacer las paces tras una discusión.
El lugar de tu pareja queda unido por una armonía, bueno para hacer planes juntos.
Una armonía toca tu rama del Día, así que la persona a tu lado te da tranquilidad.
Se forma una armonía con el lugar de tu pareja, así que acompasar los corazones resulta fácil.
Tu rama del Día se combina hoy, así que puede instalarse una calma casi familiar.
Una armonía alcanza el lugar de tu pareja, así que los planes tienden a ir bien.
Tu rama del Día recibe una armonía, así que la empatía llega fácil en la conversación.
El lugar de tu pareja se templa con una armonía, así que los pequeños gestos llegan lejos.
Una armonía toca tu rama del Día, así que el día a día juntos es divertido.
`),
    dayChung: L(`
El lugar de tu pareja (la rama del Día) recibe un choque, así que podéis chocar por cosas pequeñas.
Hoy tu rama del Día se sacude, así que los planes pueden cambiar de repente.
El lugar de tu pareja recibe un choque, así que las diferencias de pensamiento pueden parecer mayores.
Un choque golpea tu rama del Día, así que un tono de voz puede alterarte.
El lugar de tu pareja se sacude, así que hoy aplaza las grandes decisiones.
Hoy tu rama del Día recibe un choque, así que quizá cada uno necesite su espacio.
Un choque alcanza el lugar de tu pareja, así que los planes pueden cruzarse.
Tu rama del Día está en conflicto, así que reacciona un compás más tarde.
El lugar de tu pareja recibe un choque, así que pueden resurgir viejos problemas.
Tu rama del Día se sacude, así que compartir hechos ayuda más que compartir sentimientos.
Con un choque en el lugar de tu pareja, los viajes o los cambios de agenda pueden hacer que no os veáis.
Hoy un choque golpea tu rama del Día, así que expresa con suavidad lo que te duele.
`),
    stemHap: L(`
Tu tronco del Día forma una unión, así que puede aparecer alguien que te atraiga.
Llega una energía que se une con tu tronco del Día, así que las conversaciones fluyen con suavidad.
Tu tronco del Día encuentra una unión, así que hoy los corazones se tocan con facilidad.
Hoy tu tronco del Día se une, un buen momento para encontrar a alguien con quien estar.
Tu tronco del Día queda unido, así que crece la estabilidad en las relaciones.
Gracias a una energía que se une con tu tronco del Día, el interés fluye con naturalidad.
Tu tronco del Día se une, un buen día para quedar con alguien.
Una unión alcanza tu tronco del Día, así que aceptar su propuesta resulta fácil.
Tu tronco del Día encuentra una unión, así que un viejo conocido puede parecer nuevo.
La energía que se une con tu tronco del Día puede hacer crecer la atracción mutua.
Tu tronco del Día conecta por una unión, así que hacer cosas juntos resulta divertido.
Hoy tu tronco del Día se une, así que alguien con quien compartir tu corazón está cerca.
`),
    none: L(`
Hoy la estrella de los vínculos descansa, un buen momento para cuidar el vínculo que tienes al lado.
La energía de los vínculos está en calma, así que hoy te va el tiempo para ti.
La estrella de los vínculos está tranquila, así que no hace falta forzar encuentros.
La energía de los vínculos está quieta, así que el tiempo con gente conocida resulta fácil.
Hoy el flujo de los vínculos es llano, así que sigue como de costumbre.
La estrella de los vínculos se queda quieta, un buen día para ordenar las relaciones.
La energía de los vínculos está tranquila, buena para explorar tus propios gustos y sentimientos.
La estrella de los vínculos no se mueve, así que un pequeño saludo se siente más cálido.
La energía de los vínculos está en calma, así que observa en lugar de apresurarte.
La estrella de los vínculos toma aire, así que brilla la amabilidad cotidiana.
Hoy hay poco cambio en el amor, bueno para mirar atrás con calma.
La energía de los vínculos está tranquila, así que el tiempo con amigos también es un gran consuelo.
`),
  },
  caution: L(`
Aunque tarde en responder, hoy no le presiones.
Un mensaje enviado con las emociones altas es difícil de retirar.
Cuida tu tono para que una broma no se vuelva hiriente.
Evita comparar tu vida amorosa con la de otros.
Aunque quieras revisar su vida privada, hoy confía.
No acumules el dolor para soltarlo todo de golpe.
Mejor no sacar hoy relaciones pasadas.
Aplaza las conversaciones importantes cuando estés cansado.
No saques conclusiones antes de escucharle.
No le juzgues solo por lo que dicen otros.
Palabras como «siempre» y «nunca» tienden a avivar las discusiones.
Organízate para no llegar tarde a una cita.
Evita las declaraciones o los mensajes emocionales con unas copas.
Contén las culpas hacia sus amigos o su familia.
Cuando sientas ansiedad, pregunta en lugar de decidir a solas.
No midas el amor por la frecuencia de los mensajes.
No decidas el destino de la relación estando enfadado.
Hoy evita palabras o actos que le pongan a prueba.
Ten cuidado de no pagar con tu pareja tu mal humor.
Hoy una pequeña mentira puede crecer hasta un gran malentendido.
Aplaza publicar tus sentimientos en redes sociales.
No señales sus defectos delante de otros.
Si te dice que no, respétalo.
No intentes demostrar lo que sientes con regalos o gastos exagerados.
En los días de cansancio, un saludo corto es mejor que una llamada larga.
Pon recordatorios para no olvidar aniversarios ni planes.
Dale tiempo para pensar en lugar de exigir una respuesta.
Evita menospreciar sus gustos.
Desaparecer después de una discusión tiende a agrandar los malentendidos.
Hoy suelta las ganas de mirar su móvil.
No sospeches de su conducta por historias que imaginaste.
No relaciones lo que sientes hoy con cosas del pasado.
No compartas demasiada información personal con alguien nuevo de golpe.
Para una primera cita, elige un sitio público y concurrido.
No relaciones su rechazo con tu valor.
Está bien no definir la relación con prisas.
Está bien poner límites a los mensajes que te agotan.
Hoy el sarcasmo tiende a quedarse especialmente.
Deja las conversaciones largas para cuando no esté ocupado.
`),
  chance: L(`
Hoy un saludo ligero puede llevar a una buena conversación.
Es probable que una invitación a pasear juntos sea bien recibida.
Si un amigo te presenta a alguien, vale la pena ir.
Las conversaciones fluyen con facilidad en grupos que comparten tus intereses.
Id a comer su comida favorita.
Revisad fotos juntos y compartid recuerdos.
Hazle un cumplido a alguien que te guste.
Deja una nota corta escrita a mano, como hace tiempo que no hacías.
Elegid una película o un espectáculo para ver juntos.
Escuchar sus preocupaciones os acerca.
Los vínculos tienden a nacer donde hay muchas risas.
Pasead con tu pareja por un barrio que nunca hayáis explorado.
Puedes conocer a alguien nuevo en un plan con amigos.
Las conversaciones empiezan con naturalidad donde la gente aprende junta.
Hacer un pequeño favor suaviza la relación.
Hoy con solo sonreír y saludar primero se abren puertas.
Mostrar interés por su afición alarga las conversaciones.
Cocinar juntos suele ser un rato divertido.
Un buen día para un café corto con alguien de quien te has distanciado.
Dale algo de picar a alguien a quien le estés agradecido.
Saca con tu pareja el tema del próximo viaje.
Deja un comentario cálido en una buena noticia que veas en redes.
Si alguien te gusta, hoy puedes ser un poco más sincero.
Di su nombre con cariño en la conversación.
Pueden nacer vínculos en un grupo de ejercicio ligero o un club.
Pregúntale por su día y recuerda lo que te cuente.
Una foto juntos tiende a volverse un buen recuerdo.
Compartid historias de vuestra infancia.
Responde con alegría a las señales de interés que recibas hoy.
Las conversaciones tienden a ir bien en una cita a ciegas o un primer encuentro.
Fijad un pequeño objetivo juntos con tu pareja.
Si le ves cansado, ofrécele una palabra cálida.
Escuchad juntos la misma canción y hablad de ella.
Envía un mensaje de agradecimiento a alguien cercano.
Un encuentro en un sitio nuevo tiende a recordarse con cariño.
Hoy las palabras cortas y sentidas son las que mejor funcionan.
`),
  tip: L(`
Las buenas relaciones empiezan por cumplir las promesas pequeñas.
Un gesto de asentimiento significa mucho para la otra persona.
Conocer primero tu propio corazón te ayuda a compartirlo bien.
Comparte lo que te duele con frases que empiecen por «yo».
La amabilidad nace de la constancia más que de las grandes palabras.
En los mensajes, la calidez importa más que la longitud.
Aceptar vuestras diferencias reduce las discusiones.
Intentar entender protege una relación mejor que intentar cambiar al otro.
El pequeño elogio de hoy vuelve como la amabilidad de mañana.
El tiempo a solas también es preparación para una buena relación.
Las risas compartidas mantienen viva una relación mucho tiempo.
Fíjate en sus esfuerzos.
No aplaces el «lo siento» ni el «gracias».
No te pierdas a ti mismo ni siquiera con alguien que te gusta.
Cuando la conversación se atasque, cambia la pregunta.
Si tu corazón está cansado, está bien descansar un rato.
Respeta la distancia con la que la otra persona se siente cómoda.
Cuídate también a ti dentro de la relación.
Celebrar juntos los pequeños aniversarios acumula recuerdos.
Cuanto más escuchas, más se acercan los corazones.
Poner en palabras las expectativas reduce los malentendidos.
Piensa cada día en una cosa buena de la otra persona.
Después de una discusión, piensa cómo resolverla, no quién tenía razón.
El destino junta a las personas; el esfuerzo las mantiene juntas.
Tomarse tiempo para conoceros también es valioso.
Una mirada cálida llega antes que cualquier palabra.
La sinceridad y la amabilidad funcionan mejor juntas.
Sin comparar, ves mejor tu propia relación.
Respetar su día hace que también respeten el tuyo.
Para conocer a buena gente, primero ponte cómodo contigo.
Un gesto amable puede valer más que diez palabras.
Nunca es tarde para compartir lo que sientes.
Mira a la vez su ritmo y el tuyo.
El tiempo juntos dura más que los regalos pequeños.
Comparte la gratitud de hoy antes de que acabe el día.
Repetir con tus palabras lo que dijo ayuda a conectar los corazones.
`),
  act: [
    L(`
Escribe lo que quieres decirle y reléelo mañana.
Elige una cosa que te dé calma y hazla.
Ordena lo que te duele como si escribieras un diario.
Abre tu corazón a un amigo de confianza.
Céntrate en tus tareas en lugar de esperar un mensaje.
Calma tu corazón con una taza de té caliente.
Si discutisteis, busca una cosa por la que pedir perdón.
Hoy sal a pasear tú solo.
Cuando suban las emociones, respira hondo y retrasa la respuesta.
Escribe en una frase su punto de vista.
Cierra un rato las redes sociales y céntrate en lo que sientes.
Acuéstate temprano y deja descansar tu corazón.
`),
    L(`
Comparte con alguien cercano lo que te pasó hoy.
Fijad un pequeño plan juntos para esta semana.
Apunta una cosa que le guste.
Escribe a alguien a quien llevabas tiempo queriendo preguntar qué tal.
Elegid juntos la cena de esta noche.
Di una cosa concreta que agradeces.
Escúchale hasta el final y hazle una pregunta.
Ordenad las fotos que os habéis hecho juntos.
Busca un grupo o una clase que te interese.
Envíale un mensaje corto de ánimo.
Hablad juntos de vuestros planes para el fin de semana.
Resume en una línea tu visión del amor.
`),
    L(`
Propón tú primero un plan a alguien que te atrae.
Elegid una ruta de cita distinta de la habitual.
Envía un mensaje corto que muestre que te gusta.
Si te invitan a una presentación o a una reunión, ve con gusto.
Prepárale una pequeña sorpresa.
Haced una lista de cosas que queréis hacer juntos.
Dile a alguien que conociste hoy lo que te gustó de esa persona.
Haz una pregunta más cuando hables con alguien nuevo.
Comparte con tu pareja, sin peso, planes de futuro.
Di lo que llevas mucho tiempo queriendo decir.
Sal con la ropa con la que más te sientes tú.
Compartid un vídeo del que podáis reíros juntos.
`),
  ],
};
