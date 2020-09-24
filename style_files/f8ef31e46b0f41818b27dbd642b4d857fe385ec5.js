(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(5, {"Custom_header_links":"Homepage, Streamlit homepage, https://streamlit.io/, vdo, blank, remove|About, About, https://streamlit.io/about/, vdo, blank, remove|We're Hiring, We're Hiring, https://streamlit.io/jobs/, vdo, blank, remove|Docs, Streamlit Docs, https://docs.streamlit.io/|GitHub, Streamlit Project Repo, https://github.com/streamlit/streamlit","links_position":"right"});
  }
})();
(function () {
  if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
    var __theme_name__ = "Header Links";
    var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(5);
    var themePrefix = function themePrefix(key) {
      return 'theme_translations.5.' + key;
    };

    Discourse._registerPluginCode('0.8.20', function (api) {
      try {

        var customHeaderLinks = settings.Custom_header_links;
        var linksPosition = settings.links_position === "right" ? "header-buttons:before" : "home-logo:after";

        if (!customHeaderLinks.length) return;

        var h = require("virtual-dom").h;
        var headerLinks = [];

        customHeaderLinks.split("|").map(function (i) {
          var seg = $.map(i.split(","), $.trim);
          var linkText = seg[0];
          var linkTitle = seg[1];
          var linkHref = seg[2];
          var deviceClass = '.' + seg[3];
          var linkTarget = seg[4] === "self" ? "" : "_blank";
          var keepOnScrollClass = seg[5] === "keep" ? ".keep" : "";
          var linkClass = '.' + linkText.trim().toLowerCase().replace(/\s/gi, '-') + '-custom-header-links';

          if (!linkTarget) {
            headerLinks.push(h('li.headerLink' + deviceClass + keepOnScrollClass + linkClass, h("a", {
              title: linkTitle,
              href: linkHref
            }, linkText)));
          } else {
            headerLinks.push(h('li.headerLink' + deviceClass + keepOnScrollClass + linkClass, h("a", {
              title: linkTitle,
              href: linkHref,
              target: linkTarget
            }, linkText)));
          }
        });

        api.decorateWidget(linksPosition, function (helper) {
          return helper.h("ul.custom-header-links", headerLinks);
        });

        api.decorateWidget("home-logo:after", function (helper) {
          var titleVisible = helper.attrs.minimized;
          if (titleVisible) {
            $(".d-header").addClass("hide-menus");
          } else {
            $(".d-header").removeClass("hide-menus");
          }
        });
      } catch (err) {
        var rescue = require("discourse/lib/utilities").rescueThemeError;
        rescue(__theme_name__, err, api);
      }
    });
  }
})();