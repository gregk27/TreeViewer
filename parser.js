// import * as visualizer from "./visulaizer";

/** @typedef {{id:string, name:string, data:string, children:Node[]}} Node */

/** 
 * Parse output from C file
 * @param {string} raw
 */
function parse(raw){
    console.log(`Parsing: ${raw}`)
    let data = raw.split("");
    data.shift(); // Remove first bracket
    console.log(parseLevel(data));
}

/** 
 * Parse output from C file
 * @param {string[]} data
 * @returns {Node}
 */
function parseLevel(data){
    // Get key and value from format (k,v)
    console.log(data.join(""));
    let key = "";
    let tmp = data.shift(); // Remove parenthesis, if empty will be }
    if(tmp == "}"){
        return null;
    }
    tmp = data.shift();
    while(tmp != ","){
        key += tmp;
        tmp = data.shift();
    }
    key = parseInt(key); // Convert key to int
    let value = "";
    tmp = data.shift(); // Remove comma
    while(tmp != ")"){
        value += tmp;
        tmp = data.shift();
    }

    /** @type {Node[]} */
    let children = [];
    while(tmp != "}"){
        if(tmp == "{"){
            let res = parseLevel(data);
            console.log(res);
            if(res != null){
                children.push(res);
            }
        }
        tmp = data.shift();
    }
    return {id:key, name:key, data:value, children};
}