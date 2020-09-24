Ember.TEMPLATES["javascripts/connectors/category-custom-settings/feature-voting-settings"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[7,"h3",true],[8],[1,[28,"i18n",["voting.title"],null],false],[9],[0,"\\n"],[7,"section",true],[10,"class","field"],[8],[0,"\\n  "],[7,"div",true],[10,"class","enable-topic-voting"],[8],[0,"\\n    "],[7,"label",true],[10,"class","checkbox-label"],[8],[0,"\\n      "],[1,[28,"input",null,[["type","checked"],["checkbox",[24,["category","custom_fields","enable_topic_voting"]]]]],false],[0,"\\n      "],[1,[28,"i18n",["voting.allow_topic_voting"],null],false],[0,"\\n    "],[9],[0,"\\n  "],[9],[0,"\\n"],[9],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/connectors/category-custom-settings/feature-voting-settings"}}),Ember.TEMPLATES["javascripts/connectors/user-activity-bottom/user-voted-topics"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"if",[[24,["siteSettings","voting_show_votes_on_profile"]]],null,{"statements":[[7,"li",true],[8],[0,"\\n"],[4,"link-to",null,[["route"],["userActivity.votes"]],{"statements":[[0,"    "],[1,[28,"d-icon",["heart"],null],false],[0," "],[1,[28,"i18n",["voting.vote_title_plural"],null],false],[0,"\\n"]],"parameters":[]},null],[9],[0,"\\n"]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/connectors/user-activity-bottom/user-voted-topics"}}),Ember.TEMPLATES["javascripts/connectors/topic-above-post-stream/topic-title-voting"]=Ember.HTMLBars.template({id:null,block:'{"symbols":[],"statements":[[4,"if",[[24,["model","can_vote"]]],null,{"statements":[[4,"if",[[24,["model","postStream","loaded"]]],null,{"statements":[[4,"if",[[24,["model","postStream","firstPostPresent"]]],null,{"statements":[[0,"      "],[7,"div",true],[10,"class","voting title-voting"],[8],[0,"\\n        "],[1,[28,"mount-widget",null,[["widget","args","showLogin"],["vote-box",[24,["model"]],[28,"route-action",["showLogin"],null]]]],false],[0,"\\n      "],[9],[0,"\\n"]],"parameters":[]},null]],"parameters":[]},null]],"parameters":[]},null]],"hasEval":false}',meta:{moduleName:"javascripts/discourse/templates/connectors/topic-above-post-stream/topic-title-voting"}}),define("discourse/plugins/discourse-voting/discourse/initializers/discourse-voting",["exports","discourse/lib/plugin-api","discourse/models/nav-item"],function(t,e,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"discourse-voting",initialize:function(){(0,e.withPluginApi)("0.8.32",function(e){e.container.lookup("site-settings:main").voting_enabled&&(e.container.lookup("controller:full-page-search").sortOrders.pushObject({name:I18n.t("search.most_votes"),id:5,term:"order:votes"}),e.addNavigationBarItem({name:"votes",before:"top",customFilter:function(t){return t&&t.can_vote},customHref:function(t,e){return o.default.pathFor("latest",e)+"?order=votes"},forceActive:function(t,e,o){var s=o.currentRoute.queryParams;return s&&1===Object.keys(s).length&&"votes"===s.order}}),e.addNavigationBarItem({name:"my_votes",before:"top",customFilter:function(t){return t&&t.can_vote&&e.getCurrentUser()},customHref:function(t,e){return o.default.pathFor("latest",e)+"?state=my_votes"},forceActive:function(t,e,o){var s=o.currentRoute.queryParams;return s&&1===Object.keys(s).length&&"my_votes"===s.state}}))})}}}),define("discourse/plugins/discourse-voting/discourse/widgets/vote-options",["exports","discourse/widgets/widget","virtual-dom"],function(t,e,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=(0,e.createWidget)("vote-options",{tagName:"div.vote-options",buildClasses:function(){return"voting-popup-menu popup-menu hidden"},html:function(t){var e=[];return t.user_voted?e.push(this.attach("remove-vote",t)):this.currentUser&&this.currentUser.votes_exceeded&&!t.user_voted&&e.push([(0,o.h)("div",I18n.t("voting.reached_limit")),(0,o.h)("p",(0,o.h)("a",{href:this.currentUser.get("path")+"/activity/votes"},I18n.t("voting.list_votes")))]),e}})}),define("discourse/plugins/discourse-voting/discourse/widgets/vote-count",["exports","discourse/widgets/widget","discourse-common/lib/get-url","virtual-dom","discourse/lib/ajax"],function(t,e,o,i,s){"use strict";function n(t){return{template:t.avatar_template,username:t.username,post_url:t.post_url,url:(0,o.default)("/users/")+t.username.toLowerCase()}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=(0,e.createWidget)("vote-count",{tagName:"div.vote-count-wrapper",buildKey:function(){return"vote-count"},buildClasses:function(){if(0===this.attrs.vote_count)return"no-votes"},defaultState:function(){return{whoVotedUsers:null}},html:function(t){var e=(0,i.h)("div.vote-count",t.vote_count.toString()),o=null;this.siteSettings.voting_show_who_voted&&this.state.whoVotedUsers&&0<this.state.whoVotedUsers.length&&(o=this.attach("small-user-list",{users:this.state.whoVotedUsers,addSelf:t.liked,listClassName:"regular-votes"}));var s=[e];return o&&s.push((0,i.h)("div.who-voted.popup-menu.voting-popup-menu",[o])),s},click:function(){if(this.siteSettings.voting_show_who_voted&&0<this.attrs.vote_count){if(null===this.state.whoVotedUsers)return this.getWhoVoted();$(".who-voted").toggle()}},clickOutside:function(){$(".who-voted").hide()},getWhoVoted:function(){var e=this;return(0,s.ajax)("/voting/who",{type:"GET",data:{topic_id:this.attrs.id}}).then(function(t){e.state.whoVotedUsers=t.map(n)})}})}),define("discourse/plugins/discourse-voting/discourse/widgets/vote-box",["exports","discourse/widgets/widget","discourse/lib/ajax","discourse/widgets/raw-html","discourse/lib/ajax-error"],function(t,e,i,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=(0,e.createWidget)("vote-box",{tagName:"div.voting-wrapper",buildKey:function(){return"vote-box"},buildClasses:function(){if(this.siteSettings.voting_show_who_voted)return"show-pointer"},defaultState:function(){return{allowClick:!0,initialVote:!1}},html:function(t,e){var o,s=[this.attach("vote-count",t),this.attach("vote-button",t),this.attach("vote-options",t)];return 0<e.votesAlert&&(o="<div class='voting-popup-menu vote-options popup-menu'>"+I18n.t("voting.votes_left",{count:e.votesAlert,path:this.currentUser.get("path")+"/activity/votes"})+"</div>",s.push(new n.default({html:o}))),s},hideVotesAlert:function(){this.state.votesAlert&&(this.state.votesAlert=null,this.scheduleRerender())},click:function(){this.hideVotesAlert()},clickOutside:function(){this.hideVotesAlert()},addVote:function(){var e=this,o=this.attrs,s=this.state;return(0,i.ajax)("/voting/vote",{type:"POST",data:{topic_id:o.id}}).then(function(t){o.set("vote_count",t.vote_count),o.set("user_voted",!0),e.currentUser.setProperties({votes_exceeded:!t.can_vote,votes_left:t.votes_left}),t.alert&&(s.votesAlert=t.votes_left),o.set("who_voted",t.who_voted),s.allowClick=!0,e.scheduleRerender()}).catch(r.popupAjaxError)},removeVote:function(){var e=this,o=this.attrs,s=this.state;return(0,i.ajax)("/voting/unvote",{type:"POST",data:{topic_id:o.id}}).then(function(t){o.set("vote_count",t.vote_count),o.set("user_voted",!1),e.currentUser.setProperties({votes_exceeded:!t.can_vote,votes_left:t.votes_left}),o.set("who_voted",t.who_voted),s.allowClick=!0,e.scheduleRerender()}).catch(r.popupAjaxError)}})}),define("discourse/plugins/discourse-voting/discourse/widgets/vote-button",["exports","discourse/widgets/widget","virtual-dom"],function(t,e,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=(0,e.createWidget)("vote-button",{tagName:"div",buildClasses:function(t){var e="",e=t.closed?"voting-closed":t.user_voted?this.currentUser&&this.currentUser.votes_exceeded?"vote-limited nonvote":"vote":"nonvote";return this.siteSettings.voting_show_who_voted&&(e+=" show-pointer"),e},html:function(t){var e=I18n.t("voting.vote_title"),e=this.currentUser?t.closed?I18n.t("voting.voting_closed_title"):t.user_voted?I18n.t("voting.voted_title"):this.currentUser&&this.currentUser.votes_exceeded?I18n.t("voting.voting_limit"):I18n.t("voting.vote_title"):t.vote_count?I18n.t("voting.anonymous_button",{count:t.vote_count}):I18n.t("voting.anonymous_button",{count:1});return(0,o.h)("button",{attributes:{title:this.currentUser?I18n.t("voting.votes_left_button_title",{count:this.currentUser.votes_left}):""},className:"btn btn-primary vote-button"},e)},click:function(){if(!this.currentUser)return this.sendWidgetAction("showLogin"),void $.cookie("destination_url",window.location.href);this.attrs.closed||!this.parentWidget.state.allowClick||this.attrs.user_voted||(this.parentWidget.state.allowClick=!1,this.parentWidget.state.initialVote=!0,this.sendWidgetAction("addVote")),(this.attrs.user_voted||this.currentUser.votes_exceeded)&&$(".vote-options").toggle()},clickOutside:function(){$(".vote-options").hide(),this.parentWidget.state.initialVote=!1}})}),define("discourse/plugins/discourse-voting/discourse/widgets/remove-vote",["exports","discourse/widgets/widget","discourse-common/lib/icon-library"],function(t,e,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=(0,e.createWidget)("remove-vote",{tagName:"div.remove-vote",buildClasses:function(){return"vote-option"},html:function(){return[(0,o.iconNode)("times"),I18n.t("voting.remove_vote")]},click:function(){this.sendWidgetAction("removeVote")}})}),define("discourse/plugins/discourse-voting/discourse/feature-voting-route-map",["exports"],function(t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={resource:"user",path:"users/:username",map:function(){this.route("userActivity",{path:"activity",resetNamespace:!0},function(){this.route("votes")})}}}),define("discourse/plugins/discourse-voting/discourse/routes/user-activity-votes",["exports","discourse/routes/user-topic-list","discourse/models/user-action"],function(t,e,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=e.default.extend({userActionType:o.default.TYPES.topics,model:function(){return this.store.findFiltered("topicList",{filter:"topics/voted-by/"+this.modelFor("user").get("username_lower")})}})}),define("discourse/plugins/discourse-voting/discourse/pre-initializers/extend-category-for-voting",["exports","discourse/lib/plugin-api"],function(t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"extend-category-for-voting",before:"inject-discourse-objects",initialize:function(){(0,e.withPluginApi)("0.8.4",function(t){return(e=t).addPostClassesCallback(function(t){if(1===t.post_number&&t.can_vote)return["voting-post"]}),e.includePostAttributes("can_vote"),void e.addTagsHtmlCallback(function(t){if(t.can_vote){var e=[],o="";t.user_voted&&(o=" title='"+I18n.t("voting.voted")+"'");var s=t.user_voted?" voted":"";return e.push("<span class='list-vote-count discourse-tag"+s+"'"+o+">"),e.push(I18n.t("voting.votes",{count:t.vote_count})),e.push("</span>"),0<e.length?e.join(""):void 0}},{priority:-100});var e}),(0,e.withPluginApi)("0.8.30",function(t){return t.addCategorySortCriteria("votes")})}}});
//# sourceMappingURL=https://sjc3.discourse-cdn.com/business7/assets/plugins/discourse-voting-72050c04c4b5c357858a3dce3eecf3ea8e3df1855c02b9f9e85f276f423b997f.js.map