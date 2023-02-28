export const base_config = {
    MONITORING_TRACING: {
        SENTRY: {
            ACTIVO: true,
        },
        HANDLE_ERROR: {
            CONSOLE_LOG: true,
        },
    },
    IDLE: {
        ACTIVO: true,
        TIEMPO_SESION: 900,
        TIEMPO_AVISO: 180,
    },
    LOADING: {
        bdColor: 'rgba(255,255,255,0.5)',
        color: '#106eea',
    },
    REPORT: {
        TYPE: {
            pdf: 'application/pdf',
            xls: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            doc: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
    },
    SISTEMA: {
        NOMBRE: 'Universidad de Valparaíso', // Nombre por defecto. Es reemplazado por el registrado en PanelControl
        LOGIN: true, // El sistema operara o no en base a token
        GET_DATA: false, // Si el sistema no opera con token, se da la posibilidad de obtener datos (menus,modulos,aplicaciones)
        BREADCRUMB: true, // Migas de pan
        HOME: true, // Incluir menu "Inicio" al conjunto de menus,
        URL: {
            PORTAL: 'https://portal.uv.cl',
            CAMBIA_CLAVE: 'https://cambiaclave.uv.cl',
            REPOSITORIO: 'https://repositorio.uv.cl/',
            PATHAPPSIMG: 'imagenes/iconos_sistemas/aplicaciones/',
            PATHMODULOSIMG: 'imagenes/iconos_sistemas/modulos/',
            PATHMENUSIMG: 'imagenes/iconos_sistemas/menus/base/',
            PATHITEMSIMG: 'imagenes/iconos_sistemas/menus/items/base/',
            PATHSTATIC: '/static/sistemas/base/',
            PATH404IMG:
                'https://repositorio.uv.cl/imagenes/iconos_sistemas/menus/base/noicon.png',
        },
        LOADS: {
            APPS: { BUTTON: true, DATA: true },
            MODULOS: { BUTTON: true, DATA: true },
            MENUS: { BUTTON: true, DATA: true },
            NOTICIAS: { BUTTON: true, DATA: true },
            AVISOS: { BUTTON: true, DATA: true },
            USUARIO: { DATA: true },
            VOLVER_PORTAL: { BUTTON: true },
            FECHA: { DATA: true },
        },
        LINKS: {
            AYUDA: {
                ACTIVO: true,
                BUTTONS: {
                    CONTACTO: true,
                    SIMBOLOGIA: true,
                },
            },
            USUARIO: {
                ACTIVO: true,
                BUTTONS: {
                    PROFILE: true,
                    CORREO: true,
                    CAMBIA_CLAVE: true,
                    LOG_OUT: true,
                },
            },
        },
        CONNECTION: {
            TIMEOUT: 5000,
            RETRY: 1,
        },
        MENUS: {
            ITEMS_ICON: true,
            FLAT_ICONS: true,
        },
        TRANSLATE: {
            ACTIVO: true,
            IDIOMAS: [
                { label: 'Español', value: 'es' },
                { label: 'English', value: 'en' },
            ],
            DEFAULT: 'es',
        },
        CORREO_UV: {
            PREGRADO: 'http://correo.alumnos.uv.cl/',
            POSTGRADO: 'http://correo.postgrado.uv.cl/',
            FUNCIONARIO: 'http://correo.uv.cl/',
            EN_USO: 'FUNCIONARIO',
        },
        ROUTING: {
            SKIPLOCATIONCHANGE: true,
        },
    },
    DTIC: {
        NOMBRE: 'Dirección de Tecnologías de Información y Comunicación',
        URL: 'https://dtic.uv.cl',
        SIGLA: 'DTIC',
    },
    UV: {
        NOMBRE: 'Universidad de Valparaíso',
        URL: 'https://uv.cl',
        SIGLA: 'UV',
    },
    TUI: {
        URL_FOTO: 'https://admintui.uv.cl/data/fotos2/',
        FORMATO_FOTO: '.jpg',
        URL_TUI: 'https://tui.uv.cl/',
    },
};
