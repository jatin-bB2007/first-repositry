document.addEventListener("DOMContentLoaded", () => {
  const navMenus = document.querySelectorAll(".campus-nav-menu, .mba-nav-menu");

  navMenus.forEach((menu) => {
    const closeOtherMenus = () => {
      navMenus.forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.removeAttribute("open");
        }
      });
    };

    menu.addEventListener("mouseenter", () => {
      closeOtherMenus();
      menu.setAttribute("open", "");
    });

    menu.addEventListener("focusin", () => {
      closeOtherMenus();
      menu.setAttribute("open", "");
    });

    menu.addEventListener("mouseleave", () => {
      menu.removeAttribute("open");
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".campus-nav-menu, .mba-nav-menu")) {
      navMenus.forEach((menu) => menu.removeAttribute("open"));
    }
  });
});
