// Fixture de Primera de básquetbol – Primera fase.
// Para cargar un resultado, escribí los puntos en "resultado" como "LOCAL-VISITANTE",
// por ejemplo: resultado: "78-70" (primero los puntos del equipo local).
// La web marca sola el próximo partido y si Esparta ganó o perdió.
const FIXTURE = [
  { jornada: 1, local: "Pacaembu", visitante: "Remeros", fecha: "2026-10-16", cancha: "Della Santa", resultado: "" },
  { jornada: 1, local: "Anastasia", visitante: "Racing", fecha: "2026-10-17", cancha: "Socios Fundadores", resultado: "" },
  { jornada: 1, local: "Sandu", visitante: "Esparta", fecha: "2026-10-19", cancha: "Ing. L. Álvarez", resultado: "" },
  { jornada: 1, local: "Praga", visitante: "Independiente", fecha: "2026-10-20", cancha: "Della Santa", resultado: "" },
  { jornada: 1, local: "Nacional", visitante: "Bella Vista", fecha: "2026-10-21", cancha: "Coloso Tricolor", resultado: "" },

  { jornada: 2, local: "Remeros", visitante: "Racing", fecha: "2026-10-23", cancha: "M. Bellini", resultado: "" },
  { jornada: 2, local: "Nacional", visitante: "Anastasia", fecha: "2026-10-24", cancha: "Coloso Tricolor", resultado: "" },
  { jornada: 2, local: "Esparta", visitante: "Pacaembu", fecha: "2026-10-26", cancha: "16 de Junio", resultado: "" },
  { jornada: 2, local: "Independiente", visitante: "Sandu", fecha: "2026-10-27", cancha: "Saratsola", resultado: "" },
  { jornada: 2, local: "Bella Vista", visitante: "Praga", fecha: "2026-10-27", cancha: "H. Vespa", resultado: "" },

  { jornada: 3, local: "Anastasia", visitante: "Remeros", fecha: "2026-10-29", cancha: "Socios Fundadores", resultado: "" },
  { jornada: 3, local: "Praga", visitante: "Nacional", fecha: "2026-10-29", cancha: "Della Santa", resultado: "" },
  { jornada: 3, local: "Racing", visitante: "Esparta", fecha: "2026-10-30", cancha: "12 de Mayo", resultado: "" },
  { jornada: 3, local: "Pacaembu", visitante: "Independiente", fecha: "2026-10-31", cancha: "Novales", resultado: "" },
  { jornada: 3, local: "Sandu", visitante: "Bella Vista", fecha: "2026-11-02", cancha: "Ing. L. Álvarez", resultado: "" },

  { jornada: 4, local: "Praga", visitante: "Anastasia", fecha: "2026-11-04", cancha: "Della Santa", resultado: "" },
  { jornada: 4, local: "Nacional", visitante: "Sandu", fecha: "2026-11-05", cancha: "Coloso Tricolor", resultado: "" },
  { jornada: 4, local: "Bella Vista", visitante: "Pacaembu", fecha: "2026-11-05", cancha: "H. Vespa", resultado: "" },
  { jornada: 4, local: "Esparta", visitante: "Remeros", fecha: "2026-11-06", cancha: "16 de Junio", resultado: "" },
  { jornada: 4, local: "Independiente", visitante: "Racing", fecha: "2026-11-07", cancha: "Saratsola", resultado: "" },

  { jornada: 5, local: "Anastasia", visitante: "Esparta", fecha: "2026-11-10", cancha: "Socios Fundadores", resultado: "" },
  { jornada: 5, local: "Racing", visitante: "Bella Vista", fecha: "2026-11-10", cancha: "12 de Mayo", resultado: "" },
  { jornada: 5, local: "Pacaembu", visitante: "Nacional", fecha: "2026-11-11", cancha: "Novales", resultado: "" },
  { jornada: 5, local: "Remeros", visitante: "Independiente", fecha: "2026-11-13", cancha: "M. Bellini", resultado: "" },
  { jornada: 5, local: "Sandu", visitante: "Praga", fecha: "2026-11-14", cancha: "Ing. L. Álvarez", resultado: "" },

  { jornada: 6, local: "Nacional", visitante: "Racing", fecha: "2026-11-16", cancha: "Coloso Tricolor", resultado: "" },
  { jornada: 6, local: "Praga", visitante: "Pacaembu", fecha: "2026-11-17", cancha: "Novales", resultado: "" },
  { jornada: 6, local: "Bella Vista", visitante: "Remeros", fecha: "2026-11-17", cancha: "H. Vespa", resultado: "" },
  { jornada: 6, local: "Sandu", visitante: "Anastasia", fecha: "2026-11-18", cancha: "Ing. L. Álvarez", resultado: "" },
  { jornada: 6, local: "Independiente", visitante: "Esparta", fecha: "2026-11-18", cancha: "Saratsola", resultado: "" },

  { jornada: 7, local: "Esparta", visitante: "Bella Vista", fecha: "2026-11-21", cancha: "16 de Junio", resultado: "" },
  { jornada: 7, local: "Pacaembu", visitante: "Sandu", fecha: "2026-11-21", cancha: "Novales", resultado: "" },
  { jornada: 7, local: "Anastasia", visitante: "Independiente", fecha: "2026-11-23", cancha: "Socios Fundadores", resultado: "" },
  { jornada: 7, local: "Racing", visitante: "Praga", fecha: "2026-11-23", cancha: "12 de Mayo", resultado: "" },
  { jornada: 7, local: "Remeros", visitante: "Nacional", fecha: "2026-11-24", cancha: "M. Bellini", resultado: "" },

  { jornada: 8, local: "Sandu", visitante: "Racing", fecha: "2026-11-26", cancha: "Ing. L. Álvarez", resultado: "" },
  { jornada: 8, local: "Bella Vista", visitante: "Independiente", fecha: "2026-11-26", cancha: "H. Vespa", resultado: "" },
  { jornada: 8, local: "Nacional", visitante: "Esparta", fecha: "2026-11-27", cancha: "Coloso Tricolor", resultado: "" },
  { jornada: 8, local: "Praga", visitante: "Remeros", fecha: "2026-11-28", cancha: "Della Santa", resultado: "" },
  { jornada: 8, local: "Pacaembu", visitante: "Anastasia", fecha: "2026-11-30", cancha: "Novales", resultado: "" },

  { jornada: 9, local: "Esparta", visitante: "Praga", fecha: "2026-12-02", cancha: "16 de Junio", resultado: "" },
  { jornada: 9, local: "Anastasia", visitante: "Bella Vista", fecha: "2026-12-03", cancha: "Socios Fundadores", resultado: "" },
  { jornada: 9, local: "Remeros", visitante: "Sandu", fecha: "2026-12-03", cancha: "M. Bellini", resultado: "" },
  { jornada: 9, local: "Independiente", visitante: "Nacional", fecha: "2026-12-04", cancha: "Saratsola", resultado: "" },
  { jornada: 9, local: "Racing", visitante: "Pacaembu", fecha: "2026-12-05", cancha: "12 de Mayo", resultado: "" },
];

// Todos los partidos de esta fase son a las 22:00
const FIXTURE_HORA = "22:00";
