import { Component, ChangeDetectorRef } from '@angular/core';
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
    dfsNode = null;

    modalTitle = "modal";
    resources = "";
    googleSearch = "";
    nodeVotes = 0;

    lastlySelectedNode = null;
    sn = null;
    newNodeName = null;
    deleteNodeName = null;
    deleteAvailable = null;
    //nodesCount = 0;
    nodeJs = {
        "creator":"",
        "number": 0,
        "name": "",
        "searchName": "",
        "resources": [],
        "parent": "null",
        "parentNumber": null,
        "children": [],
        "votes": 0
    };

    web3DefaultAccount = null;

    tree = null;
    root = null;
    svg = null;
    d3Index = null;
    duration = null;
    diagonal = null;
    treeMaxDepth = 0;


    constructor(private ref: ChangeDetectorRef) {

       
    }

    test() {
        //console.log(this.treeData);
        //this.setUpTreeview(this.treeData);

        //this.dfs(this.data, 3);
        //console.log(this.dfsNode);

        //this.dfs(this.data, 2);
        //console.log(this.dfsNode);
    }

    ngAfterContentInit() {
        window.setTimeout(() => {
            this.setUpTreeview(this.treeData);
            $("#loading").hide();
        }, 5000);

        //window.setTimeout(() => {
        //    this.setUpTreeview(this.treeData);
        //}, 5000);

    }

    ngOnInit() {
        if (typeof web3 === 'undefined') {
            window.alert('No web3? Please use google chrome and metamask plugin to enter this Dapp!');
            return;
        }

        $("#loading").show();
        self = this;

      
        //web3
        this.sn = web3.eth.contract(Constants.semanticNetABI).at(Constants.semantiNetContractAddress);

        this.web3DefaultAccount = web3.eth.defaultAccount;

        this.data = this.setupTreeFromBlockchain(this.nodeJs, 0);
        this.treeData.push(self.data);

    }

    dfs(node, index) {
        if (node.number == index.toString()) {
            this.dfsNode = node;
        } else {
            if (node.children) {
                for (var i = 0; i < node.children.length; i++) {
                    
                    this.dfs(node.children[i], index);
                }
            }

        }
    }

    fillNodeData(treeNode, result, index) {

        treeNode.creator = result[1].toLowerCase();
        treeNode.name = result[0];
        //treeNode.graphName = index + result[0];
        treeNode.searchName = result[0] + "+Blockchain";
        treeNode.number = index;
        treeNode.votes = result[4];
        var resources = result[2].split(',').filter((s) => s != "");
        if (resources.length) {
            treeNode.resources = treeNode.resources.concat(resources);
        }
    }

    setupTreeFromBlockchain(treeNode, index) {

        self.sn.getNodeJson(index, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(JSON.stringify(result));
            //self.nodesCount++;
           

            self.fillNodeData(treeNode, result, index);


            var children = result[3].split(",");
            children = children.filter((s) => s != "" && s != undefined && s != null);

            for (var child in children) {

                var childNode = self.setupTreeFromBlockchain({
                    "name": "",
                    "resources": [],
                    "parent": treeNode.name,
                    "parentNumber": treeNode.number,
                    "children": []
                }, children[child]);



                treeNode.children.push(childNode);


            }

        });

        return treeNode;
    }

    setUpTreeview(treeData: any) {

        $("svg").html("");
        $("#modal-windows").html("");
        // ************** Generate the tree diagram	 *****************
        var goodLen = treeData[0].children.length * 25;

        var margin = { top: 20, right: 120, bottom: 20, left: 120 },
            width = 960 - margin.right - margin.left,
            //height = 650 - margin.top - margin.bottom;
            height = goodLen < 650 ? 650 : goodLen;
       
        //$("#treeTerms").height(goodLen < 650 ? 650 : goodLen);

        self.d3Index = 0;
        self.duration = 750;


        self.tree = d3.layout.tree()
            .size([height, width]);

        self.diagonal = d3.svg.diagonal()
            .projection(function (d: any) { return [d.y, d.x]; });

        self.svg = d3.select("svg")
            //.attr("width", width + margin.right + margin.left)
            //.attr("height", height + margin.top + margin.bottom)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        self.root = treeData[0];
        self.root.x0 = height / 2;
        self.root.y0 = 0;

        self.update(self.root);

        // d3.select(self.frameElement).style("height", "500px");











    }

    addResource() {
        //self.lastlySelectedNode = node;
        $("#input-trigger").click();

        event.stopPropagation();
    }

    createResourceListItem(ipfsHash, contentType, index) {
        return `<li class="list-group-item d-flex justify-content-between align-items-center" >
                                <a href='https://ipfs.io/ipfs/${ipfsHash}' target='_blank'>Open resource ${index + 1}</a>
                                    <span class="badge badge-primary badge-pill" >${contentType}</span>
                                        </li>`
    }

    setupNodeResources(node) {
        var body = node.resources.map((s) => s.split('-')).map(function (r, index) {
            return self.createResourceListItem(r[0], r[1], index);
        }).join("");

        self.resources = body ? body : "No uploaded resources!";
    }

    //// Toggle children on click.
    click(node: any) {
        console.log(node);
        self.modalTitle = "Actions related to node: " + node.name;
        self.lastlySelectedNode = node;
        self.deleteAvailable = node.creator == self.web3DefaultAccount && (!node.children || node.children.length === 0);
        self.setupNodeResources(node);
        self.googleSearch
            = `<a href='https://www.google.bg/search?q=${node.searchName}' target='_blank'>Fast google search for the term</a>`;
        self.nodeVotes = node.votes;

        self.ref.detectChanges();
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

    vote(positive) {

        self.sn.vote(positive, self.lastlySelectedNode.number, function (err, trxHash) {
            if (err) {
                console.log(err);
            }

            if (positive) {
                self.lastlySelectedNode.votes++;
            } else {
                self.lastlySelectedNode.votes--;
            }

            console.log(JSON.stringify(trxHash));
        });

        event.stopPropagation();
    }

    //openLink(node: any) {
    //      window.open("https://www.google.bg/search?q=" + node.searchName, '_blank');

    //      event.stopPropagation();
    //  }

    update(source) {

        var lastDepth = self.treeMaxDepth;

        // Compute the new tree layout.
        var nodes = self.tree.nodes(self.root).reverse(),
            links = self.tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d: any) {
            if (d.depth > self.treeMaxDepth) {
                self.treeMaxDepth = d.depth;
            }
            d.y = d.depth * 180;
        });

        // Update the nodes…
        var node = self.svg.selectAll("g.node")
            .data(nodes, function (d: any) { return d.id || (d.id = ++self.d3Index); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d: any) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", self.click);



        node.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .style("font-size", "2")
            //.on("click", addResource)
            .html(function (d) {
                return d.number;
            });




        nodeEnter.append("foreignObject")
            //.attr("x", function (d: any) { return d.children || d._children ? -20 : 20; })
            .attr("y", -10)
            .attr("dy", ".35em")
            .style("font-size", "15")
            .attr("text-anchor", function (d: any) { return d.children || d._children ? "end" : "start"; })
            .html(function (d: any) {
                return `<button class="btn btn-primary btn-xs"  type="button">
          <span class="badge" style="position: inherit;">${d.number}</span> ${d.name}
        </button>`;
            })
            .style("color", "#000");


        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(self.duration)
            .attr("transform", function (d: any) { return "translate(" + d.y + "," + d.x + ")"; });


        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(self.duration)
            .attr("transform", function (d: any) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = self.svg.selectAll("path.link")
            .data(links, function (d: any) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d: any) {
                var o = { x: source.x0, y: source.y0 };
                return self.diagonal({ source: o, target: o });
            });

        // Transition links to their new position.
        link.transition()
            .duration(self.duration)
            .attr("d", self.diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(self.duration)
            .attr("d", function (d: any) {
                var o = { x: source.x, y: source.y };
                return self.diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d: any) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        //var goodLen = self.data.children.length*100;
        //$("#treeTerms").height(goodLen < 650 ? 650 : goodLen);


        if (lastDepth < self.treeMaxDepth) {
           // $("#treeTerms").width($("#treeTerms").width() + ($("#treeTerms").width()/lastDepth));
            $("#treeTerms").width((self.treeMaxDepth + 1) * 250);
            $("#treeTerms").height($("#treeTerms").height()*1.1);
        }
    }

    deleteNode() {

        if (self.deleteNodeName != self.lastlySelectedNode.name) {
            alert("You are trying to delete wrong node!");
            return;
        }

        self.sn.removeNode(self.lastlySelectedNode.parentNumber, self.lastlySelectedNode.number, function (err, trxHash) {
            if (err) {
                console.log(err);
                return;
            }
            $("#loading").show();
            
            console.log(JSON.stringify(trxHash));
            $('#exampleModal').modal('hide');

            var intervals = 0;

            self.sn.nodeNumber(function (err, result) {
                var nodesCount = result;

                window.setTimeout(() => {
                    self.dfs(self.data, self.lastlySelectedNode.parentNumber);
                    for (var i = 0; i < self.dfsNode.children.length; i++) {
                        if (self.dfsNode.children[i].number == self.lastlySelectedNode.number) {
                            self.dfsNode.children.splice(i, 1);
                            break;
                        }
                    }

                    self.update(self.dfsNode);
                    $("#loading").hide();

                },10000);
            });





        });
    }

    addNode() {

        self.sn.addNode(self.lastlySelectedNode.number, self.newNodeName, function (err, trxHash) {
            if (err) {
                console.log(err);


            }
            $("#loading").show();
            var parentNumber = self.lastlySelectedNode.number;
            console.log(JSON.stringify(trxHash));
            $('#exampleModal').modal('hide');

            var intervals = 0;

            self.sn.nodeNumber(function (err, result) {
                var nodesCount = result;

                window.setTimeout(() => {
                    var sampleInterval = window.setInterval(myTimer, 6000);

                    function myTimer() {

                        if (intervals >= 15) {
                            stopInterval();
                            return;
                        }

                        intervals++;

                        self.sn.nodeNumber(function (err, result) {
                            var newNodesCount = result;

                            if (newNodesCount > nodesCount) {

                                self.sn.getNodeJson(nodesCount, function (err, result) {

                                    if (err) {
                                        console.log(err);
                                        return;
                                    }
                                    stopInterval();
                                    console.log(JSON.stringify(result));
                                    //self.nodesCount++;


                                    var newNode = {
                                        "name": "",
                                        "resources": [],
                                        "parent": self.lastlySelectedNode.name,
                                        "parentNumber": parentNumber,
                                        "children": []
                                    };

                                    self.fillNodeData(newNode, result, nodesCount);
                                    self.dfs(self.data, self.lastlySelectedNode.number);
                                    if (!self.dfsNode.children) {
                                        self.dfsNode.children = [];
                                    }
                                    self.dfsNode.children.push(newNode);
                                    self.update(self.dfsNode);
                                    //self.lastlySelectedNode.children.push(newNode);
                                   // self.update(self.lastlySelectedNode);
                                    self.newNodeName = "";
                                });

                            }
                        });


                    }

                    function stopInterval() {
                        $("#loading").hide();
                        window.clearInterval(sampleInterval);
                    }

                }, 6000);
            });





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

                for (var i = 0; i < result.length; i++) {
                    self.lastlySelectedNode.resources.push(result[i].hash + "-" + result[i].contentType);
                }

                self.setupNodeResources(self.lastlySelectedNode);

                var hashes = result.map((s) => s.hash).join();
                var types = result.map((s) => s.contentType).join();;
                //for (var i = 0; i < result.length; i++) {

                //}

                self.sn.addResources(self.lastlySelectedNode.number, result.length, hashes, types, function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    console.log(JSON.stringify(result));
                });

            }
        };
        xhr.send(fd);

    };

}
