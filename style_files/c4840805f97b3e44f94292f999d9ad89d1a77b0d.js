(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(9, {"segment_write_key":"MPf9we9kOQzXIvhRPegOfdnR0EgGbXuk","track_users":true,"track_by_external_id":false,"track_page":true,"track_topic_creation":true,"track_post_creation":true,"track_likes":true,"track_flags":true,"track_bookmarks":true,"extend_content_security_policy":"script_src: https://cdn.segment.com/analytics.js/"});
  }
})();
(function () {
    if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
        var __theme_name__ = "discourse-segment-theme-component";
        var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(9);
        var themePrefix = function themePrefix(key) {
            return 'theme_translations.9.' + key;
        };

        Discourse._registerPluginCode('0.8.27', function (api) {
            try {
                var page = function page(title, opts) {
                    opts = opts || {};
                    opts.platform = platform;
                    currentPage = title;
                    window.analytics.page(currentPage, opts);
                };

                var track = function track(title, opts) {
                    opts = opts || {};
                    opts.platform = platform;
                    opts.location = currentPage;
                    window.analytics.track(title, opts);
                };

                var pageChanged = function pageChanged(container, details) {
                    var routeName = details.currentRouteName;
                    var route = container.lookup('route:' + routeName);
                    var model = route.currentModel;
                    var pageTitle = void 0;

                    currentUrl = window.location.href;

                    switch (routeName) {
                        case "discovery.latest":
                            pageTitle = "Latest Topics";
                            page(pageTitle, { referrer: referrer });
                            break;
                        case "discovery.categories":
                            pageTitle = "All Categories";
                            page(pageTitle, { referrer: referrer });
                            break;
                        case "discovery.parentCategory":
                        case "discovery.category":
                            if (model && model.category) {
                                pageTitle = 'Category: ' + model.category.name;
                                page(pageTitle, { referrer: referrer });
                            }
                            break;
                        case "tags.show":
                            if (model && model.id) {
                                pageTitle = 'Tag: ' + model.id;
                                page(pageTitle, { referrer: referrer });
                            }
                            break;
                        case "tags.showCategory":
                            if (model && model.id) {
                                pageTitle = 'Category Tag: ' + model.id;
                                page(pageTitle, { referrer: referrer });
                            }
                            break;
                        case "topic.fromParams":
                        case "topic.fromParamsNear":
                            if (details.title) {
                                pageTitle = 'Topic: ' + details.title;
                                page(pageTitle, { referrer: referrer });
                            }
                    }

                    referrer = currentUrl;
                };

                !function () {
                    var analytics = window.analytics = window.analytics || [];
                    if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");else {
                        analytics.invoked = !0;
                        analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];
                        analytics.factory = function (t) {
                            return function () {
                                var e = Array.prototype.slice.call(arguments);
                                e.unshift(t);
                                analytics.push(e);
                                return analytics;
                            };
                        };
                        for (var t = 0; t < analytics.methods.length; t++) {
                            var e = analytics.methods[t];
                            analytics[e] = analytics.factory(e);
                        }
                        analytics.load = function (t, e) {
                            var n = document.createElement("script");
                            n.type = "text/javascript";
                            n.async = !0;
                            n.src = "https://cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";
                            var a = document.getElementsByTagName("script")[0];
                            a.parentNode.insertBefore(n, a);
                            analytics._loadOptions = e;
                        };
                        analytics.SNIPPET_VERSION = "4.1.0";
                        analytics.load(settings.segment_write_key);
                    }
                }();

                var ssoEnabled = api.container.lookup('site-settings:main').enable_sso;
                var currentUser = api.getCurrentUser();
                var referrer = document.referrer;
                var ua = navigator.userAgent;
                var platform = "Web";
                var userID = void 0;
                var currentUrl = void 0;
                var currentPage = void 0;

                // identify() will be called when a user logs in, or refreshes the page.
                if (settings.track_users && currentUser && !userID) {
                    api.container.lookup('store:main').find('user', currentUser.username).then(function (user) {
                        userID = ssoEnabled && settings.track_by_external_id ? user.external_id : user.id;
                        analytics.identify(userID);
                    });
                }

                if (ua.match(/(iPhone|iPod|iPad)/)) {
                    platform = "iOS";
                }

                if (ua.match(/(Android)/)) {
                    platform = "Android";
                }

                if (settings.track_page) {
                    api.onAppEvent("page:changed", function (details) {
                        pageChanged(api.container, details);
                    });
                }

                if (settings.track_topic_creation) {
                    api.onAppEvent("topic:created", function (post, composerModel) {
                        if (post) {
                            track("Topic Created", {
                                topic_id: post.topic_id,
                                topic_title: post.title,
                                category_id: composerModel.get("category.id"),
                                category_name: composerModel.get("category.name")
                            });
                        }
                    });
                }

                if (settings.track_post_creation) {
                    api.onAppEvent("post:created", function (post) {
                        if (post) {
                            track("Post Created", {
                                post_id: post.id,
                                topic_id: post.get("topic.id"),
                                topic_title: post.get("topic.title"),
                                category_id: post.get("topic.category.id"),
                                category_name: post.get("topic.category.name")
                            });
                        }
                    });
                }

                if (settings.track_likes) {
                    api.onAppEvent("page:like-toggled", function (post, likeAction) {
                        var topic = post.topic;
                        if (post && topic && likeAction && likeAction.acted) {
                            track("Like", {
                                topic_id: topic.id,
                                topic_title: topic.title,
                                category_id: topic.get("category.id"),
                                category_name: topic.get("category.name"),
                                post_id: post.id
                            });
                        }
                    });
                }

                if (settings.track_bookmarks) {
                    api.onAppEvent("page:bookmark-post-toggled", function (post) {
                        var topic = post.topic;
                        if (post && post.bookmarked && topic) {
                            track(post.post_number === 1 ? "Thread Bookmarked" : "Post Bookmarked", {
                                topic_id: topic.id,
                                topic_title: topic.title,
                                category_id: topic.get("category.id"),
                                category_name: topic.get("category.name"),
                                post_id: post.post_number === 1 ? null : post.id
                            });
                        }
                    });
                }

                if (settings.track_flags) {
                    api.onAppEvent("post:flag-created", function (post, postAction) {
                        if (post && postAction) {
                            track("Flag", {
                                post_id: post.id,
                                topic_id: post.topic_id,
                                topic_title: post.get("topic.title"),
                                flag_option: postAction.get("actionType.name")
                            });
                        }
                    });

                    api.onAppEvent("topic:flag-created", function (post, postAction) {
                        if (post && postAction) {
                            track("Flag", {
                                post_id: post.topic_id,
                                topic_title: post.get("topic.title"),
                                category_id: post.get("topic.category.id"),
                                category_name: post.get("topic.category.name"),
                                flag_option: postAction.get("actionType.name")
                            });
                        }
                    });
                }
            } catch (err) {
                var rescue = require("discourse/lib/utilities").rescueThemeError;
                rescue(__theme_name__, err, api);
            }
        });
    }
})();