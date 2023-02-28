/**
 * escribe aqui tus variables globales
 */

export const project_config = {
    MONITORING_TRACING: {
        GOOGLE_ANALYTICS: {
            ACTIVO: true,
        },
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
    SISTEMA: {
        MENUS: {
            ITEMS_ICON: true,
            FLAT_ICONS: false,
        },
        CONNECTION: {
            TIMEOUT: 5000,
            RETRY: 1,
        },
        URL: {
            PATHMENUSIMG: 'imagenes/iconos_sistemas/menus/<capacitacion>/',
            PATHITEMSIMG: 'imagenes/iconos_sistemas/menus/items/<capacitacion>/',
            PATHSTATIC: '/static/sistemas/capacitacion/',
        },
        CORREO_UV: {
            EN_USO: 'FUNCIONARIO',
        },
        ROUTING: {
            SKIPLOCATIONCHANGE: true,
        },
    },
};
