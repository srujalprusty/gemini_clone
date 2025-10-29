
// export function checkHeading(str){

//         return /^(\*)(\*)(.*)\*$/.test(str)

// }

export function replaceHeading(str){
     return str.replace(/^(\*)(\*)|(\*)$/g,'')
}

export  function checkHeading(str){

        return /^(\*)(\*)|(\*)&/.test(str)


}