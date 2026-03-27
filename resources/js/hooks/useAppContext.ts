import { usePage } from '@inertiajs/react';

import { currentUser as fallbackCurrentUser, navigation as fallbackNavigation, navigationByRole } from '@/data/mockData';
import { CurrentUser, NavigationItem, SharedPageProps, UserRole } from '@/types';

export function useAppContext() {
    const { props } = usePage<SharedPageProps>();
    const appContext = props.app.context;
    const authUser = props.auth.user;

    const currentUser: CurrentUser = authUser
        ? {
              name: authUser.display_name || authUser.name,
              role: humanizeRole(authUser.role ?? 'teacher'),
              avatar: authUser.avatar || buildInitials(authUser.display_name || authUser.name),
              organizationName: authUser.organization_name ?? appContext.organizationName,
              organizationUnitName: authUser.organization_unit_name ?? appContext.organizationUnitName,
          }
        : fallbackCurrentUser;

    const baseNavigation = authUser?.role ? navigationByRole[authUser.role as UserRole] ?? fallbackNavigation : fallbackNavigation;

    const navigation: NavigationItem[] = baseNavigation.map((item) => {
        if (item.id === 'alunos') {
            return { ...item, label: appContext.labels.students };
        }

        if (item.id === 'turmas') {
            return { ...item, label: appContext.labels.classes };
        }

        if (item.id === 'planejamento') {
            return { ...item, label: appContext.labels.lessonPlans };
        }

        if (item.id === 'materiais') {
            return { ...item, label: appContext.labels.materials };
        }

        if (item.id === 'atividades') {
            return { ...item, label: appContext.labels.activities };
        }

        if (item.id === 'agenda') {
            return { ...item, label: appContext.labels.agenda };
        }

        if (item.id === 'desempenho') {
            return { ...item, label: appContext.labels.reports };
        }

        return item;
    });

    return {
        appContext,
        currentUser,
        navigation,
    };
}

function buildInitials(name: string) {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

function humanizeRole(role: string) {
    switch (role) {
        case 'teacher':
            return 'Docente';
        case 'coordinator':
            return 'Coordenacao';
        case 'admin':
            return 'Administracao';
        default:
            return 'Equipe academica';
    }
}
