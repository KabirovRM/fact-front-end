export default {
/*   languages: {
    ru: {
      customization: {
        title: "Кастомизация",
      },
      positionsGradesEdit: "Редактировать разряды сотрудников",
      positionsGradesView: "Видеть разряды сотрудников",
      calendar: "Календари",
      widgets: "Виджеты",
      team: {
        hintView:
          "<b>Свои команды</b> — возможность просмотра команд, в которых сотрудник является руководителем, помощником руководителя или участником команды.</br><b>Все команды</b> — возможность просмотра всех команд в компании.",
        hintEdit:
          "<b>Свои команды</b> — возможность редактирования команд, в которых сотрудник является руководителем или помощником руководителя.</br><b>Все команды</b> — возможность редактирования всех команд в компании.",
        hintDelete:
          "<b>Нет</b> — отсутствие возможности удаления команд.</br><b>Свои команды</b> — возможность удаления команд, в которых сотрудник является руководителем или помощником руководителя.</br><b>Все команды</b> — возможность удаления всех команд в компании.",
        descriptionTeamRole:
          "Права доступа к командным задачам настраиваются в  окне редактирования команды. Вы можете ограничить просмотр чужих задач и определить, какие участники смогут создавать, перемещать, редактировать и удалять задачи.",
      },
      accessRights: {
        candidates: {
          questionnaires: {
            title: "Анкеты кандидатов",
          },
        },
      },
    },
    en: {
      customization: {
        title: "Customization",
      },
      positionsGradesEdit: "Edit employee grades",
      positionsGradesView: "View employee grades",
      calendar: "Calendars",
      widgets: "Widgets",
      team: {
        hintView:
          "<b>My teams</b> — ability to view teams where the employee is a manager, assistant manager, or team member.</br><b>All teams</b> — ability to view all teams in the company.",
        hintEdit:
          "<b>My teams</b> — ability to edit teams where the employee is a manager or assistant manager.</br><b>All teams</b> — ability to edit all teams in the company.",
        hintDelete:
          "<b>None</b> — no ability to delete teams.</br><b>My teams</b> — ability to delete teams where the employee is a manager or assistant manager.</br><b>All teams</b> — ability to delete all teams in the company.",
        descriptionTeamRole:
          "Access rights to team tasks are configured in the team editing window. You can restrict viewing others' tasks and specify which members can create, move, edit, and delete tasks.",
      },
      accessRights: {
        candidates: {
          questionnaires: {
            title: "Candidates questionnaires",
          },
        },
      },
    },
    kk: {
      customization: {
        title: "Кастомизация",
      },
      positionsGradesEdit: "Қызметкерлердің бағаларын өңдеу",
      positionsGradesView: "Қызметкерлердің бағаларын қарау",
      calendar: "Күнтізбелер",
      widgets: "Виджеттер",
      team: {
        hintView:
          "<b>Өз командалары</b> — қызметкер басшы, басшының көмекшісі немесе команда мүшесі болып табылатын командаларды қарау мүмкіндігі.</br><b>Барлық командалар</b> — компаниядағы барлық командаларды қарау мүмкіндігі.",
        hintEdit:
          "<b>Өз командалары</b> — қызметкер басшы немесе басшының көмекшісі болып табылатын командаларды өңдеу мүмкіндігі.</br><b>Барлық командалар</b> — компаниядағы барлық командаларды өңдеу мүмкіндігі.",
        hintDelete:
          "<b>Жоқ</b> — командаларды жою мүмкіндігінің болмауы.</br><b>Өз командалары</b> — қызметкер басшы немесе басшының көмекшісі болып табылатын командаларды жою мүмкіндігі.</br><b>Барлық командалар</b> — компаниядағы барлық командаларды жою мүмкіндігі.",
        descriptionTeamRole:
          "Командалық тапсырмаларға қатысу құқықтары команданы өңдеу терезесінде бапталады. Сіз басқа адамдардың тапсырмаларын қарауды шектей аласыз және қай мүшелердің тапсырмаларды жасауға, жылжытуға, өңдеуге және жоюға құқығы бар екенін анықтай аласыз.",
      },
      accessRights: {
        candidates: {
          questionnaires: {
            title: "Кандидаттардың сауалнамалары",
          },
        },
      },
    },
  },
 */

/*   transformRoutes(routes) {
    return routes.map((route) => {
      if (route.name === "main-root") {
        route.children?.push({
          name: "customization",
          path: "/customization",
          component: () => import("$/pages/customization/ui/CustomizationPage.vue"),
        });
      }
      return route;
    });
  }, */
  
/*  async transformLeftMenu(menuGroups) {
    return  menuGroups.map(async (group) => {
      if (group.id === "my-company") {
        const { cloneDeep } = await import("lodash");
        const tmpArr = cloneDeep(group);
        const customItemIndex = tmpArr.pages.findIndex((page) => page.id === "ideas");
        const customItem = {
          heading: "Кастомизация",
          route: "/customization",
          icon: "vuesax-setting-2",
          id: "customization",
        };
        if (customItemIndex >= 0) {
          tmpArr.pages.splice(customItemIndex + 1, 0, customItem);
        } else {
          tmpArr.pages.push(customItem);
        }
        return tmpArr;
      }
      return group;
    });
  }, */

/* async transformLeftMenu(menuGroups){
    return menuGroups.map(async(group)=>{
      if(group.id==='my-company'){
        let tmpArr = cloneDeep(group)
        let knBaseIndex = group.pages.findIndex((page)=>page.id==='knowledge_base')
        tmpArr.pages.splice(knBaseIndex + 1, 0, leftMenuItem)
        return tmpArr
      }
      return group
    })
  }, */

};
