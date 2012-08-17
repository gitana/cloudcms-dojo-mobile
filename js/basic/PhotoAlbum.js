dojo.ready(function() {

    var cloudCMSContextConfigs = {
        "driver" : {
            "clientId" : "676e3450-6131-46c2-99cc-496aa2ad80fa",
            "clientSecret" : "5fGkvesH/tWEMX6SpevL54rY6iJK5ADzLH963sif2ljrWvFOhV2zXv6rSpLF2uMWlJ9SG0uEO9uQO4JZac0i7DZquA/5W8ixJwhj76g0Ksk="
        },
        "authentication" : {
            "username" : "demo",
            "password" : "demo"
        },
        "repository" : {
            "title" : "Westford Health Center Repository"
        },
        "error" : function(error) {
            //JSON.stringify(error);
        }
    };

    var view = new dojox.mobile.ScrollableView({
        id: "foo",
        selected: true
    }, "photo-album");
    view.startup();

    Gitana.Context.create(cloudCMSContextConfigs).then(function() {
        this.branch().readNode('whc:aboutus').then(function() {
            var images = [];
            this.listAttachments(true).each(function() {
                if (this.getId() && this.getId().indexOf('photo') == 0) {
                    images.push({
                        "src" : this.getDownloadUri()
                    });
                }
            }).then(function() {
                var store = new dojo.store.Memory({
                    id : "store",
                    data: images
                });
                var carousel = new dojox.mobile.StoreCarousel({
                    height : "560px",
                    store : store,
                    numVisible : 1,
                    title : "Photo Gallery",
                    selectable : false
                });
                view.addChild(carousel);
            });
        });
    });
});
