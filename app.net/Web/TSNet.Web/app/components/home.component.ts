﻿import { Component } from '@angular/core';
import { NvD3Component } from "ng2-nvd3";
import { Constants } from '../app.constants';
import { setTimeout } from 'core-js';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: 'home.component.html'
})

export class HomeComponent {


    nodeNumber = null;
    treeData = [];
    data = null;

    constructor() {

    }

    test() {
        console.log(this.treeData);
        this.setUpTreeview(this.treeData);
    }

    ngOnInit() {

         

        var nodeJs = {
            "name": "",
            "searchName":"",
            "resources":[],
            "parent": "null",
            "children": []
        };

        //web3

        let sn = web3.eth.contract(Constants.semanticNetABI).at(Constants.semantiNetContractAddress);
        var self = this;
        var index = 0;

        self.data = setupTreeFromBlockchain(nodeJs, index);
        self.treeData.push(self.data);
        
        //setTimeout( ()=> {
            
        //}, 3000);
       

        //this.setUpTreeview(this.treeData);
       // console.log(treeData);

      function setupTreeFromBlockchain(treeNode, index) {

            sn.getNodeJson(index, function (err, result) {
                if (err) {
                    console.log(err);
                }
                console.log(JSON.stringify(result));


                treeNode.name = index + "->" + result[0];
                treeNode.searchName = result[0] + "+Blockchain";
                var children = result[3].split(",");
                children = children.filter((s) => s != "");

                for (var child in children) {

                    var childNode = setupTreeFromBlockchain({
                        "name": "",
                        "resources": [],
                        "parent": treeNode.name,
                        "children": []
                    }, children[child]);



                    treeNode.children.push(childNode);

                    
                }

          });

          //var newObject = $.extend(true, {}, treeNode);
          //var updatedData = [newObject];

          //self.setUpTreeview(updatedData);
         
          return treeNode;
        }
     

        //var treeData = [
        //    {
        //        "name": "Top Level",
        //        "parent": "null",
        //        "children": [
        //            {
        //                "name": "Level 2: A",
        //                "parent": "Top Level",
        //                "children": [
        //                    {
        //                        "name": "Son of A",
        //                        "parent": "Level 2: A"
        //                    },
        //                    {
        //                        "name": "Daughter of A",
        //                        "parent": "Level 2: A"
        //                    }
        //                ]
        //            },
        //            {
        //                "name": "Level 2: B",
        //                "parent": "Top Level"
        //            }
        //        ]
        //    }
        //];


         





    }

    setUpTreeview(treeData: any) {
        // ************** Generate the tree diagram	 *****************
        var margin = { top: 20, right: 120, bottom: 20, left: 120 },
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function (d:any) { return [d.y, d.x]; });

        var svg = d3.select("svg")
            .attr("width", width + margin.right + margin.left)
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
            nodes.forEach(function (d:any) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function (d:any) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d:any) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function (d:any) { return d._children ? "lightsteelblue" : "#fff"; });

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
                .attr("x", -20)
                .attr("y", 30)
                .style("fill", "black")
                .on("click", openLink)
                .html("&#9432;More info ");
               // .text();



            nodeEnter.append("text")
                .attr("x", function (d:any) { return d.children || d._children ? -13 : 13; })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d:any) { return d.children || d._children ? "end" : "start"; })
                .text(function (d:any) { return d.name; })
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
                .attr("transform", function (d:any) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 10)
                .style("fill", function (d:any) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d:any) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function (d:any) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d:any) {
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
                .attr("d", function (d:any) {
                    var o = { x: source.x, y: source.y };
                    return diagonal({ source: o, target: o });
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d:any) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }


        function openLink(d:any) {
            window.open("https://www.google.bg/search?q=" + d.searchName, '_blank');
        }

        //// Toggle children on click.
        function click(d:any) {
            console.log(d);
            //if (d.children) {
            //    d._children = d.children;
            //    d.children = null;
            //} else {
            //    d.children = d._children;
            //    d._children = null;
            //}
            //update(d:any);
        }
    }

}
