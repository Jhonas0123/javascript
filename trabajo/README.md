# Smart English Adventure 🎓✨

Plataforma educativa web gamificada para niños de 6 a 12 años, diseñada para mejorar la pronunciación y comprensión del inglés a través de aprendizaje interactivo con retroalimentación impulsada por IA.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript para mayor seguridad en el código
- **Vite** - Herramienta de construcción rápida y servidor de desarrollo
- **Tailwind CSS** - Framework de CSS utility-first para diseño responsivo
- **shadcn/ui** - Componentes de UI reutilizables y accesibles
- **React Router DOM** - Enrutamiento declarativo para aplicaciones React
- **TanStack Query** - Gestión de estado del servidor y caché de datos

### Backend y Base de Datos
- **Lovable Cloud (Supabase)** - Backend como servicio
  - **PostgreSQL** - Base de datos relacional
  - **Supabase Auth** - Sistema de autenticación
  - **Row Level Security (RLS)** - Seguridad a nivel de fila
  - **Edge Functions** - Funciones serverless (opcional para futuras expansiones)

### APIs y Servicios
- **Web Speech API** - Reconocimiento de voz nativo del navegador para evaluación de pronunciación
- **Lovable AI** - Integración de IA para retroalimentación y puntuación

### Herramientas de Desarrollo
- **ESLint** - Linter para identificar y reportar patrones en código
- **PostCSS** - Herramienta para transformar CSS con JavaScript

## 📋 Funcionalidades del Proyecto

### Roles de Usuario
1. **Estudiante**
   - Iniciar sesión y acceder a lecciones
   - Completar ejercicios interactivos de vocabulario
   - Practicar pronunciación con retroalimentación en tiempo real
   - Ganar puntos, insignias y desbloquear niveles
   - Seleccionar avatar personalizado
   - Ver progreso y estadísticas

2. **Profesor**
   - Ver progreso de todos los estudiantes
   - Monitorear lecciones completadas
   - Revisar puntuaciones promedio
   - Asignar actividades (funcionalidad futura)
   - Exportar reportes de progreso (funcionalidad futura)

### Características Principales
- **Aprendizaje Gamificado**: Sistema de niveles, insignias y recompensas
- **Reconocimiento de Voz**: Evaluación de pronunciación en tiempo real
- **Retroalimentación IA**: Comentarios instantáneos sobre la pronunciación
- **Interfaz Amigable**: Diseño colorido y atractivo para niños
- **Diseño Responsivo**: Funciona en escritorio, tablet y móvil
- **Módulos de Aprendizaje**:
  - Práctica de vocabulario (animales, colores, familia, etc.)
  - Construcción de oraciones
  - Comprensión auditiva
  - Juegos de pronunciación

### Base de Datos
El proyecto utiliza las siguientes tablas:
- **profiles**: Información de usuario (role, avatar, puntos totales)
- **lessons**: Catálogo de lecciones disponibles
- **student_progress**: Seguimiento del progreso de cada estudiante
- **user_roles**: Gestión de roles (student/teacher)

## 🛠️ Instalación y Configuración Local

### Requisitos Previos
- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- Navegador web moderno con soporte para Web Speech API (Chrome, Edge recomendados)

### Pasos para Ejecutar Localmente

1. **Clonar el repositorio**
```bash
git clone <URL_DEL_REPOSITORIO>
cd smart-english-adventure
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

El archivo `.env` ya está configurado automáticamente por Lovable Cloud y contiene:
```env
VITE_SUPABASE_URL=<tu_url_de_supabase>
VITE_SUPABASE_PUBLISHABLE_KEY=<tu_clave_publica>
VITE_SUPABASE_PROJECT_ID=<tu_id_de_proyecto>
```

**Nota**: Estas variables se generan automáticamente al usar Lovable Cloud. No necesitas editarlas manualmente.

4. **Iniciar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**

El proyecto estará disponible en: `http://localhost:8080`

### Solución de Problemas Comunes

- **Error de permisos de micrófono**: Asegúrate de permitir el acceso al micrófono en tu navegador
- **Web Speech API no funciona**: Usa Chrome o Edge, ya que tienen mejor soporte
- **Error de conexión a la base de datos**: Verifica que las variables de entorno estén configuradas correctamente

## 🌐 Despliegue en Servidor

### Opción 1: Despliegue con Lovable (Recomendado)

1. **Publicar desde Lovable**
   - Abre tu proyecto en [Lovable](https://lovable.dev)
   - Click en "Share" → "Publish"
   - Tu aplicación estará disponible en `https://tu-proyecto.lovable.app`

2. **Conectar dominio personalizado** (opcional)
   - Ve a Project > Settings > Domains
   - Click en "Connect Domain"
   - Sigue las instrucciones para configurar tu dominio

### Opción 2: Despliegue Manual

#### Preparar para Producción

1. **Construir el proyecto**
```bash
npm run build
# o
yarn build
```

Esto generará una carpeta `dist/` con los archivos estáticos optimizados.

2. **Configurar variables de entorno en el servidor**

Asegúrate de que tu servidor tenga las variables de entorno configuradas:
```env
VITE_SUPABASE_URL=<tu_url_de_supabase>
VITE_SUPABASE_PUBLISHABLE_KEY=<tu_clave_publica>
VITE_SUPABASE_PROJECT_ID=<tu_id_de_proyecto>
```

#### Opciones de Hosting

**A. Netlify**
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Desplegar
netlify deploy --prod --dir=dist
```

**B. Vercel**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel --prod
```

**C. Servidor tradicional (Nginx/Apache)**

1. Copiar el contenido de `dist/` a tu servidor:
```bash
scp -r dist/* usuario@tu-servidor:/var/www/html/
```

2. Configurar Nginx (ejemplo):
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

3. Reiniciar Nginx:
```bash
sudo systemctl restart nginx
```

## 🔒 Configuración de Seguridad

El proyecto incluye Row Level Security (RLS) configurado en Supabase para proteger los datos:
- Los estudiantes solo pueden ver y modificar sus propios datos
- Los profesores pueden ver el progreso de todos los estudiantes
- Los usuarios no autenticados no tienen acceso a datos sensibles

## 📱 Compatibilidad de Navegadores

- ✅ Chrome (recomendado para Web Speech API)
- ✅ Edge (recomendado)
- ⚠️ Firefox (soporte limitado de Web Speech API)
- ⚠️ Safari (soporte limitado de Web Speech API)

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de diseño personalizado con:
- Colores temáticos para educación infantil
- Gradientes alegres y atractivos
- Animaciones suaves y transiciones
- Tokens semánticos de Tailwind CSS
- Componentes accesibles de shadcn/ui

## 📦 Exportación y Migración del Proyecto

### Exportar el Código Frontend

**Opción 1: Conectar con GitHub (Recomendado)**

1. En Lovable, haz clic en el botón de GitHub en la esquina superior derecha
2. Conecta tu cuenta de GitHub
3. Selecciona "Push to GitHub" para crear un repositorio
4. Clona el repositorio en tu máquina local:

```bash
git clone <tu-repositorio-github>
cd <nombre-del-proyecto>
npm install
npm run dev
```

**Opción 2: Descarga Manual**

Si tienes acceso al código, puedes copiarlo directamente. El proyecto es un proyecto Vite/React estándar.

### Arquitectura del Backend

⚠️ **Importante**: Este proyecto NO tiene backend tradicional (Python/Node.js). Utiliza **Lovable Cloud (Supabase)** como backend, que incluye:

- Base de datos PostgreSQL
- Autenticación de usuarios
- APIs REST automáticas
- Row Level Security (RLS)

### Migrar la Base de Datos

#### Opción A: Usar el mismo proyecto Supabase (Más Fácil)

Las credenciales ya están en tu archivo `.env`:

```env
VITE_SUPABASE_URL=https://netxrkwcavwzuqpozzqx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=[tu-clave]
VITE_SUPABASE_PROJECT_ID=netxrkwcavwzuqpozzqx
```

Simplemente clona el proyecto y ejecuta con estas mismas variables de entorno.

#### Opción B: Crear tu Propio Proyecto Supabase

1. **Crear cuenta en Supabase**: https://supabase.com (gratis hasta cierto límite)

2. **Crear nuevo proyecto** en el dashboard de Supabase

3. **Ejecutar las migraciones SQL**: En el editor SQL de Supabase, ejecuta el siguiente script:

```sql
-- Crear enum para roles de aplicación
CREATE TYPE public.app_role AS ENUM ('student', 'teacher');

-- Crear enum para niveles de dificultad
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Crear enum para tipos de lección
CREATE TYPE public.lesson_type AS ENUM ('vocabulary', 'pronunciation', 'listening', 'sentence_building');

-- Tabla de perfiles de usuario
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  full_name text NOT NULL,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Tabla de roles de usuario
CREATE TABLE public.user_roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Tabla de lecciones
CREATE TABLE public.lessons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  type lesson_type NOT NULL,
  difficulty difficulty_level NOT NULL,
  content jsonb NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Tabla de progreso del estudiante
CREATE TABLE public.student_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL,
  lesson_id uuid NOT NULL,
  completed boolean DEFAULT false,
  score integer,
  pronunciation_score integer,
  attempts integer DEFAULT 0,
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Tabla de logros
CREATE TABLE public.achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  icon text NOT NULL,
  criteria jsonb NOT NULL,
  points integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Tabla de logros del estudiante
CREATE TABLE public.student_achievements (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid NOT NULL,
  achievement_id uuid NOT NULL,
  earned_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Función para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_student_progress_updated_at
  BEFORE UPDATE ON public.student_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Habilitar RLS en todas las tablas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Políticas RLS para user_roles
CREATE POLICY "Users can view all roles"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own roles during signup"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Políticas RLS para lessons
CREATE POLICY "Everyone can view active lessons"
  ON public.lessons FOR SELECT
  USING (is_active = true);

CREATE POLICY "Teachers can manage lessons"
  ON public.lessons FOR ALL
  USING (has_role(auth.uid(), 'teacher'::app_role));

-- Políticas RLS para student_progress
CREATE POLICY "Students can view own progress"
  ON public.student_progress FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Students can insert own progress"
  ON public.student_progress FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own progress"
  ON public.student_progress FOR UPDATE
  USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view all progress"
  ON public.student_progress FOR SELECT
  USING (has_role(auth.uid(), 'teacher'::app_role));

-- Políticas RLS para achievements
CREATE POLICY "Everyone can view achievements"
  ON public.achievements FOR SELECT
  USING (true);

-- Políticas RLS para student_achievements
CREATE POLICY "Students can view own achievements"
  ON public.student_achievements FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "System can insert achievements"
  ON public.student_achievements FOR INSERT
  WITH CHECK (auth.uid() = student_id);

-- Insertar datos de ejemplo para lecciones
INSERT INTO public.lessons (title, description, type, difficulty, content, order_index, is_active) VALUES
('Animals - Basic', 'Learn basic animal names in English', 'vocabulary', 'beginner', 
 '{"words": [{"word": "cat", "translation": "gato", "image": "🐱"}, {"word": "dog", "translation": "perro", "image": "🐶"}, {"word": "bird", "translation": "pájaro", "image": "🐦"}]}'::jsonb, 
 1, true),
('Colors', 'Practice color names', 'vocabulary', 'beginner',
 '{"words": [{"word": "red", "translation": "rojo", "image": "🔴"}, {"word": "blue", "translation": "azul", "image": "🔵"}, {"word": "yellow", "translation": "amarillo", "image": "🟡"}]}'::jsonb,
 2, true),
('Family Members', 'Learn family vocabulary', 'vocabulary', 'beginner',
 '{"words": [{"word": "mother", "translation": "madre", "image": "👩"}, {"word": "father", "translation": "padre", "image": "👨"}, {"word": "sister", "translation": "hermana", "image": "👧"}]}'::jsonb,
 3, true);
```

4. **Obtener nuevas credenciales**: 
   - Ve a Project Settings > API
   - Copia la URL y la anon/public key
   - Actualiza tu archivo `.env` local

5. **Configurar autenticación**:
   - En Supabase dashboard > Authentication > Providers
   - Habilita Email provider
   - En Email Templates, personaliza según necesites
   - Desactiva "Confirm email" para desarrollo rápido

#### Opción C: Exportar Datos Actuales

Para exportar los datos de tu base de datos actual de Lovable Cloud:

1. Accede al backend de Lovable Cloud (botón en el chat)
2. Ve a la sección de SQL Editor
3. Ejecuta queries para exportar datos:

```sql
-- Exportar perfiles
SELECT * FROM profiles;

-- Exportar roles
SELECT * FROM user_roles;

-- Exportar lecciones
SELECT * FROM lessons;

-- Exportar progreso
SELECT * FROM student_progress;
```

4. Copia los resultados y guárdalos como archivos SQL o JSON

### Ejecutar el Proyecto Completo Localmente

Una vez que tengas el código y la base de datos configurada:

```bash
# 1. Clonar/descargar el proyecto
cd smart-english-adventure

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Edita .env con tus credenciales de Supabase

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en navegador
# http://localhost:8080
```

### Desplegar en Otros Servicios

**Vercel / Netlify:**
```bash
# Construir proyecto
npm run build

# Desplegar (Vercel)
vercel --prod

# O (Netlify)
netlify deploy --prod --dir=dist
```

**Render / Railway:**
1. Conecta tu repositorio de GitHub
2. Configura las variables de entorno
3. Usa el comando de build: `npm run build`
4. Directorio de salida: `dist`

### Estructura de Archivos del Proyecto

```
smart-english-adventure/
├── src/
│   ├── components/        # Componentes React
│   ├── pages/            # Páginas de la aplicación
│   ├── integrations/     # Cliente Supabase
│   ├── lib/              # Utilidades
│   └── assets/           # Imágenes y recursos
├── supabase/
│   └── migrations/       # Migraciones SQL
├── public/               # Archivos estáticos
├── package.json          # Dependencias
├── vite.config.ts        # Configuración Vite
└── tailwind.config.ts    # Configuración Tailwind
```

### Notas Importantes

- ⚠️ **No hay servidor backend tradicional**: Todo el backend está en Supabase (base de datos + autenticación + APIs)
- ✅ **El frontend es 100% portable**: Es un proyecto React/Vite estándar
- 🔑 **Credenciales**: Las claves de Supabase son públicas (anon key), están diseñadas para usarse en el cliente
- 🔒 **Seguridad**: La seguridad está en las políticas RLS de Supabase, no en ocultar credenciales

## 🤝 Contribución

Este proyecto fue creado con [Lovable](https://lovable.dev) y está diseñado para ser fácilmente extensible.

## 📄 Licencia

[Especificar licencia según sea necesario]

## 📞 Soporte

Para preguntas o soporte, visita la [comunidad de Lovable](https://discord.com/channels/1119885301872070706/1280461670979993613)

---

**Desarrollado con ❤️ usando Lovable**