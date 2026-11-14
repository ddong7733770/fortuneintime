import TODAY from './es-today.js';
import TYPES from './es-types.js';
import YEAR from './es-year.js';
import { REL, FOCUS_NONE, ADVICE_DOM, ADVICE_YONG } from './es-focus.js';
// Textos de los maestros (español). Las personalidades se notan solo en la voz, nunca se explican en pantalla.
// · fortune (pestaña Hoy): guía neutral y cercana
// · haewoon: directa, breve, con peso / hana: luminosa y cálida / dohan: concisa y estratégica, nunca absoluta
import MORE from './es-more.js';
import { FORTUNE_DOM, HANA_TODAY } from './es-dom.js';
import W5 from './es5-wealth.js';
import L5 from './es5-love.js';
import K5 from './es5-work.js';
import H5 from './es5-health.js';
import { LEAD5, TODO5 } from './es5-card.js';
import DATE from './es-date.js';
const ES = {
  ui: {
    tab: 'Maestros',
    pick: '¿A quién quieres consultar hoy?',
    name: { haewoon: 'Haewoon', hana: 'Hana', dohan: 'Dohan' },
    field: { haewoon: 'Saju · Suerte por horas', hana: 'Amor · Relaciones', dohan: 'Carrera · Negocios' },
    title: { haewoon: 'La lectura de saju de Haewoon', hana: 'La lectura de amor de Hana', dohan: 'La lectura de carrera de Dohan' },
    badge: { free: 'Gratis hoy', ad: 'Desbloquear con anuncio', open: 'Desbloqueado' },
    unlock: 'Mira un anuncio para ver la lectura completa',
    unlockNote: 'Tras un anuncio corto, no tendrás que volver a verlo durante esta franja (hasta las {t}).',
    unlockFree: 'Hoy puedes leer gratis a Hana o a Dohan.',
    adFail: 'El anuncio no se pudo cargar, así que esta vez te lo abrimos.',
    fold: { haewoon: 'Repasar mi saju básico', hana: 'Repasar mi estilo en el amor', dohan: 'Repasar mi estilo de trabajo' },
    compatTitle: 'Compatibilidad — dinámica de la relación',
    compatSub: 'Elige el tipo de relación e introduce su fecha de nacimiento para ver cómo se encuentran vuestras cartas. La puntuación y la lectura de una línea son gratis.',
    compatUnlock: 'Mira un anuncio para la compatibilidad',
    compatNote: 'La compatibilidad se desbloquea aparte de la lectura de Hana. Una vez abierta, sigue abierta durante esta franja (hasta las {t}).',
    relKind: 'Relación', relKinds: { some: 'Flechazo', lover: 'Pareja', idol: 'Ídolo favorito', friend: 'Amistad', coworker: 'Colega', boss: 'Jefe · Equipo', family: 'Familia' },
    siunTitle: 'Siun — la suerte de hoy hora por hora',
    siunHint: 'Toca una franja del dial para ver la suerte de esa hora.',
    siunNow: 'Ahora',
    bestTag: 'Mejor hora', worstTag: 'Hora a vigilar',
    sleepRange: '23:00–05:00',
    teaserSiun: '¿Cuál es tu mejor hora hoy?',
    cardsTitle: 'Pregunta más a los maestros',
    goMaster: 'Ver lectura',
    monthsTitle: 'Los próximos meses',
    secs: {
      pillars: 'Cuatro Pilares', overall: 'Lectura general', siun: 'Suerte por horas',
      temper: 'Mi temperamento en el amor', type: 'Quién te atrae y quién te conviene', today: 'El flujo del amor hoy', timing: 'Cuándo llegan los vínculos', people: 'Quién te ayuda y de quién guardar distancia',
      style: 'Tu estilo de trabajo', fields: 'Campos y roles que encajan', hours: 'Mejores horas para informes · reuniones · contratos', flow: 'Flujo de la carrera este mes · este año', collab: 'Con quién aliarte y a quién evitar',
    },
    good: 'Horas buenas', avoid: 'Horas a evitar', thisMonth: 'Este mes', thisYear: 'Este año', next3: 'Próximos 3 meses',
    band: ['Pesado', 'Estable', 'Luminoso', 'Muy luminoso'],
    kinds: { report: 'informes', meeting: 'reuniones', contract: 'contratos' },
    disclaimer: 'El flujo leído en el saju es una referencia. Para decisiones importantes, mira también los hechos y tu situación.',
    month: '{m}',
    monthNames: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    seasons: ['Primavera', 'Verano', 'Otoño', 'Invierno'],
    loveStar: { m: 'Tu estrella de pareja, la Riqueza (財星),', f: 'Tu estrella de pareja, la Autoridad (官星),', none: 'La estrella de los vínculos' },
    lucky: { color: 'Color', dir: 'Dirección', num: 'Números', act: 'Actividades' },
    toc: 'Contenido',
    or: ' o ',
  },

  // ════════ Pestaña Hoy: guía neutral y cercana ════════
  fortune: {
    weekend: MORE.weekend,
    flow: [
      ['Un buen día para bajar un poco el ritmo.', 'Hoy conviene proteger lo que tienes más que empezar algo nuevo.', 'Hoy la energía se recoge hacia dentro, así que es sensato aligerar una agenda llena.', 'Hoy el flujo vacila menos si resuelves las cosas de una en una.'],
      ['Un día tranquilo, sin grandes altibajos.', 'Hoy basta con mantener tu ritmo de siempre.', 'Un flujo sereno, bueno para despachar pequeñas cosas pendientes.', 'Hoy la energía empieza a subir poco a poco.'],
      ['Un día que fluye bastante bien.', 'Hoy los resultados tienden a llegar en la medida en que te mueves.', 'Un buen flujo para retomar lo que has ido posponiendo.', 'Hoy la gente y el trabajo encajan bien.'],
      ['La energía de hoy encaja bien con tu carta.', 'Hoy hay pocos obstáculos y las cosas tienden a salir bien.', 'Si llevas tiempo preparando algo, es un buen día para dar un paso.', 'En general, hoy la suerte fluye con suavidad.'],
    ],
    tenDay: [
      ['Un día en que trabajar con gente afín te da fuerza.', 'La terquedad y la rivalidad suben con facilidad; escucha a los demás una vez más.'],
      ['Hoy ganas impulso, bueno para avanzar.', 'Los asuntos de gente o de dinero pueden costarte algo; revisa promesas y gastos.'],
      ['Hoy el trabajo se vuelve divertido y tu mente encuentra calma.', 'Es fácil aflojar, así que empieza por lo que debes hacer.'],
      ['Hoy destacan tu manera de hablar y tus ideas.', 'Las palabras se adelantan con facilidad; piénsalo una vez más antes de hablar en situaciones importantes.'],
      ['Hoy puede llamarte la atención una oportunidad inesperada o un ingreso extra.', 'Las ganas de dinero grande suben con facilidad; deja de lado las inversiones arriesgadas.'],
      ['Hoy tu esfuerzo honesto te da su recompensa.', 'Lo que entra también puede salir; vigila tus gastos.'],
      ['Un buen día para enfrentar de frente lo difícil.', 'La presión y la tensión se acumulan con facilidad; no lo cargues todo tú.'],
      ['Un buen día para ganar confianza y reconocimiento.', 'La responsabilidad puede pesar. Cumple con cuidado normas y promesas.'],
      ['Hoy la intuición y las ideas llegan con facilidad.', 'Hoy los pensamientos se multiplican y la motivación baja con facilidad.'],
      ['Hoy van bien el estudio, los documentos y recibir ayuda.', 'Puede que quieras apoyarte en otros; reserva tiempo para resolver tú las cosas.'],
    ],
    domName: { wealth: 'el dinero', love: 'el amor y los vínculos', work: 'el trabajo y el estudio', health: 'la salud' },
    title: 'La fortuna de hoy', focus: 'Qué vigilar hoy', advice: 'El consejo de hoy',
    dom: {
      wealth: {
        flow: [['Hoy el dinero sale con un poco más de fuerza.', 'Hoy la suerte con el dinero se repliega un momento.'], ['El dinero sigue en calma, sin grandes cambios.', 'Hoy lo que entra y lo que sale se equilibran más o menos.'], ['Hoy el dinero fluye abierto.', 'Hay un flujo bienvenido en torno al dinero y los tratos.']],
        why: {
          pyeon: 'Se mueve la Riqueza Inesperada, así que destaca el dinero en movimiento, como ingresos extra y tratos.',
          jeong: 'Llega la Riqueza Estable, que trae dinero que vuelve en proporción a tu trabajo.',
          bad: 'Llega la estrella de la Riqueza, pero te pesa, así que cuanto menos ansíes, más conservarás.',
          rob: 'Se cuela el Rival, así que el dinero se escapa con facilidad por la gente o la competencia.',
          output: 'Se mueve la Expresión, así que el talento y la destreza se convierten fácilmente en ingresos.',
          doc: 'Llega el Recurso, que te conecta con dinero que se resuelve con documentos y contratos.',
          none: 'Hoy la estrella de la Riqueza no se mueve directamente, así que gasta solo lo planeado.',
        },
        caution: ['Evita las compras impulsivas y las inversiones basadas solo en la palabra de otra persona.', 'Revisa dos veces cualquier papel que lleve números.', 'No te fíes de promesas de ganancias garantizadas hasta comprobarlas tú.'],
        tip: ['Aparta enseguida una parte de lo que entra.', 'El pequeño ahorro de hoy se acumula y cambia el flujo.', 'Prueba a ordenar tu lista de gastos.'],
      },
      love: {
        flow: [['Hoy los corazones se cruzan con facilidad.', 'Hoy la temperatura emocional sube y baja con facilidad.'], ['El flujo de los vínculos está en calma.', 'Las relaciones siguen su veta conocida.'], ['Hoy los corazones conectan bien.', 'Hay un flujo cálido hacia los vínculos.']],
        why: {
          star: '{star} llega, así que los encuentros y las conversaciones fluyen con naturalidad.',
          bad: 'Llega la estrella de los vínculos, pero pesa, así que es mejor acercarse despacio.',
          dohwa: 'Llega la energía magnética de la Flor de Durazno, así que hay más miradas sobre ti que de costumbre.',
          dayHap: 'La armonía toca el lugar de tu pareja (la rama del Día), así que conectas con facilidad con alguien cercano.',
          dayChung: 'El lugar de tu pareja (la rama del Día) recibe un choque, así que los roces con alguien cercano llegan con facilidad.',
          stemHap: 'Llega una energía que se une con tu Maestro del Día, así que puede aparecer alguien que te agrade.',
          none: 'Hoy la estrella de los vínculos está en calma, un buen día para cuidar las relaciones que tienes.',
        },
        chance: ['Es probable que un vínculo nuevo llegue de forma natural en un lugar conocido.', 'Si las cosas han estado tensas con alguien, es buen momento para escribir tú primero.', 'En lugar de adivinar lo que alguien siente, pregúntale.'],
        tip: ['Los sentimientos viajan primero por tu tono.', 'Suelta la impaciencia y la persona adecuada aparecerá a la vista.', 'Las relaciones se fortalecen en el proceso, no en la conclusión.'],
      },
      work: {
        flow: [['Hoy el trabajo avanza más despacio de lo esperado.', 'Hay pequeños tropiezos en el trabajo de hoy.'], ['El trabajo avanza a su ritmo habitual.', 'Un día en que puedes con tus tareas sin problemas.'], ['Hoy los resultados en el trabajo se ven con facilidad.', 'Está abierta la oportunidad de mostrar lo que sabes hacer.']],
        why: {
          kwan: 'Llega la Autoridad, un buen momento para ganar confianza y reconocimiento.',
          kwanBad: 'Llega la Autoridad, así que la responsabilidad y la presión crecen con facilidad.',
          output: 'Se mueve la Expresión, así que los planes, las propuestas y el trabajo terminado salen bien.',
          study: 'Llega el Recurso, que da fuerza al estudio, las certificaciones y los documentos.',
          monthChung: 'Tu lugar del trabajo (la rama del Mes) recibe un choque, así que pueden surgir conversaciones sobre cambios en el trabajo.',
          rob: 'Llegan los Pares, así que la rivalidad o los choques de opinión con colegas llegan con facilidad.',
          none: 'Hoy las estrellas del trabajo apenas se mueven, así que sigue el orden que planeaste.',
        },
        caution: ['Actúa sobre hechos que hayas comprobado tú y no sobre rumores.', 'Si hay un contrato o una promesa, lee las condiciones hasta el final.', 'Pospón las decisiones para las que no estás listo.'],
        tip: ['Lo único que termines hoy marca el ritmo de mañana.', 'Pon tu energía en lo que haces bien.', 'Prueba a acortar tu lista de tareas.'],
      },
      health: {
        flow: [['Hoy tu cuerpo se cansa con facilidad.', 'Hoy tu estado sube y baja con facilidad.'], ['El flujo de tu cuerpo es estable.', 'Hoy basta con mantener tu ritmo de siempre.'], ['Hoy cuerpo y mente ganan fuerza.', 'Hoy la recuperación es rápida.']],
        why: {
          excess: 'Se suma más energía {el}, que ya abunda en ti, así que conviene no forzar {organ}.',
          lack: 'Entra la energía {el} que te falta y completa tu equilibrio.',
          chung: 'Tu propio lugar (la rama del Día) recibe un choque, así que puedes cansarte con facilidad.',
          hyeong: 'Hoy hay energía de Fricción, así que ten cuidado con golpes y pequeñas lesiones.',
          none: 'Hoy el equilibrio de los Cinco Elementos apenas vacila.',
        },
        tip: ['Si el mismo síntoma vuelve una y otra vez, consulta a un médico antes de leer cualquier fortuna.', 'Bebe agua a menudo y estírate siempre que puedas.', 'Evita los picoteos nocturnos y beber en exceso.'],
      },
    },
  },

  // ════════ Haewoon: directa, breve, con peso ════════
  haewoon: {
    card: ['Hoy hay una hora especialmente luminosa. Sabe cuál es.', 'Hoy la hora a evitar está clara. Revísala antes de moverte.', 'La suerte cambia según la hora. Mira tu horario de hoy.'],
    ov: {
      now: 'Ahora estás en el ciclo {gz}, que empezó hacia los {age} años. {desc}.',
      nowTone: ['Viento a favor. No dejes escapar este viento.', 'Un viento que no se inclina hacia ningún lado. Tu destreza se vuelve tu resultado.', 'Viento en contra. Mantenerse firme también es una destreza. No agrandes la partida a la fuerza.'],
      year: 'Este año, el año {gz}: {tone}',
      yearTone: ['está de tu lado. Saca lo que has ido posponiendo.', 'es estable. Basta con querer un poco menos.', 'trae peso. Mide una vez más las grandes decisiones.'],
      next: 'Hacia los {age} años pasas al ciclo {gz}. {desc}. {tone}',
      nextTone: ['El viento se vuelve más amable. Prepárate ahora para ese momento.', 'Una veta muy parecida a la de ahora. Sigue con lo tuyo, con constancia.', 'Se acerca un viento en contra. Afianza tu base antes de que llegue.'],
      way: 'Te lo digo con claridad. La energía que más necesita tu carta es {el}. {why} {close}',
      wayClose: ['Abrirse tarde no es mala suerte. El flujo nunca se queda en un solo lugar.', 'La suerte no se decide cuando llega, sino cuando la usas. Confía primero en tus fortalezas.', 'Si te apresuras, te dispersas. Una cosa cada vez. Esa es tu manera.', 'No sigas el ritmo de nadie. Esta parte es tuya.'],
    },
    siun: {
      summary: 'De tus horas de hoy, {best} trae la energía más luminosa y {worst} la más pesada.',
      summaryTail: ['Pon lo importante en las horas luminosas.', 'En las horas pesadas, aplaza las decisiones. Eso es todo.', 'Solo con elegir tus horas ya estabilizas la mitad de tu suerte.'],
      tg: [
        ['Los tuyos te dan fuerza. Muévete junto con la gente.', 'La terquedad sube en esta hora. No insistas en que solo tú tienes razón.'],
        ['Crece el impulso. Despacha ahora lo que habías dejado.', 'La rivalidad asoma. Si solo agarras tu parte, pierdes.'],
        ['Las manos se sueltan y el trabajo es grato. Termina lo que empezaste.', 'El cuerpo se afloja. Termina primero una sola tarea obligada.'],
        ['Las palabras y el talento cobran vida. Sácalos ahora.', 'Las palabras se adelantan en esta hora. Frena un compás ante tus mayores.'],
        ['Pasa una oportunidad inesperada. Mantén los ojos abiertos.', 'Las ganas de dinero grande nublan el juicio. Mantén la cartera cerrada.'],
        ['Se mueve dinero honesto. Haz ahora tus cuentas y liquidaciones.', 'Se ve el dinero que va a salir. Compra solo lo que necesites.'],
        ['Una hora para atravesar de frente lo difícil. No lo esquives.', 'La presión se acumula. No la cargues tú solo.'],
        ['Te acompaña la suerte con los superiores. Los informes y aprobaciones van aquí.', 'La responsabilidad pesa. No hagas promesas que no puedas cumplir.'],
        ['Destella la intuición. Anota enseguida lo que se te ocurra.', 'Los pensamientos dan vueltas. Pasa las decisiones a la hora siguiente.'],
        ['Se te aclara la mente. Termina ahora el estudio y los papeles.', 'Querrás apoyarte en otros. Resuélvelo tú.'],
      ],
      rel: {
        hap: 'La armonía se encuentra con tu rama del Día. Pide ahora ese favor que habías aplazado.',
        samhap: 'Una hora que se da la mano con tu rama del Día. El trabajo compartido sale fácil.',
        chung: 'Un choque con tu rama del Día. No alces la voz. Tampoco corras en la carretera.',
        hyeong: 'Hay Fricción en juego. Un pequeño desliz verbal se extiende lejos.',
        hae: 'Se mezcla el Daño. Los malentendidos llegan fácil, así que confirma antes de seguir.',
      },
      doIt: ['Trabajo en equipo, ejercicio', 'Despachar pendientes', 'Cerrar temas, planear comidas', 'Planificar, presentar', 'Ventas, revisar ofertas nuevas', 'Liquidar cuentas, compras', 'Negociaciones duras', 'Informes, aprobaciones', 'Anotar ideas', 'Estudio, ordenar papeles'],
      avoid: ['Prestar dinero', 'Deslices ante superiores', 'Gastos impulsivos', 'Promesas que no puedes cumplir', 'Aplazar decisiones'],
      avoidChung: 'Conversaciones importantes, viajes con prisa',
      doLabel: 'Bueno para', avoidLabel: 'Evitar',
      dawn: 'Una hora para despertar el cuerpo. Planea tu día ahora.',
      sleep: 'Una hora para descansar. Dormir ya recarga tu suerte.',
    },
  },

  // ════════ Hana: luminosa y cálida (empatía → razón → pequeña acción) ════════
  hana: {
    card: [['¿Te sientes un poco enredado últimamente? Hoy está bien ir con calma.', 'Hoy una sola palabra pesa más de lo normal. ¿Lo miramos juntos?'], ['El flujo del amor está tranquilo. Pero hay una cosa que deberías ver.', 'Hoy aparece una pista de alguien conocido.'], ['¡El flujo del amor de hoy está bastante bien! No lo dejes pasar.', 'Hoy los corazones conectan bien. ¿No te da curiosidad con quién?']],
    temper: {
      palace: [
        'El lugar de tu pareja tiene energía como la tuya (Pares). Te va un romance de amigos. Te sientes a gusto caminando lado a lado, sin que uno lleve al otro.',
        'El lugar de tu pareja tiene la energía de la expresión (Expresión). Quieres un amor cariñoso que se muestre en palabras y gestos. Con alguien que nunca expresa nada, te desanimas rápido.',
        'El lugar de tu pareja tiene la energía de la riqueza (Riqueza). Eres práctico incluso en el amor. Te sientes querido más por los gestos de cuidado que por las palabras.',
        'El lugar de tu pareja tiene la energía de la responsabilidad (Autoridad). Tu corazón va hacia la gente fiable que cumple sus promesas. Cuando te comprometes, sueles protegerlo por mucho tiempo.',
        'El lugar de tu pareja tiene la energía del cuidado (Recurso). Quieres a alguien que te entienda y en quien apoyarte. Tardas en abrirte, pero cuando lo haces, es profundo.',
      ],
      dohwa: 'Y tienes la Flor de Durazno, la estrella de la atracción. Puede que no lo notes, pero a menudo la gente muestra interés por ti primero.',
      many: 'Tienes varias estrellas de pareja, así que eres bastante popular. Aun así, tu corazón puede inclinarse con facilidad, así que ayuda fijar un criterio propio.',
      none: 'Tu estrella de pareja es más bien ligera, así que tus metas suelen ir antes que las citas. Está bien. La tuya es una carta que reconoce a la persona adecuada cuando no se apresura.',
      express: 'Tu energía expresiva es fuerte, así que se nota cuando alguien te gusta. Esa sinceridad es tu encanto.',
      think: 'Tu energía reflexiva es fuerte, así que le das muchas vueltas a lo que sientes antes de mostrarlo. A veces está bien hablar antes de pensarlo demasiado.',
    },
    elPerson: [
      'alguien lleno de sueños que no deja de crecer, alguien que hace planes contigo',
      'alguien luminoso y expresivo, alguien que anima el ambiente',
      'alguien estable y constante, alguien que cumple sus promesas',
      'alguien con criterios claros y un estilo ordenado, alguien que decide rápido',
      'alguien reflexivo con quien es fácil hablar, alguien flexible',
    ],
    type: {
      attract: 'Te atrae {p}. Tu estrella de pareja es energía {el}, así que tus ojos van de forma natural hacia gente así.',
      match: 'Quien te conviene a largo plazo es {p}. Es alguien que completa la energía {el} que necesitas.',
      animals: 'Por signo del zodiaco, encajas bien con el signo {a}. Puede que no lo notes al principio, pero con el tiempo te resulta más cómodo.',
      tip: 'Si quien te atrae y quien te conviene son la misma persona, maravilloso. Si no, la que dura es la segunda. Recuérdalo.',
    },
    today: {
      flow: [['Hoy tu corazón puede estar un poco sensible.', 'Hoy las emociones suben y bajan con facilidad.', 'Hoy el flujo del amor se cruza un poco.'], ['Hoy el flujo del amor está tranquilo.', 'Hoy las relaciones conocidas resultan cómodas, sin grandes cambios.', 'Hoy es bueno para ordenar tus sentimientos en calma.'], ['Hoy el flujo del amor es bueno.', 'Hoy los corazones conectan bien.', 'Hoy fluye una energía cálida entre las personas.']],
      why: {
        star: '{star} llega, así que los encuentros y las conversaciones fluyen con naturalidad.',
        bad: 'La estrella de los vínculos sí llega, pero te pesa un poco. Por eso apresurarse puede enredar las cosas.',
        dohwa: 'Llega la energía de la Flor de Durazno, así que hay más miradas sobre ti. Hoy dedícate un poco más antes de salir.',
        dayHap: 'La armonía toca el lugar de tu pareja, así que conectas con alguien cercano.',
        dayChung: 'El lugar de tu pareja recibe un choque, así que los roces con alguien cercano llegan con facilidad. No es porque sea mala persona, es solo la energía de hoy.',
        stemHap: 'Llega una energía que se une con tu Maestro del Día, así que puede aparecer alguien que te agrade.',
        none: 'Hoy la estrella de los vínculos está en calma. Un buen día para cuidar a la gente que ya tienes al lado en lugar de conocer a nadie nuevo.',
      },
      caution: ['Si está a punto de escaparse algo hiriente, respira una vez antes de hablar.', 'Hoy una conversación en la que escuchas vale más que una en la que concluyes.', 'Aunque una respuesta tarde, hoy no le busques demasiado significado.'],
      chance: ['Un buen día para escribir tú primero. Basta con un saludo corto.', 'Alguien nuevo puede llamarte la atención en un lugar conocido.', 'Dile a alguien a quien estás agradecido lo que sientes.'],
      tip: ['Los sentimientos viajan primero por tu tono.', 'Sé solo un poco dulce. Eso es lo más importante.', 'Las relaciones van del proceso, no de la conclusión.'],
    },
    timing: {
      lead: 'Elegí los meses de los próximos seis en los que entra energía de vínculos.',
      sig: {
        star: 'Tu estrella de pareja entra como energía que te ayuda. Di que sí a presentaciones e invitaciones.',
        dohwa: 'Llega la Flor de Durazno, un mes en que las miradas se reúnen sobre ti.',
        dayHap: 'Este mes la armonía toca el lugar de tu pareja, así que una relación avanza un paso con facilidad.',
        stemHap: 'Un mes en que puede aparecer alguien que te atraiga.',
      },
      warn: {
        dayChung: 'Este mes el lugar de tu pareja recibe un choque. Resuelve las discusiones el mismo día.',
        starHeavy: 'La energía de los vínculos entra como una carga. Cuidado con las relaciones que te arrastran.',
      },
      none: 'En los próximos seis meses, la energía de los vínculos apenas se mueve. En momentos así, invertir en ti atrae el próximo vínculo.',
      year: { good: 'Mirando el año entero, está entrando energía de vínculos.', mid: 'Este año la energía de los vínculos está en calma. Deja que las cosas pasen de forma natural en vez de forzarlas.', warn: 'Este año las relaciones cambian con facilidad. Hablar a menudo basta para proteger lo que tienes.' },
    },
    people: {
      noble: 'Es probable que quien te ayuda en los momentos difíciles haya nacido en un año de {a}. Es tu posición de Noble Celestial, así que compartir tus preocupaciones abre un camino.',
      match: 'Con la gente nacida en un año de {a} es fácil llevarse bien.',
      clash: 'Puedes chocar con la gente nacida en un año de {a}. No porque sean malas personas, sino porque vuestras energías son opuestas. Poner por escrito lo importante reduce los malentendidos.',
      style: [
        'Eres leal y cuidas a tus amigos y colegas. Solo no cargues con los problemas de todos.',
        'Eres quien anima el ambiente con las palabras. A veces prueba a escuchar su historia más que a contar la tuya.',
        'Haces amigos con sensatez. Tener al menos un amigo con quien quedar sin ningún propósito tranquiliza tu mente.',
        'Eres educado y respetas los límites. Por eso acercarte te lleva un poco de tiempo.',
        'Cuidas a la gente y la recibes con calidez. Si una relación solo toma, está bien dejarla ir.',
      ],
    },
    compat: {
      lead: ['Vamos a miraros a los dos juntos.', 'Bien, pongamos las dos cartas una al lado de la otra.'],
      score: ['Una pareja que necesita un poco de esfuerzo.', 'Una pareja que va muy bien si os adaptáis.', 'Una pareja que encaja bien.', '¡Una pareja que encaja de maravilla!'],
      axes: { pull: 'Atracción', talk: 'Comunicación', clash: 'Puntos de roce', grow: 'Crecer juntos' },
      starOf: [
        'Para ti, esa persona es Pares: energía de amistad. De igual a igual y cómoda, pero se tensa cuando ambos os ponéis tercos.',
        'Para ti, esa persona es Expresión: energía que cuidas y a la que te expresas. A su lado te vuelves más dulce.',
        'Para ti, esa persona es Riqueza: energía que quieres cuidar y proteger de forma práctica.',
        'Para ti, esa persona es Autoridad: energía que te asienta y marca un criterio. Da seguridad, aunque a veces pesa un poco.',
        'Para ti, esa persona es Recurso: energía que te entiende y te apoya. Es fácil apoyarse en ella, así que da las gracias a menudo.',
      ],
      el: { help: 'Por los Cinco Elementos, esa persona completa la energía {el} que te falta.', same: 'Por los Cinco Elementos, vuestras energías se parecen, así que mucho se entiende sin palabras.', strain: 'Por los Cinco Elementos, su energía {el} te pesa un poco. Ayuda reservar algo de tiempo para cada uno.' },
      day: { hap: 'Vuestras ramas del Día (lugares de pareja) están en armonía. Una relación que se vuelve más cómoda cuanto más tiempo pasáis juntos.', samhap: 'Vuestras ramas del Día se dan la mano en la misma dirección. Fijad metas juntos y las cosas rodarán bien.', chung: 'Vuestras ramas del Día chocan. La atracción es fuerte, y el roce también. Haced las paces el mismo día en que discutáis.', hyeong: 'Vuestras ramas del Día forman Fricción. Las palabras pequeñas pueden herir con facilidad, así que cuidado incluso con las bromas.', hae: 'Vuestras ramas del Día forman Daño. Hablad a menudo antes de que se acumulen los resentimientos.', none: 'Vuestras ramas del Día ni chocan ni se atraen mucho. El tiempo que construyáis juntos define la relación.' },
      kind: {
        lover: { good: 'Como pareja, os dais tranquilidad. La dulzura de cada día importa más que los aniversarios.', bad: 'Como pareja, hay cosas que ajustar. Poned la norma de decir enseguida lo que duele.' },
        some: { good: 'Si es un flechazo, ahora el flujo es bueno. Puedes proponer quedar otra vez.', bad: 'Si es un flechazo, no te apresures. Seguir un poco su ritmo ayuda.' },
        friend: { good: 'Como amigos, sois una pareja que dura. Podéis ser el refugio el uno del otro.', bad: 'Como amigos, a veces chocáis pero hacéis las paces rápido. Solo cuidado con el dinero entre vosotros.' },
        coworker: { good: 'Como colegas, trabajáis en sintonía. Repartid los roles y la sinergia crece.', bad: 'Como colegas, vuestros estilos de trabajo difieren. Poned las tareas por escrito en vez de solo hablarlas.' },
        boss: { good: 'Como jefe y miembro del equipo, podéis confiaros cosas. Las actualizaciones cortas y frecuentes lo mejoran aún más.', bad: 'Como jefe y miembro del equipo, vuestros criterios difieren, así que los malentendidos llegan fácil. Alinead primero las expectativas.' },
        family: { good: 'Como familia, podéis apoyaros y contar el uno con el otro.', bad: 'Como familia, estáis tan cerca que es fácil haceros daño. Dad las gracias una vez más.' },
        idol: { good: 'Tu ídolo favorito y tú compartís una energía que encaja. Cuanto más lo apoyas, más energía recibes también.', bad: 'Tu ídolo favorito y tú tenéis energías de distinto color, y precisamente por eso te atrae.' },
      },
      do: 'Lo que mantiene viva esta relación', dont: 'Lo que conviene evitar',
      doList: [['citas activas en las que os movéis juntos', 'aprender algo nuevo juntos', 'elogiaros mutuamente'], ['comer algo rico juntos', 'poner los sentimientos en palabras', 'pequeños regalos'], ['hacer planes juntos', 'ser puntuales', 'repartir tareas y roles'], ['respetar los principios del otro', 'dejaros tiempo personal', 'conversaciones tranquilas y ordenadas'], ['conversaciones profundas', 'viajar', 'tiempo tranquilo juntos']],
      dontList: [['peleas de orgullo', 'dejar pasar los asuntos de dinero'], ['soltar palabras emocionales', 'compararle con otros'], ['intentar controlar', 'una actitud calculadora'], ['ignorar su manera de hacer las cosas', 'romper promesas'], ['callarse para pensar a solas', 'dejar que se acumulen los resentimientos']],
      hour: 'Un buen momento para que estéis juntos es {h}.',
      idolNote: 'Introduce la fecha de nacimiento pública de tu ídolo favorito. Lo que introduces se queda solo en este dispositivo.',
      idolName: 'Nombre del ídolo (apodo)',
      inviteLead: 'Envía el enlace y esa persona podrá introducir solo su fecha de nacimiento para ver vuestra compatibilidad al instante.',
      shareBtn: 'Crear tarjeta de compatibilidad',
      shareText: '¡Ya tenemos nuestra puntuación de compatibilidad! Pruébalo tú también',
      detailTitle: 'La lectura detallada de Hana',
      lockDesc: 'Mira las cuatro medidas de compatibilidad, una lectura detallada de vuestra relación, qué hacer y qué evitar juntos, y los buenos momentos para estar juntos.',
      lockBtn: 'Mira un anuncio para la lectura detallada',
      cardTitle: 'Nuestra compatibilidad',
      kindMore: {
        some: { good: ['Ahora mismo hay una energía de mariposas entre vosotros. Mantén la conversación con preguntas ligeras.', 'Es una pareja en la que probablemente esa persona también se siente atraída por ti. Haz un plan que sea solo para los dos.', 'El momento adecuado para confesarte es un día en que os reís mucho juntos. Confía en el ambiente.'], bad: ['A esta pareja le va mejor ir un poco más despacio. No le busques demasiado significado a lo rápido que responde.', 'Os expresáis de forma distinta, así que los malentendidos llegan fácil. Si tienes curiosidad, pregunta directamente en vez de lanzar indirectas.', 'Coger confianza primero en grupo puede ayudar antes de quedar a solas.'] },
        lover: { good: ['Una pareja que se siente más cómoda cuanto más tiempo pasa junta. Compartir los momentos de cada día hace crecer vuestro amor.', 'Completáis lo que al otro le falta. Decid en voz alta y a menudo lo que agradecéis.', 'Una buena pareja para hablar del futuro. Empezad haciendo pequeños planes juntos.'], bad: ['Amáis de formas distintas, así que los resentimientos llegan fácil. Prometed decir lo que duele el mismo día.', 'Las discusiones tienden a alargarse en esta pareja. Acordad una señal para hacer las paces.', 'Respetar el tiempo personal del otro, en realidad, os acerca.'] },
        idol: { good: ['Tu energía encaja con tu ídolo favorito. El tiempo que pasas apoyándolo también te da fuerza.', 'La energía de tu ídolo completa lo que te falta. Ser fan se vuelve energía para el día a día.', 'Un vínculo que se vuelve más divertido cuanto más tiempo lo quieres. Guarda tus momentos.'], bad: ['Tu ídolo favorito y tú tenéis energías de distinto color. Por eso te atrae.', 'Meterte demasiado en el fandom puede agotarte. Reserva tiempo para cuidarte también.', 'Una pareja en la que cada faceta nueva de tu ídolo se siente fresca y emocionante.'] },
        friend: { good: ['Amigos que se entienden sin palabras. Solo se hace más profundo con el tiempo.', 'Probablemente seáis la primera persona en la que piensa el otro en los momentos difíciles. Escribe tú primero.', 'Probar algo nuevo juntos fortalece la amistad.'], bad: ['Amigos que a veces chocan pero hacen las paces rápido. Solo cuidado con el dinero y la puntualidad.', 'Sois distintos en muchas cosas, así que hay mucho que aprender el uno del otro.', 'No dejéis que se acumulen los resentimientos. Habladlos con ligereza.'] },
        coworker: { good: ['Colegas que trabajan en sintonía. Repartid los roles y la sinergia crece.', 'Una buena pareja para intercambiar ideas. Construid sobre las del otro en las reuniones.', 'Los proyectos que hacéis juntos suelen ser bien recibidos.'], bad: ['Vuestro ritmo y forma de trabajar difieren. Dejad las tareas por escrito.', 'Repartid las responsabilidades con claridad desde el principio.', 'Hablar en términos de hechos más que de sentimientos lo hace todo mucho más fácil.'] },
        boss: { good: ['Una relación en la que podéis confiaros cosas. Las actualizaciones cortas y frecuentes construyen confianza.', 'Reconocéis las fortalezas del otro. No escatiméis elogios.', 'Fijad metas juntos y los resultados llegan con facilidad.'], bad: ['Vuestros criterios difieren, así que los malentendidos llegan fácil. Alinead primero las expectativas.', 'Al dar retroalimentación, hablad del proceso, no solo del resultado.', 'Separar los momentos de trabajo de los personales lo hace más fácil.'] },
        family: { good: ['Una familia que puede apoyarse y contar el uno con el otro. Compartid comidas a menudo.', 'Os conocéis el corazón sin palabras. Aun así, dad las gracias a menudo.', 'Un viaje juntos hace el vínculo todavía más cálido.'], bad: ['Estáis tan cerca que es fácil haceros daño. Decidlo una vez más, con suavidad.', 'Respetar las decisiones del otro reduce los conflictos.', 'Ofreced palabras de apoyo en lugar de sermones.'] },
      },
    },
  },

  // ════════ Dohan: conciso y estratégico (conclusión → base → acción, nunca absoluto) ════════
  dohan: {
    hours2: MORE.hours2,
    flow2: MORE.flow2,
    card: [['Hay variables en el trabajo de hoy. Elegir bien el momento puede reducirlas.', 'Hoy conviene más ordenar que decidir. Déjame fijarte el orden.'], ['Un flujo estable. Aun así, algunas horas son más favorables que otras.', 'Hoy basta con tu ritmo habitual. Solo elige el momento adecuado para informar.'], ['Hoy los resultados en el trabajo se ven fácil. Elige tu momento.', 'Hoy tiende a favorecer hacer propuestas. Revisa las franjas horarias.']],
    style: {
      org: 'Tiendes al perfil de organización. La Autoridad y el Recurso pesan mucho, así que rindes cuando construyes confianza dentro de una estructura. Qué preparar: tu reputación. Las promesas y los plazos son tu capital.',
      biz: 'Tiendes al perfil de negocio. La Expresión y la Riqueza están activas en tu carta, así que ganas fuerza cuando montas la partida y creas los tratos tú mismo. La variable es la velocidad. Mira el flujo de caja antes de expandirte.',
      pro: 'Tiendes al perfil de especialista. El Recurso y la Expresión te respaldan, así que tu valor crece cuando profundizas en conocimientos y habilidades. Qué preparar: pruebas. Déjalas en forma de certificaciones o de un portafolio.',
      mix: 'Tu segunda tendencia ({t}) también sale cerca. En lugar de comprometerte con una sola, mezclar ambas en tu trabajo actual suele funcionar mejor.',
      name: { org: 'perfil de organización', biz: 'perfil de negocio', pro: 'perfil de especialista' },
    },
    fields: {
      lead: 'La suerte tiende a quedarse en los campos donde cobra vida tu Yongsin, {el}.',
      list: ['educación, edición, contenidos, diseño, medio ambiente', 'medios, TI, marketing, belleza, energía', 'bienes raíces, construcción, intermediación, consultoría, alimentación', 'finanzas, derecho, maquinaria, salud, manufactura', 'comercio, distribución, investigación, turismo, logística'],
      role: ['hacer crecer a las personas y arrancar proyectos', 'ponerse delante para informar y persuadir', 'coordinar y mantener la confianza', 'fijar criterios y organizar', 'reunir información y conectar'],
      roleLine: 'El rol que encaja: {r}.',
      strength: 'El Dios Diez que parece tu fortaleza es {t}. {trait}',
    },
    flow: {
      daeun: 'En el panorama general, estás dentro del ciclo {gz}. {desc}.',
      short: ['Trabajo en equipo', 'Resultados · propuestas', 'Ingresos · tratos', 'Evaluaciones · responsabilidad', 'Documentos · estudio'],
      tone: ['Con cautela', 'Estable', 'Favorable'],
    },
    collab: {
      noble: 'La gente nacida en un año de {a} suele ser de ayuda en el trabajo práctico. Pide su opinión cuando te atasques.',
      match: 'La gente nacida en un año de {a} suele estar en sintonía contigo. Buena para repartir roles en trabajos conjuntos.',
      clash: 'Con la gente nacida en un año de {a}, los estilos de trabajo tienden a ir en sentido contrario. Pon las tareas por escrito en lugar de de palabra.',
      rob: 'Tu carta tiene Pares fuertes, así que ten cuidado con las sociedades. Acordad por escrito las partes, los roles y cómo liquidar antes de empezar.',
      alone: 'Tu carta tiene Pares débiles, así que tiendes a intentar hacerlo todo tú. Un socio al que delegar la ejecución puede subir mucho tu eficiencia.',
      mid: 'Tu carta equilibra el trabajo en equipo y la independencia. Te conviene elegir socios proyecto a proyecto.',
    },
  },
};

function mergeDom(base, add) {
  base.flow = base.flow.map((a, c) => [...a, ...add.flow[c]]);
  base.more = add.more; base.act = add.act;
  for (const [k, v] of Object.entries(add.why)) base.why[k] = [base.why[k], ...v];
  for (const k of ['caution', 'chance', 'tip']) if (add[k]) base[k] = [...(base[k] || []), ...add[k]];
}
for (const k of Object.keys(FORTUNE_DOM)) mergeDom(ES.fortune.dom[k], FORTUNE_DOM[k]);
mergeDom(ES.hana.today, HANA_TODAY);
// Frases por área ×5: se añaden tras los conjuntos existentes (se usan con la rotación antirrepetición)
function add5(base, add) {
  for (const k of ['flow', 'more', 'act']) if (add[k]) base[k] = base[k].map((a, c) => [...a, ...add[k][c]]);
  for (const [k, v] of Object.entries(add.why || {})) base.why[k] = [...base.why[k], ...v];
  for (const k of ['caution', 'chance', 'tip']) if (add[k]) base[k] = [...(base[k] || []), ...add[k]];
  if (add.tipLow) { base.tip = base.tip.slice(1); base.tipLow = add.tipLow; }
}
for (const [k, v] of Object.entries({ wealth: W5, love: L5, work: K5, health: H5 })) add5(ES.fortune.dom[k], v);
ES.hana.date = DATE;
ES.ui.secs.date = DATE.title;
ES.fortune.rel = REL; ES.fortune.focusNone = FOCUS_NONE; ES.fortune.adviceDom = ADVICE_DOM; ES.fortune.adviceYong = ADVICE_YONG;
ES.today = TODAY;
for (const k of Object.keys(LEAD5)) {
  TODAY.lead[k] = TODAY.lead[k].map((a, n) => [...a, ...LEAD5[k][n]]);
  for (const t of ['up', 'down', 'no']) TODAY.todo[k][t] = [...TODAY.todo[k][t], ...TODO5[k][t]];
}
ES.types = TYPES;
ES.year = YEAR;
export default ES;
