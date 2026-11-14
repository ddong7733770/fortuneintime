// Pestaña Hoy · frases de dinero, ampliación ×5 (se añaden a los conjuntos existentes). Una línea = una frase
const L = s => s.trim().split('\n').map(x => x.trim()).filter(Boolean);
export default {
  flow: [
    L(`
Hoy tu cartera puede vaciarse más rápido de lo que esperas.
Hoy la salida del dinero es más ancha que la entrada.
Hoy los pequeños pagos pueden acumularse hasta volverse una carga.
Hoy la suerte con el dinero se toma un respiro.
Hoy tus cuentas pueden fallar más de lo normal.
Hoy el gasto tiende a seguir tu estado de ánimo.
La energía del dinero está débil, así que hoy importa conservar.
Hoy hablar de dinero puede pesarte en la mente.
Hoy el dinero que te deben llega tarde y las facturas llegan pronto.
Hoy tienden a aparecer costes no planeados.
Hoy tu corazón vacila con facilidad delante del dinero.
El flujo del dinero puede sentirse bloqueado un tiempo.
Hoy tapar fugas importa tanto como ganar.
Hoy los asuntos de dinero pueden no salir tan fluidos como esperabas.
Hoy las pequeñas pérdidas pueden molestarte.
Hoy las compras impulsivas tienden a colarse.
Hoy lo que mejor funciona es guardar el dinero en silencio.
Hoy el dinero se mueve despacio y puede resultar frustrante.
Hoy el gasto en otras personas tiende a crecer.
Hoy puedes comprar por estado de ánimo y no por precio.
Cuanto más persigas hoy el dinero, más se aleja.
Hoy los planes que implican dinero pueden encontrar un obstáculo.
La suerte con el dinero está baja, así que hoy no la fuerces.
Hoy con solo aplazar el gasto ya ganas.
`),
    L(`
Hoy el dinero se mueve a su ritmo habitual.
Hoy el flujo del dinero se mantiene llano.
Hoy los ingresos y los gastos se equilibran.
La suerte con el dinero es normal, así que hoy los hábitos deciden el resultado.
Hoy no hay muchas novedades en el frente del dinero.
Hoy ni ganas mucho ni gastas mucho.
Hoy el flujo del dinero se mantiene en calma en su sitio.
Hoy sigue el plan y no tendrás nada que lamentar.
Hoy tu criterio de siempre basta para los asuntos de dinero.
El dinero está tranquilo, pero hoy la pequeña gestión da fruto.
Lo que tiene que entrar entra y lo que tiene que salir sale.
La suerte con el dinero de hoy se mueve dentro de lo que esperas.
Hoy no hay motivo para tener prisa con el dinero.
La energía del dinero fluye pareja y tu mente está tranquila.
Hoy cumplir tu presupuesto resulta fácil.
Hoy el dinero está tranquilo pero firme.
Hoy los pequeños ahorros se vuelven resultados visibles con facilidad.
Hoy el dinero que entra y sale se ve de un vistazo.
Hoy el dinero mantiene su ritmo habitual.
Un buen día para equilibrar gasto y ahorro.
Hoy no hay grandes altibajos en el flujo del dinero.
Un buen día para revisar tus normas de gasto.
La suerte con el dinero es correcta, así que hoy la constancia es tu fuerza.
Hoy tu forma de siempre con el dinero es la que mejor te va.
`),
    L(`
Hoy la energía del dinero cobra vida y brillo.
Hoy los mensajes relacionados con dinero tienden a traer buenas noticias.
Hoy las pequeñas ganancias tienden a llegar una tras otra.
Hoy sopla viento a favor en tu flujo de dinero.
Hoy tu olfato para el dinero está más fino de lo normal.
Hoy puede entrar el dinero que estabas esperando.
Hoy las buenas condiciones llaman tu atención con facilidad.
Hoy las cosas salen bien en el lado del dinero.
Hoy el esfuerzo tiene recompensa con facilidad.
Hoy las conversaciones de dinero tienden a ir bien.
Sube la suerte con el dinero, un buen día para poner en marcha planes.
Hoy lo que compraste con cabeza tiende a dejarte satisfecho.
Hoy el flujo del dinero se abre de par en par, con muchas opciones.
Hoy tus juicios sobre dinero tienden a acertar.
Hoy pueden llegarte ventajas o descuentos inesperados.
La suerte con el dinero está animada, así que hoy moverse compensa.
Hoy las ideas para ganar más llegan con facilidad.
Hoy las liquidaciones y los tratos tienden a cerrarse limpiamente.
Hoy te acompaña un poco de suerte en el lado del dinero.
Hoy el flujo del dinero se inclina hacia ti.
Hoy la confianza que construiste puede convertirse en ganancias.
La suerte con el dinero es buena, así que hoy ganas fuerza en las negociaciones.
Hoy el dinero se reúne más rápido.
La energía del dinero es abundante y tu mente también se siente holgada.
`),
  ],
  more: [
    L(`
Si hoy algo te llama la atención, déjalo en el carrito y deja pasar un día.
En los días de cansancio, el gasto como premio tiende a crecer.
Antes de gastar en alguien, pregúntate si ese plan es de verdad necesario.
Incluso los pequeños pagos automáticos pueden volverse una carga cuando se acumulan.
Piensa en el dinero que ahorras hoy como el margen de la semana que viene.
Alzar la voz por dinero tiende a agrandar la pérdida.
Hoy una decisión aplazada compensa más que una precipitada.
Si te cuesta recortar, usa solo efectivo o tarjeta de débito por hoy.
Con solo mirar tu saldo cambia tu forma de gastar.
Hoy crecen las ganas de comprar lo que compran los demás.
Piensa en hoy como un día para proteger el dinero y te sentirás más ligero.
Apresurarse a recuperar una pérdida tiende a llevar a otra mayor.
`),
    L(`
Un buen día para repasar tus gastos y calibrar el flujo de este mes.
En los días en que el dinero apenas se mueve, los pequeños hábitos marcan la diferencia.
Una compra planificada está bien hacerla hoy.
Alinear las fechas de ingresos y pagos facilita el mes que viene.
Los días tranquilos son buenos para el orden financiero que vienes aplazando.
Separar el dinero que gastaste hoy del que no gastaste te da una referencia.
Hoy le van mejor los pequeños ajustes que las grandes decisiones.
Si necesitas algo, comparar precios primero no te hará llegar tarde.
La suerte con el dinero está pareja, así que podrías subir un poco tu tasa de ahorro.
Las preocupaciones de dinero parecen más simples cuando las escribes en números.
Hoy la gestión constante vale más que las grandes ambiciones.
Marca en el calendario el día de cobro o de liquidación para ver el flujo.
`),
    L(`
En los días de buen flujo, decide primero adónde va el dinero que entra y durará más.
Hoy las conversaciones de dinero que aplazaste tienden a ir bien.
Un pequeño encargo paralelo o compartir una habilidad puede convertirse en ingresos.
Si ves buenas condiciones, anótalas y compruébalas hoy.
Cuanto mejor sea tu suerte con el dinero, más te ayudará llevar registros la próxima vez.
Un buen día para usar los puntos o las ventajas que has acumulado.
Pasa parte del extra de hoy a tu fondo de emergencia y estarás tranquilo.
Si tienes algo que negociar, di con claridad las condiciones que quieres.
Incluso cuando el dinero fluye bien, piensa dos veces los grandes gastos no planeados.
Agradecer lo que entra tiende a atraer el siguiente flujo.
Anota con una sonrisa la pequeña ganancia de hoy.
Compartir buena información con la gente de tu alrededor amplía tus oportunidades.
`),
  ],
  why: {
    pyeon: L(`
Llega la Riqueza Inesperada, así que el dinero que cambia de manos gana velocidad.
La Riqueza Inesperada cobra vida, así que aparecen oportunidades en tratos y ventas.
Gracias a la Riqueza Inesperada, las conversaciones de dinero tienden a llegar a través de la gente.
Hoy entra la Riqueza Inesperada, así que cuanto más activo seas, mayor será el flujo.
Se mueve la Riqueza Inesperada, así que destaca el dinero fuera de tu ingreso fijo.
La Riqueza Inesperada se extiende, un buen momento para encontrar una nueva fuente de ingresos.
La Riqueza Inesperada gana fuerza, así que las actividades fuera tienden a dar fruto.
Llega la Riqueza Inesperada, así que puedes llegar a manejar sumas más grandes.
La Riqueza Inesperada se abre, así que tu instinto para regatear está afinado.
La Riqueza Inesperada brilla, así que pueden entrar ventajas inesperadas.
Con la Riqueza Inesperada aquí, cuanto más amplio tu círculo, más amplios tus caminos de dinero.
La Riqueza Inesperada está en el aire, así que hoy moverse es la mejor opción.
`),
    jeong: L(`
Llega la Riqueza Estable, así que el trabajo constante tiende a volver como recompensa.
La Riqueza Estable es firme, así que encaja bien la gestión planificada del dinero.
La Riqueza Estable gana fuerza, así que el ingreso regular se acumula con orden.
Hoy entra la Riqueza Estable, así que la diligencia se convierte en riqueza.
Gracias a la Riqueza Estable, las liquidaciones y los pagos tienden a ir bien.
La Riqueza Estable cobra vida, así que crece tu capacidad de ahorrar con cuidado.
Se mueve la Riqueza Estable, así que el dinero prometido tiende a llegar a tiempo.
La Riqueza Estable fluye bien, así que un presupuesto que fijes tiende a cumplirse.
Llega la Riqueza Estable, buena para equilibrar gastos de vida y ahorro.
La Riqueza Estable es sólida, así que ni el dinero pequeño se escapa.
La Riqueza Estable se asienta, así que hoy las opciones sensatas dan fruto.
Con la Riqueza Estable aquí, el dinero tiende a moverse por sitios de confianza.
`),
    bad: L(`
Llega la estrella de la Riqueza pero pesa, así que cuanto más aprietas, más se escapa.
La energía de la Riqueza te pesa, así que pensar en dinero puede cansarte.
Llega la Riqueza pero cuesta manejarla, así que los planes ambiciosos pueden salir mal.
La estrella de la Riqueza actúa como carga, así que la presión del gasto puede crecer.
La energía de la Riqueza entra fuerte, así que la codicia puede adelantar al juicio.
Hoy se agolpan las estrellas de la Riqueza, así que los asuntos de dinero pueden pedir más atención.
La estrella de la Riqueza te presiona, así que hoy ayuda dar un paso atrás.
La energía de la Riqueza se desborda, así que tu capacidad de gestionarla puede quedarse corta.
La Riqueza entra como carga, así que ten cuidado con las sumas grandes.
La estrella de la Riqueza pesa, así que hoy conservar vale más que gastar.
La energía de la Riqueza es mucho para cargar, así que mantente fuera de los asuntos de dinero de otros.
Llega la Riqueza, pero cuida primero tu energía y tu ánimo para proteger tu dinero.
`),
    rob: L(`
Llega el Rival, así que el dinero puede enredarse con gente cercana.
El Rival está fuerte, así que la competencia puede subir el gasto.
Hoy se mueve el Rival, así que tu parte de los gastos compartidos puede crecer.
Se cuela el Rival, así que las peticiones de otros pueden abrir tu cartera.
Con el Rival cerca, proteger tu parte necesita límites claros.
Llega el Rival, así que puedes gastar solo para quedar bien.
El Rival gana fuerza, así que cuidado con las sociedades o las inversiones conjuntas.
El Rival está en el aire, así que las cuentas difusas tienden a costarte.
Hoy entra el Rival, así que los gastos de grupo pueden ser mayores de lo esperado.
Se mueve el Rival, así que puedes dejarte arrastrar por el gasto de otros.
Con el Rival cerca, evita prestar dinero hoy.
El Rival está presente, así que pon las promesas de dinero por escrito para estar seguro.
`),
    output: L(`
La Expresión cobra vida, así que tus habilidades e ideas pueden convertirse en ingresos.
La energía de la Expresión fluye hacia la riqueza, así que se reconoce el valor de tu trabajo.
Se mueve la Expresión, así que las ventas y la promoción tienden a dar resultados.
Hoy la Expresión apoya la riqueza, así que cuanto más muestres tus habilidades, mejor.
Llega la Expresión, así que un encargo paralelo o compartir una habilidad puede volverse dinero.
Gracias a la Expresión, tus palabras y lo que escribes pueden conectar con ingresos.
Hoy la Expresión alimenta la Riqueza, así que lo que haces tiende a venderse bien.
La Expresión está animada, así que llegan con facilidad ideas de ingresos nuevas.
La Expresión fluye bien, un buen día para pulir tu servicio o producto.
Llega la Expresión, un buen momento para volver a poner precio a tus habilidades.
La Expresión está viva, así que los resultados se ven en proporción al esfuerzo.
Hoy la Expresión lleva a la riqueza, así que terminar tu trabajo trae recompensa.
`),
    doc: L(`
Llega el Recurso, así que los contratos y los registros ayudan a ordenar los asuntos de dinero.
Gracias al Recurso, el dinero confirmado por escrito es fiable.
Se mueve el Recurso, así que los trámites como seguros, devoluciones o ayudas tienden a resolverse.
Hoy entra el Recurso, así que lo que has aprendido ayuda a proteger tu dinero.
El Recurso fluye bien, un buen día para leer con calma las condiciones de un contrato.
El Recurso gana fuerza, así que el consejo de los mayores ayuda a tus finanzas.
Con el Recurso cerca, las promesas por escrito tienen peso.
Llega el Recurso, bueno para ordenar papeles de una casa o una compra grande.
El Recurso cobra vida, un buen día para aprender sobre dinero.
Gracias al Recurso, comprobar compensa más que precipitarse.
Se mueve el Recurso, bueno para cerrar asuntos de titularidad o contratos.
Con el Recurso aquí, guardar recibos y registros ya es gestionar el dinero.
`),
    none: L(`
Hoy la estrella de la Riqueza descansa, así que mantener tu gasto habitual es suficiente.
Hoy la energía del dinero está en calma, así que no hacen falta grandes esperanzas ni grandes preocupaciones.
La energía del dinero no se mueve, así que tu presupuesto fijado es la mejor guía.
La estrella de la Riqueza está en calma, así que revisa los planes existentes en lugar de empezar otros.
Hoy la energía del dinero está tranquila, así que vivir según tus hábitos va bien.
La energía de la Riqueza apenas entra o sale, buena para gestionar con calma.
La estrella de la Riqueza toma aire, así que no hace falta apresurarse.
Hoy el flujo del dinero es llano, así que los pequeños ahorros se quedan contigo.
La energía de la Riqueza está en calma, así que puedes dejar un rato a un lado los pensamientos de dinero.
La estrella de la Riqueza se queda quieta, así que basta con tapar fugas.
Hoy hay poco cambio en el lado del dinero, bueno para ordenar y revisar.
La energía de la Riqueza está tranquila, así que solo evita el gasto no planeado.
`),
  },
  caution: L(`
Antes de pagar, pregúntate una vez más si de verdad lo necesitas.
Revisa con cuidado los pequeños costes como comisiones y envíos.
Apunta la fecha en que termina tu prueba gratuita.
No abras peticiones de pago que lleguen por enlaces desconocidos.
Hoy evita avalar a nadie.
No te apresures a pagar solo porque diga edición limitada.
Para promesas con mucho dinero, revisa primero el contrato.
Cuidado con no agotar el límite de tu tarjeta.
Decidid de antemano cómo repartir los gastos de grupo.
Aplaza las compras cuya política de devolución no hayas revisado.
Revisa dos veces los números de cuenta antes de enviar.
Pasa a mañana las compras de los días de ánimo bajo.
Hoy desconfía especialmente de cualquier cosa que prometa ganancias garantizadas.
No respondas enseguida cuando te pidan dinero prestado.
Aplaza las compras grandes en las que no hayas comparado precios.
Guarda los recibos y los registros de transacciones en lugar de tirarlos.
No compartas con nadie la contraseña de pago de tus apps.
Recarga los saldos prepago solo con lo que necesites.
Comprueba si siguen activas suscripciones antiguas.
Hoy evita pagar en nombre de otra persona.
Cuando una conversación de dinero se caliente, haz una pausa.
Cuidado con las cuentas de comidas o copas que dependen del ambiente.
Comprueba que las fechas de las transferencias automáticas cuadran con tu saldo.
No te pongas a buscar préstamos con prisa.
Comprueba si un precio sorprendentemente bajo tiene trampa.
En compras en grupo o cuentas compartidas, fijad primero las cantidades.
Actúa sobre consejos de dinero de otros solo después de comprobarlos tú.
Hoy aplaza abrir una tarjeta o un medio de pago nuevo.
Hoy aléjate de pequeñas apuestas o del dinero que depende del azar.
Mantén el gasto en regalos dentro de tu presupuesto.
Revisa tus pedidos y envíos una vez más.
Envía depósitos o anticipos solo después de revisar las condiciones.
Los pagos hechos con cansancio tienden a tener errores.
Mira los plazos que te quedan junto con las facturas de este mes.
Deja constancia de las promesas de dinero incluso con familia o amigos.
Asegúrate de no olvidar la cartera ni las tarjetas.
`),
  tip: L(`
Añade una nota de una línea a cada gasto de hoy.
Activa las alertas de tu app de presupuesto, aunque sea por un día.
Saca de la cartera las tarjetas que nunca usas.
Fija un presupuesto semanal y divídelo en cantidades diarias.
Ten una lista aparte de cosas que quieres comprar.
Pasa la calderilla y las cantidades pequeñas a una cuenta de ahorro aparte.
Escribe los gastos fijos de este mes en una sola página.
Cuando llegue un impulso, cuenta hasta diez y vuelve a pensarlo.
Cambia una comida fuera por una hecha en casa.
Vende de segunda mano lo que ya no uses.
Fija una cantidad objetivo para tu fondo de emergencia.
Mirar cuándo gastas revela tus hábitos.
Mira tu nevera antes de ir a comprar.
Usar un solo medio de pago hace el flujo más fácil de ver.
Separa el gasto en imprescindible, deseable y prescindible.
Crea el hábito de ahorrar primero el día de cobro.
Apunta en una casillita cuánto ahorraste hoy.
Comprueba que no compraste dos veces lo mismo.
Escribe tu objetivo con el dinero en una frase.
Crea el hábito de revisar las alertas de gasto enseguida.
Elige los regalos por la intención más que por el precio.
Fija un presupuesto aparte para los pequeños placeres.
Si los gastos de envío te molestan, pide para recoger.
Revisa facturas antiguas como tu tarifa de móvil o tu seguro.
Elige un día sin gasto esta semana.
Marca en el calendario los días en que entra y sale dinero.
Guardar las fotos de los recibos en un solo sitio facilita el orden.
Haz una foto de lo que quieres y vuelve a mirarla en una semana.
Disfruta de la diversión de ahorrar cantidades pequeñas.
Revisa tus gastos el mismo día cada mes.
Comprueba si hay alguna devolución o dinero que te deban.
Pregúntate si las cosas que llevan siglos en el carrito de verdad hacen falta.
Comprueba que no se solapen suscripciones parecidas.
Cuando cumplas un objetivo de ahorro, date una pequeña palmadita en la espalda.
Lee un libro o un artículo sobre dinero.
Elige la partida más grande de tus gastos y recórtala.
`),
  act: [
    L(`
Deja tu carrito tal cual solo por un día.
Escribe en números lo que queda del presupuesto de esta semana.
Vuelve a mirar tus cinco pagos más recientes.
Quédate hoy con un solo plan que cueste dinero y aplaza el resto.
Abre tu lista de pagos automáticos y cancela al menos uno.
Hoy usa solo efectivo o tarjeta de débito.
Cuadra lo que gastaste hoy con los recibos de tu cartera.
Apunta el dinero que prestaste o que te deben.
Pausa hoy los pagos no planeados.
Apaga un rato las notificaciones de las apps de compras.
Pasa un gasto grande de este mes al mes que viene.
Si el dinero te preocupa, plantea la situación en números.
`),
    L(`
Divide los gastos de este mes en categorías sencillas.
Revisa la cantidad de tu transferencia automática de ahorro.
Mira si tienes puntos sin usar.
Apunta de antemano los gastos previstos de la semana que viene.
Cuadra el saldo de tu cuenta con los próximos cargos de la tarjeta.
Pasa aunque sea una cantidad pequeña a tu cuenta de ahorro.
Haz una lista de la compra y compra exactamente eso.
Vuelve a revisar el objetivo de ahorro de este mes.
Compara precios y compra una cosa que de verdad necesites.
Ponte al día con una semana de anotaciones del presupuesto de una vez.
Abre el extracto de tu seguro o de tu factura de móvil.
Si el mes que viene llega un gasto grande, aparta fondos ya.
`),
    L(`
Si te deben dinero o una devolución, reclámalo hoy.
Escribe una forma concreta de aumentar tus ingresos.
Pasa una parte de lo que entra directamente a tu fondo de emergencia.
Si ves un producto con buenas condiciones, compáralo con cuidado.
Busca un encargo paralelo que aproveche tus talentos.
Prepárate para sacar el tema de tu sueldo o tus tarifas.
Anota la ganancia de hoy y decide para qué es.
Envía hoy los presupuestos o facturas que aplazaste.
Fija un objetivo de ahorro a largo plazo.
Dedica una hora a aprender sobre dinero.
Da las gracias a quien te avisó de una buena oferta.
Planea qué hacer con el dinero que te sobre este mes.
`),
  ],
};
