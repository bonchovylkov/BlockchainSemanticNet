import { Component } from '@angular/core';
import { NvD3Component } from "ng2-nvd3";
import { Constants } from '../app.constants';
import { setTimeout, log } from 'core-js';


var self;

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {


    nodeNumber = null;
    treeData = [];
    data = null;
    modalTitle = "modal";
    lastlySelectedNode = null;
    sn = null;
    newNodeName = null;
    nodeJs = {
        "number": 0,
        "name": "",
        "searchName": "",
        "resources": [],
        "parent": "null",
        "children": [],
        "votes": 0
    };

    constructor() {

    }

    test() {
        console.log(this.treeData);
        this.setUpTreeview(this.treeData);

    }

    ngAfterContentInit() {
        window.setTimeout(() => {
            this.setUpTreeview(this.treeData);
        }, 2000);

        //window.setTimeout(() => {
        //    this.setUpTreeview(this.treeData);
        //}, 5000);
     
    }

    ngOnInit() {

        self = this;
        //web3
        this.sn = web3.eth.contract(Constants.semanticNetABI).at(Constants.semantiNetContractAddress);
        this.data = this.setupTreeFromBlockchain(this.nodeJs, 0);
        this.treeData.push(self.data);

        



    }

     setupTreeFromBlockchain(treeNode, index) {

        self.sn.getNodeJson(index, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(JSON.stringify(result));


            treeNode.name = index + "->" + result[0];
            treeNode.searchName = result[0] + "+Blockchain";
            treeNode.number = index;
            treeNode.votes = result[4];
            var resources = result[2].split(',').filter((s) => s != "");
            if (resources.length) {
                treeNode.resources = treeNode.resources.concat(resources);
            }


            var children = result[3].split(",");
            children = children.filter((s) => s != "");

            for (var child in children) {

                var childNode = self.setupTreeFromBlockchain({
                    "name": "",
                    "resources": [],
                    "parent": treeNode.name,
                    "children": []
                }, children[child]);



                treeNode.children.push(childNode);


            }

    });



    //if (treeNode.parent === "null") {
    //    var newObject = $.extend(true, {}, treeNode);
    //    var updatedData = [newObject];

    //    self.setUpTreeview(updatedData);
    //}

    return treeNode;
}

    setUpTreeview(treeData: any) {

        $("svg").html("");
        $("#modal-windows").html("");
        // ************** Generate the tree diagram	 *****************
        var margin = { top: 20, right: 120, bottom: 20, left: 120 },
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;
        //var margin = { top: 100, right: 50, bottom: 100, left: 50 },
        //    width = 900 - margin.left - margin.right,
        //    height = 500 - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function (d: any) { return [d.y, d.x]; });

        var svg = d3.select("svg")
            //.attr("width", width + margin.right + margin.left)
            //.attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

        root = treeData[0];
        root.x0 = height / 2;
        root.y0 = 0;

        update(root);

        // d3.select(self.frameElement).style("height", "500px");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function (d: any) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function (d: any) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d: any) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);

            

            //nodeEnter.append("circle")
            //    .attr("r", 1e-3)
            //    .style("fill", function (d: any) { return d._children ? "lightsteelblue" : "#fff"; });
                //.html("<span class='glyphicon'>&#x2b;</span>");


            //node.append("text")
            //        .attr("x", -4)
            //    .attr("y", 4)
            //    .attr("width", 24)
            //    .attr("height", 24)
            //    .html("&#x2b;");

            //node.append("a")
            //    .attr("xlink:href", function (d: any) { return  "https://www.google.bg/search?q=" + d.searchName; })
            //    //.text(function (d: any) { return d.name; })
            //    //
            //    //.attr("text", "test")
            //    //.attr("width", 16)
            //    //.attr("height", 16)
            //    .append("rect")
            //    .attr("x", -30)
            //    .attr("y", 20)
            //    .attr("height", 35)
            //    .style("fill", "green")
            //    .attr("width", 66)


            node.append("text")
                .attr("x", 0)
                .attr("y", 30)
                .style("fill", "black")
                .style("font-weight", "bold")
                .on("click", openLink)
                .html("&#9432; More info ");

            node.append("text")
                .attr("x", 0)
                .attr("y", 42)
                .style("fill", "black")
                .style("font-weight", "bold")
                .on('click', function (d,i) {
                    $("#resources-" + i).modal('show');
                    event.stopPropagation();
                })
                //.on('mouseout', function (d, i) {
                //    $("#resources-" + i).hide();
                //})
                .html("&#x26C3; IPFS Resources");

            node.append("foreignObject")
               // .attr("x", 0)
                //.attr("y", 42)
                //.attr("width", 480)
                //.attr("height", 500)
                .append("xhtml:body")
                //.style("font", "14px 'Helvetica Neue'")
                //.html(function (d: any,i:any) {
                //    return " <div id='resources-" + i + "' style='display:none'>IPFS Resources "+ d.resources.join() + "</div>";
                //});
                .html(function (d: any, i: any) {
                    var body = d.resources.map((s) => s.split('-')).map(function (r,index) {
                        return `<li class="list-group-item d-flex justify-content-between align-items-center" >
                            <a href='https://ipfs.io/ipfs/${r[0]}' target='_blank'>Open resource ${index+1}</a>
                                <span class="badge badge-primary badge-pill" >${r[1]}</span>
                                    </li>`
                    }).join("");

                    var result = `<div id="resources-${i}" class="modal "  role="dialog" >
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="resourcesTitle-${i}">Resources for ${d.name}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <ul class="list-group">
                    ${body}
                </ul>
            </div>
        </div>
    </div>
</div>`;
                    $("#modal-windows").append(result);
                    return "";
                });


            
            //

            node.append("text")
                .attr("x", -0)
                .attr("y", 54)
                .style("fill", "black")
                .style("font-weight", "bold")
                .on("click", addResource)
                .html("&#x2b; Add resource ");

            node.append("text")
                .attr("x", 0)
                .attr("y", -20)
                .style("font-size", "18")
                .on("click", function (d) { return vote(true, d.number) })
                .html("&#x25B2;");

            node.append("text")
                .attr("x", 23)
                .attr("y", -20)
                .style("font-size", "18")
                //.on("click", addResource)
                .html(function (d) {
                    return d.votes;
                });

            node.append("text")
                .attr("x", 40)
                .attr("y", -20)
                .style("font-size", "18")
                .on("click", function (d) { return vote(false, d.number ) })
                .html("&#x25BD;");


         
            // .text();



            nodeEnter.append("foreignObject")
                //.attr("x", function (d: any) { return d.children || d._children ? -20 : 20; })
                 .attr("y",-10)
                .attr("dy", ".35em")
                .attr("text-anchor", function (d: any) { return d.children || d._children ? "end" : "start"; })
                .html(function (d: any) { return "<span class='badge badge-primary'>" + d.name + " &#x2b;</span>"; })
                .style("color", "#000");

            //node.append("image")
            //    .attr("xlink:href", "https://github.com/favicon.ico")
            //    .attr("x", -8)
            //    .attr("y", -8)
            //    .attr("width", 16)
            //    .attr("height", 16);




            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d: any) { return "translate(" + d.y + "," + d.x + ")"; });

            //nodeUpdate.select("circle")
            //    .attr("r", 15)
            //    .style("fill", function (d: any) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d: any) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d: any) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d: any) {
                    var o = { x: source.x0, y: source.y0 };
                    return diagonal({ source: o, target: o });
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function (d: any) {
                    var o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d: any) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }


        function openLink(node: any) {
            window.open("https://www.google.bg/search?q=" + node.searchName, '_blank');

            event.stopPropagation();
        }

        function addResource(node: any) {
            self.lastlySelectedNode = node;
            $("#input-trigger").click();

            event.stopPropagation();
        }

        //// Toggle children on click.
        function click(node: any) {
            console.log(node);
            self.modalTitle = "Add new node to: " + node.name;
            self.lastlySelectedNode = node;

            $('#exampleModal').modal();
            //if (d.children) {
            //    d._children = d.children;
            //    d.children = null;
            //} else {
            //    d.children = d._children;
            //    d._children = null;
            //}
            //update(d:any);
        }

        function vote(positive, index) {

            self.sn.vote(positive, index, function (err, trxHash) {
                if (err) {
                    console.log(err);


                }

                console.log(JSON.stringify(trxHash));
            });

            event.stopPropagation();
        }
    }

    addNode() {

        self.sn.addNode(self.lastlySelectedNode.number, self.newNodeName, function (err, trxHash) {
         if(err){
             console.log(err);
             
             
         }

            console.log(JSON.stringify(trxHash));
            $('#exampleModal').modal('hide');
        });
    }

   

    change(e) {
        this.uploadCallback(e.currentTarget.files);
        e.currentTarget.value = "";
    };


    public uploadCallback(fileList: any) {

        var fd = new FormData();
        for (var i = 0; i < fileList.length; i++) {
            fd.append(fileList[i].name, fileList[i]);
        }

        this.uploadFile(fd, "/api/IPFS/addfiles");
           
        
    };

    public uploadFile(fd: any, url: string) {

        var self = this;
        var percentUploaded = 0;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        /* event listners */
        xhr.upload.addEventListener("progress", function (e) {

        }, false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var result = $.parseJSON(xhr.responseText);

                var hashes = result.map((s)=>s.hash).join();
                var types = result.map((s) => s.contentType).join();;
                //for (var i = 0; i < result.length; i++) {

                //}

                self.sn.addResources(self.lastlySelectedNode.number, result.length, hashes, types, function (err, result) {
                     if(err){
                         console.log(err);
                     }

                     console.log(JSON.stringify(result));
                 });
               
            }
        };
        xhr.send(fd);

    };

}
