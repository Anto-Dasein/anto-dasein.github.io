// Modelos del portfolio - nomenclatura en español, contenido en inglés
export interface InfoPersonal {
  nombre: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  email: string;
  sitioWeb: string;
  imagenPerfil: string;
  ubicacion: string;
}

export interface Habilidad {
  nombre: string;
  categoria: 'frontend' | 'backend' | 'herramientas' | 'idiomas' | 'metodologias';
  nivel: number; // 1-5
  icono?: string;
  descripcion?: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  descripcion: string;
  descripcionCorta: string;
  tecnologias: string[];
  urlGithub: string;
  urlDemo?: string;
  urlImagen?: string;
  destacado: boolean;
  fechaInicio: Date;
  fechaFin?: Date;
  estado: 'completado' | 'en-progreso' | 'planificado';
}

export interface Experiencia {
  id: string;
  titulo: string;
  empresa: string;
  ubicacion: string;
  fechaInicio: Date;
  fechaFin?: Date;
  descripcion: string;
  tipo: 'trabajo' | 'educacion' | 'practicas' | 'curso';
  logoEmpresa?: string;
  tecnologias?: string[];
  logros?: string[];
}

export interface EnlaceSocial {
  nombre: string;
  url: string;
  icono: string;
  mostrarEnHeader?: boolean;
  mostrarEnFooter?: boolean;
}

export interface DatosPortfolio {
  infoPersonal: InfoPersonal;
  habilidades: Habilidad[];
  proyectos: Proyecto[];
  experiencias: Experiencia[];
  enlacesSociales: EnlaceSocial[];
}

// Datos basados en CV
export const DATOS_PORTFOLIO: DatosPortfolio = {
  infoPersonal: {
    nombre: "Antonio Espinosa",
    titulo: "Frontend Developer",
    subtitulo: "Frontend Development & Problem Solver", 
    descripcion: "I'm Antonio Espinosa, a Ciudad-Real based Software Developer (Frontend stack and currently forming as Backend also) driven by a relentless passion for learning and a profound interest for emerging technologies. I also love geopolitics and video games.",
    email: "anto.dasein@gmail.com",
    sitioWeb: "https://anto-dasein.github.io/",
    imagenPerfil: "assets/ducking.gif",
    ubicacion: "Spain"
  },
  habilidades: [
    // Frontend
    { nombre: "JavaScript", categoria: "frontend", nivel: 4 },
    { nombre: "TypeScript", categoria: "frontend", nivel: 4 },
    { nombre: "Angular 19+", categoria: "frontend", nivel: 4 },
    { nombre: "React", categoria: "frontend", nivel: 2, descripcion: "Currently learning" },
    { nombre: "HTML5", categoria: "frontend", nivel: 5 },
    { nombre: "CSS3", categoria: "frontend", nivel: 4 },
    
    // Backend
    { nombre: "Java", categoria: "backend", nivel: 3 },
    { nombre: "MySQL", categoria: "backend", nivel: 3 },
    
    // Herramientas
    { nombre: "Git", categoria: "herramientas", nivel: 4 },
    { nombre: "Fork", categoria: "herramientas", nivel: 3 },
    { nombre: "Azure DevOps", categoria: "herramientas", nivel: 3 },
    
    // Metodologías
    { nombre: "Agile", categoria: "metodologias", nivel: 4 },
    { nombre: "Scrum", categoria: "metodologias", nivel: 4 },
    { nombre: "Waterfall", categoria: "metodologias", nivel: 3 },
    
    // Idiomas
    { nombre: "Spanish", categoria: "idiomas", nivel: 5, descripcion: "Native" },
    { nombre: "English", categoria: "idiomas", nivel: 3, descripcion: "Intermediate (B1)" }
  ],
  proyectos: [
    {
      id: "portfolio-angular",
      nombre: "Personal Portfolio",
      descripcion: "Modern portfolio website built with Angular 20+",
      descripcionCorta: "Modern Angular portfolio with clean design",
      tecnologias: ["Angular", "TypeScript", "CSS", "GitHub Pages"],
      urlGithub: "https://github.com/anto-dasein/anto-dasein.github.io",
      urlDemo: "https://anto-dasein.github.io/",
      destacado: true,
      fechaInicio: new Date('2025-09-01'),
      estado: "en-progreso"
    }
  ],
  experiencias: [
 
    {
      id: "practicas-hacienda",
      titulo: "Administrative Internship",
      empresa: "Consejería de Hacienda y Administraciones Públicas de Castilla-La Mancha",
      ubicacion: "Spain",
      fechaInicio: new Date('2020-01-01'),
      fechaFin: new Date('2020-12-31'),
      descripcion: "240-hour internship in public administration, gaining experience in administrative processes and legal procedures.",
      tipo: "practicas"
    },
    {
      id: "gs-desarrollo",
      titulo: "Higher Degree in Multiplatform Application Development",
      empresa: "I.E.S Juan Bosco",
      ubicacion: "Spain",
      fechaInicio: new Date('2025-01-01'),
      descripcion: "Distance learning program focused on multiplatform application development, covering mobile and web technologies.",
      tipo: "educacion"
    },
    {
      id: "curso-programacion",
      titulo: "Object-Oriented Programming & Relational Databases (IFCD0112)",
      empresa: "Copermática Centro de Formación",
      ubicacion: "Spain",
      fechaInicio: new Date('2025-01-01'),
      descripcion: "Comprehensive course covering object-oriented programming languages and relational database management systems.",
      tipo: "curso"
    },
    {
      id: "freecodecamp",
      titulo: "Frontend Development & Relational Databases",
      empresa: "FreeCodeCamp",
      ubicacion: "Online",
      fechaInicio: new Date('2024-01-01'),
      descripcion: "Completed frontend development curriculum and relational database certification, building practical projects and real-world applications.",
      tipo: "curso"
    },
    {
      id: "grado-derecho",
      titulo: "Bachelor's Degree in Law",
      empresa: "UCLM Melchor Macanaz",
      ubicacion: "Spain",
      fechaInicio: new Date('2016-09-01'),
      fechaFin: new Date('2021-06-30'),
      descripcion: "Comprehensive legal education providing strong analytical and problem-solving skills, critical thinking, and attention to detail.",
      tipo: "educacion"
    }
  ],
  enlacesSociales: [
    {
      nombre: "GitHub",
      url: "https://github.com/anto-dasein",
      icono: "github",
      mostrarEnHeader: true,
      mostrarEnFooter: true
    },
    {
      nombre: "LinkedIn",
      url: "https://linkedin.com/in/antonio-espinosa-aliaga",
      icono: "linkedin",
      mostrarEnHeader: true,
      mostrarEnFooter: true
    },
    {
      nombre: "Email",
      url: "mailto:anto.dasein@gmail.com",
      icono: "email",
      mostrarEnHeader: false,
      mostrarEnFooter: true
    }
  ]
};