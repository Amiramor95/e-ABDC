var KoolReport = KoolReport || {};
KoolReport.dashboard = KoolReport.dashboard || {};
KoolReport.dashboard.widgets = KoolReport.dashboard.widgets || {};
KoolReport.dashboard.widgets.table = KoolReport.dashboard.widgets.table || function(name,options){
    this.options = options;
    this.name = name;
    this.initPaging();
};

KoolReport.dashboard.widgets.table.prototype = {
    options:null,
    name:null,
    toggleSorting:function(fieldName) {
        showLoader();
        KoolReport.dashboard.dboard.widgetAction(this.name,"sorting",{fieldName:fieldName});
    },
    goPage:function(index) {
        showLoader();
        KoolReport.dashboard.dboard.widgetAction(this.name,"paging",{index:index});
    },
    initPaging:function()
    {
        if(this.options.paging==null) return;
        var _nav = $('#'+this.name+' nav');
        _nav.empty();
        var _ul = $("<ul class='pagination'></ul>");
        _nav.append(_ul);

        //Previous button
        var _prev = $("<li class='page-item'><a class='page-link' href='#'>&laquo;</a></li>");
        if(this.options.paging.pageIndex<=0)
        {
            _prev.addClass("disabled");
            _prev.find("a").prop("href","javascript:void(0)");
        }
        else
        {
            _prev.find("a").prop("href","javascript:"+this.name+".goPage("+(this.options.paging.pageIndex-1)+")");
        }
        _ul.append(_prev);
        //Middle

        var start = Math.floor(this.options.paging.pageIndex/5)*5;
        var end = (start+5>this.options.paging.pageCount)?this.options.paging.pageCount:(start+5);

        if(start>0)
        {
            var _first = $("<li class='page-item'><a class='page-link'>1</a><li>");
            _first.find("a").prop("href","javascript:"+this.name+".goPage(0)");
            var _start = $("<li class='page-item'><a class='page-link'>...</a><li>");
            _start.find("a").prop("href","javascript:"+this.name+".goPage("+(start-5)+")");
            _ul.append(_first);
            _ul.append(_start);
        }

        for(var i=start;i<end;i++)
        {
            var _li = $("<li class='page-item'><a class='page-link'></a><li>");
            _li.find("a").text(i+1);
            if(i==this.options.paging.pageIndex)
            {
                _li.addClass("active");
                _li.find("a").prop("href","javascript:void(0)");
            }
            else
            {
                _li.find("a").prop("href","javascript:"+this.name+".goPage("+i+")");
            }
            _ul.append(_li);
        }
        if(end<this.options.paging.pageCount)
        {
            var _end = $("<li class='page-item'><a class='page-link'>...</a><li>");
            _end.find("a").prop("href","javascript:"+this.name+".goPage("+end+")");
            var _last = $("<li class='page-item'><a class='page-link'></a><li>");
            _last.find("a").text(this.options.paging.pageCount).prop("href","javascript:"+this.name+".goPage("+(this.options.paging.pageCount-1)+")");
            _ul.append(_end);
            _ul.append(_last);
        }


        //Next button
        var _next = $("<li class='page-item'><a class='page-link' href='#'>&raquo;</a></li>");
        if(this.options.paging.pageIndex >= this.options.paging.pageCount-1)
        {
            _next.addClass("disabled");
            _next.find("a").prop("href","javascript:void(0)");
        }
        else
        {
            _next.find("a").prop("href","javascript:"+this.name+".goPage("+(this.options.paging.pageIndex+1)+")");
        }
        _ul.append(_next);
    }
};