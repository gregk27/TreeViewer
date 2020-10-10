// import * as visualizer from "./visulaizer";

/** @typedef {{text:{name:string, desc:string}, children:Node[]}} Node */

/** 
 * Parse output from C file
 * @param {string} raw
 * @param {boolean} showNulls
 * @param {boolean} showLeafNulls
 */
function parse(raw, showNulls, showLeafNulls){
    console.log(`Parsing: ${raw}`)
    let data = raw.split("");
    data.shift(); // Remove first bracket
    return parseLevel(data, showNulls, showLeafNulls);
}

/** 
 * Parse output from C file
 * @param {string[]} data
 * @param {boolean} showNulls
 * @param {boolean} showLeafNulls
 * @returns {Node}
 */
function parseLevel(data, showNulls, showLeafNulls){
    // Get key and value from format (k,v)
    // console.log(data.join(""));
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
            let res = parseLevel(data, showNulls, showLeafNulls);
            if(res != null){
                children.push(res);
            } else if (showNulls){
                children.push({text:{"data-null":"true", name:"NULL"}, children:[]});
            }
        }
        tmp = data.shift();
    }
    for(c of children){
        if(c.text.name !== "NULL"){
            return {text:{name:key, desc:value}, children};
        }
    }
    if(showLeafNulls){
        return {text:{name:key, desc:value}, children};
    }
    return {text:{name:key, desc:value}, children:[]};
}