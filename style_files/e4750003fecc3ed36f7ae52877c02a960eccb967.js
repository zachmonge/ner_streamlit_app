(function() {
  if ('Discourse' in window && Discourse.__container__) {
    Discourse.__container__
      .lookup("service:theme-settings")
      .registerSettings(2, {"theme_uploads":{"IBMPlexSans-Bold":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/3ea14e6c7abe5738a05a9aa43c82c0608bd6128d.ttf","IBMPlexSans-BoldItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/a2056eb7c93541238187f346a59a20dea843ccc7.ttf","IBMPlexSans-ExtraLight":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/d12208f2af002e2ea60bfed7d3ec0390a434ed39.ttf","IBMPlexSans-ExtraLightItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/5497528ebd56d0351024ae39d1a2237a6edf58e6.ttf","IBMPlexSans-Medium":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/217ea2eb48ec33e3076064ea9c9f8d953e7ce061.ttf","IBMPlexSans-MediumItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/8bf01afac8fc3e072eb36667374393b8566a044d.ttf","IBMPlexSans-Regular":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/ad38f2d6870ca73533f36bdb958cd8083a49c1a8.ttf","IBMPlexSans-RegularItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/fcd14d0d6be7ca021e4d32b388a50a2a8fc37241.ttf","IBMPlexSans-SemiBold":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/4306dd9745eaa58c833cdf0a02a74df063a3e62d.ttf","IBMPlexSans-SemiBoldItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/a78c618a5d83402697bedc89bfe78458fd66825d.ttf","IBMPlexSans-Thin":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/5c081c354d0007be88434b638c9974aa0f6bab4c.ttf","IBMPlexSans-ThinItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/cf2e01829e8b0d606996d071b155ce600c70d43b.ttf","IBMPlexSans-Light":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/b8e183dbc7f9a8dafff69e3cd2a247b94212e837.ttf","IBMPlexSans-LightItalic":"//discourse-cloud-file-uploads.s3.dualstack.us-west-2.amazonaws.com/business7/uploads/streamlit/original/1X/b8bb2063b39723712af6b031211477825a1dfffc.ttf"}});
  }
})();
(function () {
    if ('Discourse' in window && typeof Discourse._registerPluginCode === 'function') {
        var __theme_name__ = "Light";
        var settings = Discourse.__container__.lookup("service:theme-settings").getObjectForTheme(2);
        var themePrefix = function themePrefix(key) {
            return 'theme_translations.2.' + key;
        };

        Discourse._registerPluginCode('0.8.32', function (api) {
            try {

                //https://www.simoahava.com/gtm-tips/fix-rogue-referral-problem-single-page-sites/
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    originalLocation: document.location.protocol + '//' + document.location.hostname + document.location.pathname + document.location.search
                });

                api.onAppEvent("post:created", function (post) {
                    if (post) {
                        window.dataLayer.push({
                            'event': 'postCreated'
                        });
                    }
                });

                api.onAppEvent("topic:created", function (post, composerModel) {
                    if (post) {
                        // I am able to create a `topicCategory` variable on GTM and pass it to analytics,
                        // but am not sure this is the correct approach.
                        window.dataLayer.push({
                            'event': 'topicCreated'
                            // 'topicCategory': composerModel.get("category.name")
                        });
                    }
                });

                api.onAppEvent("page:bookmark-post-toggled", function (post) {
                    if (post && post.bookmarked) {
                        var event = post.post_number === 1 ? "topicBookmarked" : "postBookmarked";
                        window.dataLayer.push({
                            'event': event
                        });
                    }
                });

                api.onAppEvent("page:like-toggled", function (post, likeAction) {
                    var topic = post.topic;
                    if (post && topic && likeAction && likeAction.acted) {
                        window.dataLayer.push({
                            'event': 'postLiked'
                        });
                    }
                });
            } catch (err) {
                var rescue = require("discourse/lib/utilities").rescueThemeError;
                rescue(__theme_name__, err, api);
            }
        });
    }
})();