export default class GraphClass {
    constructor() {
        this.graph = {
            nodes: [],
            edges: [],
            nodeDegrees: {}
        };
    }

    // Problem 3) Compute Average Shortest Path Length (APL)
    computeAPL() {
        let size =  this.findLargestConnectedComponent().edges.length;
        let dist = Array.from(Array(size), () => new Array(size).fill(0));

        let indexMap = new Map();
        this.graph.nodes.forEach((v,i) => {
            v.neighbors = [];
            indexMap.set(v.id, i);
        });

        this.graph.edges.forEach(e => {
            let srcInd = indexMap.get(e.source);
            let tgtInd = indexMap.get(e.target);
            this.graph.nodes[srcInd].neighbors.push(tgtInd);
            this.graph.nodes[tgtInd].neighbors.push(srcInd);
        });

        let visted = new Set();
        let traverse = v => {
            visted.add(v);
            let Q = [v];
            while(Q.length > 0){
                let u = Q.pop();
                this.graph.nodes[u].neighbors.forEach(w => {
                    if (! visted.has(w)){
                        visted.add(w);
                        dist[size-1][w] = dist[size-1][u]+1
                        Q.unshift(w);
                    }
                });
            }
        };

        this.graph.nodes.forEach((n,i) => {
            if(! visted.has(i)){
                traverse(i);
            }
        });

        let sum = 0;
        let total = 0;
        for(let i = 0; i < dist.length; i++){
            for (let x = 0; x < dist[i].length; x++) {
                if(dist[i][x]>0){
                    sum+=dist[i][x];
                }
                total++;
            }
        }

        return ((sum/(size*size))+1);
    }

    // Problem 2) Find Largest Connected Component
    findLargestConnectedComponent() {
        let largeGraph = {
            nodes: [],
            edges: [],
            nodeDegrees: {}
        };
        let indexMap = new Map();
        this.graph.nodes.forEach((v,i) => {
            v.neighbors = [];
            indexMap.set(v.id, i);
        });

        this.graph.edges.forEach(e => {
            let srcInd = indexMap.get(e.source);
            let tgtInd = indexMap.get(e.target);
            this.graph.nodes[srcInd].neighbors.push(tgtInd);
            this.graph.nodes[tgtInd].neighbors.push(srcInd);
        });

        let visted = new Set();
        let last;
        let max = 0;
        let traverse = (n,v) => {
            visted.add(v);
            let Q = [v];
            let tempEdges = [];
            let s;
            while(Q.length > 0){
                let u = Q.pop();
                last = u;
                this.graph.nodes[u].neighbors.forEach(w => {
                    if (! visted.has(w)){
                        s = this.graph.nodes[u].id;
                        visted.add(w);
                        Q.unshift(w);
                    } else {
                        tempEdges.push({source: s, target: this.graph.nodes[u].id})
                    }
                });
            }
            if(tempEdges.length > max){
                max = tempEdges.length;
                largeGraph.edges = tempEdges;
            }
        };
        this.graph.nodes.forEach((n,i) => {
            if(! visted.has(i)){
                traverse(n,i);
            }
        });
        let nodeSet = new Set();
        for(let i = 0; i<largeGraph.edges.length; i++){
            nodeSet.add(largeGraph.edges[i].source);
            nodeSet.add(largeGraph.edges[i].target);
        }
        for (const value of nodeSet) {
            largeGraph.nodes.push({id:value});
        }
        let links = [];
        largeGraph.nodes.forEach(node => {
            this.graph.edges.forEach(edge=>{
                if((node.id===edge.source||node.id===edge.target)&&!links.includes(edge)){
                    links.push(edge);
                }
            })
        })
        largeGraph.edges = links;

        let i = 0;
        largeGraph.nodes.forEach(node => {
            this.graph.nodes.forEach(nodes=>{
                if(node.id===nodes.id){
                    largeGraph.nodes[i] = nodes
                    i++;
                }
            })
        })
        this.makeNodeDegrees(largeGraph);
        return largeGraph;
    }

    // Problem 3) Compute Graph Diameter
    findGraphDiameter() {
        let size =  this.findLargestConnectedComponent().edges.length;
        let dist = Array.from(Array(size), () => new Array(size).fill(0));

        let indexMap = new Map();
        this.graph.nodes.forEach((v,i) => {
            v.neighbors = [];
            indexMap.set(v.id, i);
        });

        this.graph.edges.forEach(e => {
            let srcInd = indexMap.get(e.source);
            let tgtInd = indexMap.get(e.target);
            this.graph.nodes[srcInd].neighbors.push(tgtInd);
            this.graph.nodes[tgtInd].neighbors.push(srcInd);
        });

        let visted = new Set();
        let traverse = v => {
            visted.add(v);
            let Q = [v];
            while(Q.length > 0){
                let u = Q.pop();
                this.graph.nodes[u].neighbors.forEach(w => {
                    if (! visted.has(w)){
                        visted.add(w);
                        dist[size-1][w] = dist[size-1][u]+1
                        Q.unshift(w);
                    }
                });
            }
        };

        this.graph.nodes.forEach((n,i) => {
            if(! visted.has(i)){
                traverse(i);
            }
        });

        let max = 0;
        for (let x = 0; x < size; x++) {
            if(Math.max(...dist[x])>max){
                max = Math.max(...dist[x]);
            }
        }
        return max;
    }

    // Problem 6a) Compute average node degree
    computeAverageNodeDegree() {
        let degVals = Object.values(this.graph.nodeDegrees);
        return degVals.reduce((acc, cur) => acc + cur) / degVals.length;
    }

    // Problem 6b) Number of connected components
    computeConnectedComponents() {
        let indexMap = new Map();
        this.graph.nodes.forEach((v,i) => {
            v.neighbors = [];
            indexMap.set(v.id, i);
        });

        this.graph.edges.forEach(e => {
            let srcInd = indexMap.get(e.source);
            let tgtInd = indexMap.get(e.target);
            this.graph.nodes[srcInd].neighbors.push(tgtInd);
            this.graph.nodes[tgtInd].neighbors.push(srcInd);
        });

        let visted = new Set();
        let traverse = v => {
            visted.add(v);
            let Q = [v];

            while(Q.length > 0){
                let u = Q.pop();
                this.graph.nodes[u].neighbors.forEach(w => {
                    if (! visted.has(w)){
                        visted.add(w);
                        Q.unshift(w);
                    }
                });
            }
        };

        let cc = 0;
        this.graph.nodes.forEach((n,i) => {
            if(! visted.has(i)){
                cc += 1;
                traverse(i);
            }
        });

        return cc;
    }

    // Problem 6c) Compute graph density
    computeGraphDensity() {
        return (2*this.graph.edges.length)/(this.graph.nodes.length*(this.graph.nodes.length-1));
    }
    makeNodeDegrees(largeGraph){
        for(let row = 0; row < largeGraph.nodes.length; row++){
            largeGraph.nodeDegrees[largeGraph.nodes[row].id] = 0;
        }
        for(let i = 0; i < largeGraph.edges.length; i++){
            if(largeGraph.edges[i].source in largeGraph.nodeDegrees){
                largeGraph.nodeDegrees[largeGraph.edges[i].source] +=1;
            }
            if(largeGraph.edges[i].target in largeGraph.nodeDegrees){
                largeGraph.nodeDegrees[largeGraph.edges[i].target] +=1;
            }
        }
    }
}