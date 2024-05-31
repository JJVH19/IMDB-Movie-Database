// import the GraphClass definition from GraphClass.js
import GraphClass from './GraphClass.js';

// Author: Jose Juan Velasquez
// Description: This tool allows for users to view a graph of connections between movies
// from an IMDB movie dataset given. This allowed me to explore the principles of human computer interaction
// to implement in JavaScript an interactive IMDB Movie database tool,
// allowing for the user to edit, add or remove movies from the database and streamline user experience

let nodeAdded = false;
let text = 1;
let labelDisplay = 0;
const width = screen.width;
const height = screen.height;
let mode = 0;
let graphObjCopy = {
    nodes: [],
    edges: [],
    nodeDegrees: {}
};


//This function is dedicated to editing a selected node from the user as well as editing the actual database
function editNode(graphObj, d) {
    //enterEdit variable gets the user's prompt answer
    let enterEdit = prompt('What do you want to edit from this movie?' +
        '\nRank\nName\nID\nGenre\nCast Name\nDirector Name\nWriter Name\nDisconnect\nDelete');
    enterEdit = enterEdit.trim();

    //Make a copy of the actual node passed into the function
    let temp = d;

    //Makes a copy of the index position of the corresponding node we want to edit
    let index = 0;
    let copyIndex = 0;

    //Traverse the database to find the selected movie from the user
    for (let i = 0; i < graphObj.graph.nodes.length; i++) {
        //If we find the corresponding node the user wants to edit, store the index position into the index variable
        if (graphObj.graph.nodes[i].rank === d.rank &&
            graphObj.graph.nodes[i].name === d.name &&
            graphObj.graph.nodes[i].id === d.id &&
            graphObj.graph.nodes[i].cast_name === d.cast_name &&
            graphObj.graph.nodes[i].genre === d.genre &&
            graphObj.graph.nodes[i].director_name === d.director_name &&
            graphObj.graph.nodes[i].writter_name === d.writter_name) {
            index = i;
            break;
        }
    }

    //Manages the second mode which involves the largest connected component aspect of the tool
    if (mode === 1) {
        //Traverse the database to find the selected movie from the user
        for (let i = 0; i < graphObjCopy.nodes.length; i++) {
            //If we find the corresponding node the user wants to edit, store the index position into the copyIndex variable
            if (graphObjCopy.nodes[i].rank === d.rank &&
                graphObjCopy.nodes[i].name === d.name &&
                graphObjCopy.nodes[i].id === d.id &&
                graphObjCopy.nodes[i].cast_name === d.cast_name &&
                graphObjCopy.nodes[i].genre === d.genre &&
                graphObjCopy.nodes[i].director_name === d.director_name &&
                graphObjCopy.nodes[i].writter_name === d.writter_name) {
                copyIndex = i;
                break;
            }
        }
    }

    //
    let options = [];
    let optionsCopy = [];
    for (let i = 0; i < graphObj.graph.edges.length; i++) {
        if (graphObj.graph.edges[i].source === d.id) {
            options.push(graphObj.graph.edges[i].target)
        } else if (graphObj.graph.edges[i].target === d.id) {
            options.push(graphObj.graph.edges[i].source)
        }
    }
    if (mode === 1) {
        for (let i = 0; i < graphObjCopy.edges.length; i++) {
            if (graphObjCopy.edges[i].source === d.id) {
                optionsCopy.push(graphObjCopy.edges[i].target)
            } else if (graphObjCopy.edges[i].target === d.id) {
                optionsCopy.push(graphObjCopy.edges[i].source)
            }
        }
    }

    if (enterEdit === "rank" || enterEdit === "Rank") {
        let newEdit = prompt("Type in the rank you want to change or click cancel to exit", d.rank)
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            graphObj.graph.nodes.splice(index, 1);
            temp.rank = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.rank = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "ID" || enterEdit === "id") {
        let newEdit = prompt("Type in the ID you want to change or click cancel to exit", d.id)
        newEdit = newEdit.trim();
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            for (let i = 0; i < graphObj.graph.edges.length; i++) {
                if (graphObj.graph.edges[i].source === d.id) {
                    graphObj.graph.edges[i].source = newEdit;
                }
                if (graphObj.graph.edges[i].target === d.id) {
                    graphObj.graph.edges[i].target = newEdit;
                }
            }
            graphObj.graph.nodes.splice(index, 1);
            temp.id = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.id = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "Name" || enterEdit === "name") {
        let newEdit = prompt("Type in the name you want to change or click cancel to exit", d.name)
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            graphObj.graph.nodes.splice(index, 1);
            temp.name = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.name = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "Genre" || enterEdit === "genre") {
        let newEdit = prompt("Type in the genre you want to change or click cancel to exit", d.genre)
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            graphObj.graph.nodes.splice(index, 1);
            temp.genre = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.genre = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "Cast Name" || enterEdit === "cast name") {
        let newEdit = prompt("Type in the cast name(s) you want to change or click cancel to exit", d.cast_name)
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            graphObj.graph.nodes.splice(index, 1);
            temp.cast_name = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.cast_name = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "Director Name" || enterEdit === "director name") {
        let newEdit = prompt("Type in the director name(s) you want to change or click cancel to exit", d.director_name)
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            graphObj.graph.nodes.splice(index, 1);
            temp.director_name = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.director_name = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "Writer Name" || enterEdit === "writer name") {
        let newEdit = prompt("Type in the writer name(s) you want to change or click cancel to exit", d.writter_name)
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            graphObj.graph.nodes.splice(index, 1);
            temp.writter_name = newEdit.trim();
            graphObj.graph.nodes.push(temp);
            if (mode === 1) {
                graphObjCopy.nodes.splice(copyIndex, 1);
                temp.writter_name = newEdit.trim();
                graphObjCopy.nodes.push(temp);
            }
            renderGraph(graphObj)
        }
    } else if (enterEdit === "Disconnect" || enterEdit === "disconnect") {
        let names = [];
        let namesCopy = [];
        let display = [];

        for (let i = 0; i < options.length; i++) {
            for (let j = 0; j < graphObj.graph.nodes.length; j++) {
                if (graphObj.graph.nodes[j].id === options[i]) {
                    names.push({name: graphObj.graph.nodes[j].name, id: graphObj.graph.nodes[j].id});
                    break;
                }
            }
        }
        if (mode === 1) {
            for (let i = 0; i < optionsCopy.length; i++) {
                for (let j = 0; j < graphObjCopy.nodes.length; j++) {
                    if (graphObjCopy.nodes[j].id === optionsCopy[i]) {
                        namesCopy.push({name: graphObjCopy.nodes[j].name, id: graphObjCopy.nodes[j].id});
                        break;
                    }
                }
            }
        }

        for (let i = 0; i < names.length; i++) {
            display.push("\n" + names[i].name)
        }
        let disconnectEdges = prompt('These movies are connected to: ' + d.name + display + '\n' + '\nWhich of these movies do you want to disconnect?\n');
        disconnectEdges = disconnectEdges.trim();
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            for (let i = 0; i < names.length; i++) {
                if (names[i].name === disconnectEdges) {
                    disconnectEdges = names[i].id;
                    break;
                }
            }
            if (mode === 1) {
                for (let i = 0; i < namesCopy.length; i++) {
                    if (namesCopy[i].name === disconnectEdges) {
                        disconnectEdges = namesCopy[i].id;
                        break;
                    }
                }
            }
            for (let j = 0; j < graphObj.graph.edges.length; j++) {
                if (graphObj.graph.edges[j].source === disconnectEdges) {
                    graphObj.graph.edges.splice(j, 1);
                    //break;
                }
            }
            for (let j = 0; j < graphObj.graph.edges.length; j++) {
                if (graphObj.graph.edges[j].target === disconnectEdges) {
                    graphObj.graph.edges.splice(j, 1);
                    //break;
                }
            }
            if (mode === 1) {
                for (let j = 0; j < graphObjCopy.edges.length; j++) {
                    if (graphObjCopy.edges[j].source === disconnectEdges) {
                        graphObjCopy.edges.splice(j, 1);
                        //break;
                    }
                }
                for (let j = 0; j < graphObjCopy.edges.length; j++) {
                    if (graphObjCopy.edges[j].target === disconnectEdges) {
                        graphObjCopy.edges.splice(j, 1);
                        //break;
                    }
                }
            }
        }
        renderGraph(graphObj)
    } else if (enterEdit === "Delete" || enterEdit === "delete") {
        let confirmPrompt = confirm('Confirm or deny');
        if (confirmPrompt === true) {
            if (options.length === 0) {
                graphObj.graph.nodes.splice(index, 1);
                if (mode === 1 && optionsCopy.length === 0) {
                    graphObjCopy.nodes.splice(copyIndex, 1);
                }
                renderGraph(graphObj)
            } else {
                alert("You can only delete disconnected movies.")
            }

        }
    }
}

function detailsOnDemand(k) {
    document.getElementById("Poster").innerHTML ="<img src="+ k.large_img_link + "width=250 height=350>";
    document.getElementById("nameDisplay").innerHTML = "Movie Name: "+k.name
    document.getElementById("idDisplay").innerHTML = "Movie ID: "+k.id
    document.getElementById("rankDisplay").innerHTML ="Movie Rank: "+k.rank
    document.getElementById("year").innerHTML ="Year of Release: "+k.year
    document.getElementById("genreDisplay").innerHTML = "Genre: "+k.genre
    document.getElementById("imdbRating").innerHTML = "IMDB Rating: "+k.imdb_rating
    document.getElementById("dDisplay").innerHTML = "Director Name(s): "+k.director_name
    document.getElementById("totalDuration").innerHTML = "Total Duration: "+k.duration+" min"
}

function highlightEdges(node,link,k) {
    let connections;
    let currentNode = null;
    node.each(function(d) {
        if(d.id === k.id) {
            connections = link.filter(function (l) {
                return l.source.index === d.index || l.target.index === d.index
            });
            currentNode = {node: this, links: connections};
        }
    });
    d3.select(currentNode.node).select("circle")
        .style("fill", "red")
    currentNode.links.each(function() {
        d3.select(this).style("stroke", "red").style("stroke-width", 3);
    })
}

function renderGraph(graphObj) {
    console.log(graphObj)
    let layout = 1;
    let isHolding = false;
    let startNode = null;
    let holdTimer = null;
    d3.select("#graphviz svg").remove();

    const nodes = graphObj.graph.nodes.map(d => ({...d}));
    const links = graphObj.graph.edges.map(d => ({...d}));
    document.getElementById("searchbar").innerHTML = "";

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    defaultRender(nodes,links,ticked);

    document.getElementById("layout").addEventListener("click", function(){
        if(layout === 0){
            let simulation = defaultRender(nodes,links,ticked);
            layout = 1;
            simulation.restart();
        } else{
            let simulation = newRender(nodes,links,ticked)
            layout = 0;
            simulation.restart();
        }
    });

    // Create the SVG container.
    const svg = svgContainer(graphObj,nodes);

    //Create lines for each edge
    let link = linkCreator(svg,links);

    //Create circles for each node
    let node = svg.selectAll(".circle")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "circle")
        .append("circle")
        .attr("r", 12)
        .attr("fill", "lightblue")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .attr("id", d=>d.id)
        .on("mouseover", function(event,k){
            highlightEdges(node,link,k)
            detailsOnDemand(k);
        })
        .on("mouseout", function(){
            link.style("stroke", "gray").style("stroke-width",1);
        })
        .on("mousedown", function(event, d) {
            d3.select(this).attr("r", 17)
            isHolding = true;
            holdTimer = setTimeout(() => {
                if (isHolding) {
                    startNode = d;
                }
            }, 0);

        })
        .on("mouseup", function(event, d) {
            if (startNode === d) {
                editNode(graphObj,d);
            } else {
                d3.select(this).attr("r", 12)
                if (holdTimer) {
                    clearTimeout(holdTimer);
                }
                isHolding = false;
                let repeat = false;
                for (let i = 0; i < graphObj.graph.edges.length; i++) {
                    if (graphObj.graph.edges[i].source === startNode.id && graphObj.graph.edges[i].target === d.id) {
                        repeat = true;
                    }
                }
                if (repeat) {
                    alert("This edge already exists.")
                } else {
                    graphObj.graph.edges.push({source: startNode.id, target: d.id});
                    graphObj.graph.nodeDegrees[startNode.id] += 1;
                    graphObj.graph.nodeDegrees[d.id] += 1;
                    if (mode === 1) {
                        graphObjCopy.edges.push({source: startNode.id, target: d.id});
                        graphObjCopy.nodeDegrees[startNode.id] += 1;
                        graphObjCopy.nodeDegrees[d.id] += 1;
                    }
                    startNode = null;
                }
                renderGraph(graphObj)
            }
        })

    //Create title label for each node
    node.append("title")
        .text(function(d){
            return "RANK: "+d.rank+'\n'+"ID: "+d.id+'\n'+"NAME: "+d.name+'\n'+"YEAR OF RELEASE: "+d.year+'\n'+"IMDB RATING : "+d.imdb_rating+'\n'+"TOTAL DURATION: "+d.duration+' min\n'+"DIRECTOR NAME(S): "+d.director_name+'\n'+"GENRE: "+d.genre;
        })


    //Create text label for each node
    let labels = svg.selectAll(".labels")
        .data(nodes)
        .enter()
        .append("text")
        .attr("x",5)
        .attr("y",10)
        .attr("style","font-size:18")
        .attr("stroke","darkmagenta")
        .attr("id", function(d){
            return "t"+d.id;
        });

    if(text === 1){
        labels.text(d=>d.id.slice(-4))
            .attr("id", function(d){
                return "t" + d.id;
            });
    } else if(text === 2){
        labels.text(d=>d.name)
            .attr("id", function(d){
                return "t" + d.id;
            });
    } else if(text === 3){
        labels.text(d=>d.genre)
            .attr("id", function(d){
                return "t" + d.id;
            });
    }else if(text === 4){
        labels.text(d=>d.director_name)
            .attr("id", function(d){
                return "t" + d.id;
            });
    }


    // Set the position attributes of links, nodes and labels
    // each time the simulation ticks.
    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("cx", function (d) {
            return d.x = Math.max(20, Math.min(width - 20, d.x));
        })
            .attr("cy", function (d) {
                return d.y = Math.max(20, Math.min(height - 20, d.y));
            });

        labels.attr("x", function (d) {
            return d.x = Math.max(20, Math.min(width - 20, d.x + 10));
        })
            .attr("y", function (d) {
                return d.y = Math.max(20, Math.min(height - 20, d.y - 5));
            });

    }
}

function defaultRender(nodes,links,ticked){
    return d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(155))
        .force('charge', d3.forceManyBody().strength(-50))
        .force("collide", d3.forceCollide(35))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
}

function newRender(nodes,links,ticked){
    return d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(130))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force('x', d3.forceX().strength(0.05).x(width / 2))
        .force('y', d3.forceY().strength(0.05).y(height / 2))
        .on("tick", ticked);
}

function svgContainer(graphObj,nodes){
    return d3.select("#graphviz").append("svg")
        .attr("viewBox", '-270 0 ' + (screen.width+200) + " " + screen.height)
        .attr('width', '100%')
        .attr('height', '100%')
        .on("click", function(event){
            const coords = d3.pointer(event);
            let enterNodeName = prompt('Type the name of the node you want to add here or click cancel to exit.');
            if(enterNodeName !== null){
                while(nodes.some(e => e.id === enterNodeName.trim()) || enterNodeName.trim() === ""){
                    if(enterNodeName.trim() === ""){
                        enterNodeName = prompt('Please type the name of a node or click cancel to exit.');
                    } else if(nodes.some(e => e.id === enterNodeName.trim())) {
                        enterNodeName = prompt('Name already taken. Please choose another name or click cancel to exit.');
                    }
                }
                let confirmPrompt = confirm('Confirm or deny');
                if (confirmPrompt === true) {
                    if (nodeAdded) {
                        let prev = {id: nodes[nodes.length - 1].id};
                        nodes.pop();
                        graphObj.graph.nodes.pop();
                        graphObj.graph.nodes.push(prev);
                    }
                    const newNode = {
                        id: enterNodeName.trim(),// A unique ID for the new node
                        fx: coords[0],
                        fy: coords[1],
                        rank: graphObj.graph.nodes.length + 1,
                        name: enterNodeName.trim(),
                        year: "NA",
                        imbd_votes: "NA",
                        imdb_rating: "NA",
                        certificate: "NA",
                        duration: "NA",
                        genre: "NA",
                        cast_id: "NA",
                        cast_name: "NA",
                        director_id: "NA",
                        director_name: "NA",
                        writter_name: "NA",
                        writter_id: "NA",
                    };
                    graphObj.graph.nodes.push(newNode);
                    graphObj.graph.nodeDegrees[newNode.id] = 0;
                    if (mode === 1) {
                        graphObjCopy.nodes.push(newNode);
                        graphObjCopy.nodeDegrees[newNode.id] = 0;
                    }
                    nodeAdded = true;
                    renderGraph(graphObj);
                }
            }
        });
}

function linkCreator(svg,links){
    return svg.append("g")
        .style("stroke", "#999")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "gray")
        .style("stroke-width", ((d) => Math.sqrt(d.value)));
}
/*
    Function to fetch the JSON data from output_graph.json & call the renderGraph() method
    to visualize this data
*/
function loadAndRenderGraph(fileName) {
    fetch(fileName)
        .then(response => response.json())
        .then(data => {
            graphObj.graph = data;
            graphObjCopy = data;
            renderGraph(graphObj)
        }).catch(error => console.error('There was an error!', error));
}

/*
    A method to compute and display graph statistics
*/
function displayGraphStatistics(graphObj) {
    document.getElementById("computeStats").addEventListener("click", function(){
        if(mode === 0){
            document.getElementById("avgDegree").innerHTML = graphObj.computeAverageNodeDegree();
            document.getElementById("numComponents").innerHTML = graphObj.computeConnectedComponents();
            document.getElementById("graphDensity").innerHTML = graphObj.computeGraphDensity();
            document.getElementById("graphDiameter").innerHTML = graphObj.findGraphDiameter();
            document.getElementById("apl").innerHTML = graphObj.computeAPL();
        } else{
            document.getElementById("avgDegree").innerHTML = largest.computeAverageNodeDegree();
            document.getElementById("numComponents").innerHTML = largest.computeConnectedComponents();
            document.getElementById("graphDensity").innerHTML = largest.computeGraphDensity();
            document.getElementById("graphDiameter").innerHTML = largest.findGraphDiameter().toString();
            document.getElementById("apl").innerHTML = graphObj.computeAPL();
        }

    });
}

document.getElementById("search").onclick = function() {search_node()};

document.getElementById("text_display").addEventListener("click",function(){
    console.log(labelDisplay)
    if(labelDisplay%2 === 1){
        let selectElement = document.querySelector('#text_display');
        let output = selectElement.value;
        if(output === "id"){
            text = 1;
        }else if(output === "name"){
            text = 2;
        }else if(output === "genre"){
            text = 3;
        }else if(output === "director_name"){
            text = 4;
        }
        renderGraph(graphObj)
    }
    labelDisplay++;

});

function resetGraphSearch() {
    graphObj.graph.nodes.forEach(node => {
        let theNode = d3.select("#" + node.id);
        let theLabel = d3.select("#t" + node.id);
        theNode.attr("r", 12)
            .attr("fill", "lightblue");
        theLabel.attr("style", "font-size:18")
            .attr("stroke", "darkmagenta")
    })
}

function changeNode(node) {
    let theNode = d3.select("#" + node.id);
    let theLabel = d3.select("#t" + node.id);
    theNode.attr("r", 17)
        .attr("fill", "red");
    theLabel.attr("style", "font-size:30")
        .attr("stroke", "yellow")
        .attr("fill", "red");
}

function search_node() {
    let userInput = document.getElementById("searchbar");
    resetGraphSearch();
    let found = false;

    graphObj.graph.nodes.forEach(node => {
        if (node.rank === userInput.value.trim()) {
            changeNode(node);
            found = true;
        }
    });
    if (!found) {
        graphObj.graph.nodes.forEach(node => {
            if (node.id === userInput.value.trim()) {
                changeNode(node);
                found = true;
            }
        });
    }
    if (!found) {
        graphObj.graph.nodes.forEach(node => {
            if (node.name === userInput.value.trim()) {
                changeNode(node);
                found = true;
            }
        });
    }

    if (!found) {
        graphObj.graph.nodes.forEach(node => {
            if (node.genre.indexOf(userInput.value.trim()) !== -1) {
                changeNode(node);
                found = true;
            }
        });
    }

    graphObj.graph.nodes.forEach(node => {
        if (node.cast_name.indexOf(userInput.value.trim()) !== -1) {
            changeNode(node);
            found = true;
        }
    });


    graphObj.graph.nodes.forEach(node => {
        if (node.director_name.indexOf(userInput.value.trim()) !== -1) {
            changeNode(node);
            found = true;
        }
    });

    graphObj.graph.nodes.forEach(node => {
        if (node.writter_name.indexOf(userInput.value.trim()) !== -1) {
            changeNode(node);
            found = true;
        }
    })

    if (!found) {
        alert("Could not find movie. Check your spelling.")
    }
}

// instantiate an object of GraphClass
let graphObj = new GraphClass();
let largest = new GraphClass();

// your saved graph file from Homework 1
let fileName="output_graph.json"

// render the graph in the browser
loadAndRenderGraph(fileName);

// compute and display simple statistics on the graph
displayGraphStatistics(graphObj);

document.getElementById("largest").onclick = function() {
    mode = 1;
    largest.graph = graphObj.findLargestConnectedComponent();
    renderGraph(largest);
}
document.getElementById("normal").onclick = function() {
    mode = 0;
    graphObj.graph = graphObjCopy;
    renderGraph(graphObj);
}