// import * as visualizer from "./visulaizer";

/** @typedef {{id:string, name:string, data:string, children:Node[]}} Node */

/** 
 * Parse output from C file
 * @param {string} raw
 * @returns {Node}
 */
function parse(raw){
    console.log(`Parsing: ${raw}`)
    // Get node data
    let nd = raw.substring(raw.indexOf("(")+1, raw.indexOf(")"));
    let nodeID = parseInt(nd.split(",")[0]);
    let nodeName = nodeID;
    let data = nd.split(",")[1];
    
    // Chop of start
    raw = raw.substring(raw.indexOf(")")+1);

    /** @type {Node[]} */
    let children = [];
    while(raw.indexOf("{") != -1){

    }

    return {id:nodeID, name:nodeName, data:data, children};
}