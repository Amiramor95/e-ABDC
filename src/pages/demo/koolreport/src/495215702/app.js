var KoolReport = KoolReport || {};
KoolReport.dashboard = KoolReport.dashboard || {
    contact: function (route, action, params, state) {
        var data = {
            request: {
                route: route,
                action: action,
                params: params
            }
        };
        if (state) {
            data.state = state;
        }
        $.ajax({
            method: "POST",
            data: data,
            async: true,
            dataType: "json",
        }).done(function (response) {
            for (var id in response.panels) {
                switch(response.panels[id][1])
                {
                    case null:
                    case "fade":
                        $('ajaxpanel#ajp' + id + '> div').fadeOut("fast", function () {
                            var aid = $(this).parent().attr("id").substr(3);
                            $('ajaxpanel#ajp' + aid).html("<div style='visibiliy:hidden'>" + response.panels[aid][0] + "</div>");
                            $('ajaxpanel#ajp' + aid + '> div')
                            .css("visibility", "visible")
                            .css("display", "none")
                            .fadeIn();
                        });
                        break;
                    case "none":
                    default:
                        $('ajaxpanel#ajp' + id).html("<div>" + response.panels[id][0] + "</div>");
                        break;
                }
            }
            response.scripts.forEach(function (script) {
                var func = new Function(script);
                func();
            });
            setTimeout(function(){
                showLoader(false);
                Ladda.stopAll();    
            },500);
        });
    },
    loginPage: {
        login: function (event) {
            event.preventDefault();
            showLoader();
            KoolReport.dashboard.contact("App/Login", "login", {
                username: $("#loginPage #username").val(),
                password: $("#loginPage #password").val(),
            });
            return false;
        },
        logout: function () {
            showLoader();
            KoolReport.dashboard.contact("App/Login", "logout");
        }
    },
    headerTitle:function(title) {
        document.title = title;
    },
    mainPage: {
        navMove: function (a) {
            KoolReport.dashboard.contact("App/Main", "move", {
                to: $(a).attr("href").substr(1)
            });
            $("div.sidebar ul.nav a.active").removeClass("active");
            $(a).addClass("active");
            KoolReport.dashboard.mainPage.breadcrumb(JSON.parse($(a).attr("data-path")));
            $("#Main_Breadcrumb > li.active").html("<i class='fa fa-spin fa-spinner'></i>");
        },
        loadDashboard: function (name, params) {
            KoolReport.dashboard.contact("App/Main/" + name, "index", params);
            var a = $("a[href$='" + name + "']");
            if (a.length > 0) {
                $("div.sidebar ul.nav a.active").removeClass("active");
                $(a).addClass("active");
                KoolReport.dashboard.mainPage.breadcrumb(JSON.parse($(a).attr("data-path")));
                $("#Main_Breadcrumb > li.active").html("<i class='fa fa-spin fa-spinner'></i>");
            }
        },
        breadcrumb: function (data) {
            $("#Main_Breadcrumb").empty();
            data.forEach(function (value) {
                $("#Main_Breadcrumb").append($("<li class='breadcrumb-item'>" + value + "</li>"));
            });
            $("#Main_Breadcrumb > li:last-child").addClass("active");
        },
        selectMenuItem: function (name) {
            //Auto select the dashboard, postion scrolling sidebar
            var alink = $("div.sidebar ul.nav a[href='#" + name + "']");
            if (alink.hasClass("active") === false) {
                alink.addClass("active");
                if (alink.parent().parent().hasClass("nav-dropdown-items")) {
                    alink.parent().parent().parent().addClass("open");
                }
            }
            KoolReport.dashboard.mainPage.breadcrumb(JSON.parse($(alink).attr("data-path")));
        },
        init: function () {
            mimic_resize = false;

            function resizeBroadcast() {

                var timesRun = 0;
                var interval = setInterval(function () {
                    timesRun += 1;

                    if (timesRun === 5) {
                        clearInterval(interval);
                    }
                    mimic_resize = true;
                    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
                        var evt = document.createEvent('UIEvents');
                        evt.initUIEvent('resize', true, false, window, 0);
                        window.dispatchEvent(evt);
                    } else {
                        window.dispatchEvent(new Event('resize'));
                    }
                    if (timesRun === 5) {
                        mimic_resize = false;
                    }

                }, 62.5);
            }
            $(window).on('resize', function () {
                if (mimic_resize === false) {
                    resizeBroadcast();
                }
            });

            $('.sidebar-toggler').click(function () {
                $('#Main').toggleClass('sidebar-hidden');
                resizeBroadcast();
            });
            $('.mobile-sidebar-toggler').click(function () {
                $('#Main').toggleClass('sidebar-mobile-show');
                resizeBroadcast();
            });
            // Dropdown Menu
            $.navigation = $('nav > ul.nav');
            $.navigation.on('click', 'a', function (e) {

                if ($.ajaxLoad) {
                    e.preventDefault();
                }

                if ($(this).hasClass('nav-dropdown-toggle')) {
                    $(this).parent().toggleClass('open');
                    resizeBroadcast();
                }
            });
            KoolReport.dashboard.mainPage.selectMenuItem(
                KoolReport.dashboard.dboard.getName()
            );
        }
    },
    dboard: {
        name: null,
        state: null,
        label: null,
        start: function (name, label) {
            KoolReport.dashboard.dboard.name = name;
            var state = {};
            state[name] = {};
            KoolReport.dashboard.dboard.state = state;
            KoolReport.dashboard.dboard.setLabelInBreadscrumb(label);
            window.scrollTo(0, 0);
            //Minic resize
            mimicResize();
        },
        setState: function (dashboardState)
        {
            KoolReport.dashboard.dboard.state[KoolReport.dashboard.dboard.getName()] = dashboardState;
        },
        saveState: function (key, value) {
            KoolReport.dashboard.dboard.state[KoolReport.dashboard.dboard.getName()][key] = value;
        },
        getName: function () {
            return KoolReport.dashboard.dboard.name;
        },
        widgetAction: function (widgetName, action, params) {
            //Add state to command
            KoolReport.dashboard.contact(
                "App/Main/" + KoolReport.dashboard.dboard.getName() + "/" + widgetName,
                action,
                params,
                KoolReport.dashboard.dboard.state
            );
        },
        submit: function()
        {
            KoolReport.dashboard.contact(
                "App/Main/" + KoolReport.dashboard.dboard.getName(),
                "index",
                null,
                KoolReport.dashboard.dboard.state
            );
        },
        setLabelInBreadscrumb: function (label) {
            $("#Main_Breadcrumb li.active").text(label);
        }
    }
};

//Short functions
function saveState(key, value) {
    KoolReport.dashboard.dboard.saveState(key, value);
}

function updateWidget(widgetName) {
    KoolReport.dashboard.dboard.widgetAction(widgetName, null, null);
}

function autoUpdate(widgetName, milliseconds) {
    setTimeout(function () {
        updateWidget(widgetName);
    },
        milliseconds);
}

function boardSubmit()
{
    KoolReport.dashboard.dboard.submit();
}

function widgetAction(widgetName, action, params) {
    KoolReport.dashboard.dboard.widgetAction(widgetName, action, params);
}

function navMove(a) {
    KoolReport.dashboard.mainPage.navMove(a);
}

function loadDashboard(name, params) {
    KoolReport.dashboard.mainPage.loadDashboard(name, params);
}

function logout() {
    KoolReport.dashboard.loginPage.logout();
}

function traces_toggle(a)
{
    if($(a).next().hasClass("d-none")) {
        $(a).next().removeClass("d-none");
        $(a).html("<i class='far fa-minus-square'></i> Collapse");
    } else {
        $(a).next().addClass("d-none");
        $(a).html("<i class='far fa-plus-square'></i> Expand");
    }
}

function showLoader(bool)
{
    if(bool!==false) {
        if($("div.loader").is(":visible")===false) {
            $("div.loader").fadeIn();
        }
    } else {
        if($("div.loader").is(":visible")===true) {
            $("div.loader").fadeOut();
        }
    }
}
function mimicResize()
{
    if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
    } else {
        window.dispatchEvent(new Event('resize'));
    }
}

$(document).ready(function () {
    setTimeout(function () {
        var sidebar_length = $('nav.sidebar-nav').height();
        var active_link_offset = $('a.nav-link.active').offset();
        if (active_link_offset) {
            $('nav.sidebar-nav').scrollTop(active_link_offset.top - sidebar_length / 2);
        }
    }, 150);
});

